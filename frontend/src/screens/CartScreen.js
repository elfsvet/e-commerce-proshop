import React, { useEffect } from 'react'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
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
  const {cartItems} = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  },[dispatch, productId, qty])
  return (

    <div>
      CART
    </div>
  )
}

export default CartScreen