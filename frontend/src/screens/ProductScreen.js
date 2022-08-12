import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = () => {
    const [product, setProduct] = useState({})
    // we use params instead of match
    const params = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${params.id}`)

            setProduct(data)
        }
        fetchProduct()
    }, [params.id])

    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
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
                            {/* we use the class name here instead of button btn-block because it didn't work in the new version of the bootstrap */}
                            <ListGroupItem className="d-grid gap-2">
                                <Button type='button' disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen