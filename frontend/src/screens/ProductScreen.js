import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = () => {
    const [qty, setQty] = useState(1);
    // we use params instead of match
    const dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        // send listProductDetails with the id from params NO MATCH we getting it using the useParams
        dispatch(listProductDetails(params.id))
    }, [dispatch, params.id])

    const addToCartHandler = () => {
        // we don't have to use history as a match anymore we will use navigate instead. With navigate hook useNavigate
       navigate(`/cart/${params.id}?qty=${qty}`)
    }

    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                            </ListGroupItem>
                            <ListGroupItem>
                                Price: ${product.price}
                            </ListGroupItem>
                            <ListGroupItem>
                                Description: {product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Price:
                                        </Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Status:
                                        </Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                                {product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty: </Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={e => setQty(e.target.value)}>
                                                    {/* i want to display [0,1,2,3,4,5] */}
                                                    {
                                                        [...Array(product.countInStock).keys()].map(x => (<option key={x + 1} value={x + 1}>{x + 1}</option>))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}

                                {/* we use the class name here instead of button btn-block because it didn't work in the new version of the bootstrap */}
                                <ListGroupItem className="d-grid gap-2">
                                    <Button
                                        onClick={addToCartHandler}
                                        type='button'
                                        disabled={product.countInStock === 0}
                                    >
                                        Add To Cart
                                    </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}

        </>
    )
}

export default ProductScreen