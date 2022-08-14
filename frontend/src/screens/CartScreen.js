import React, { useEffect } from 'react'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'



const CartScreen = () => {
  const navigate = useNavigate()
  const params = useParams()
  const productId = params.id
  console.log(productId)
  // no more location history or match. for location use hook useLocation
  const location = useLocation()
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => console.log("removed")

  const checkoutHandler = () => {
    navigate(`/login?redirect=shipping`)
    console.log('checkout')
  }
  return (

    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {/* i want to display [0,1,2,3,4,5] */}
                      {
                        [...Array(item.countInStock).keys()].map(x => (<option key={x + 1} value={x + 1}>{x + 1}</option>))
                      }
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              {/* amount of items will be calculated here */}
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {/* to update subtotal we would need to accumulate the total from quantity multiplied by price of items, and start MR (acc) from 0. The toFixed(2) method will make sure we will have only 2 decimal after the dot.*/}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem className="d-grid gap-2">
              <Button type='button' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Procced To Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen