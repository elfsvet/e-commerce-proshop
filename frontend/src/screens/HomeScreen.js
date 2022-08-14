import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  // using hooks
  const dispatch = useDispatch()
  // same name as in the store
  // to grab it and pull out what we want from it -> display in out output(return)
  const productList = useSelector((state) => state.productList)
  // because of this we can see our product useSelector
  const { loading, error, products } = productList

  useEffect(() => {
    // dispatch(send off to a destination or for a purpose) listProducts actions
    // fire off the action
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
