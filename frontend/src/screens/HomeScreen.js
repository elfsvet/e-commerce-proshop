import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const params = useParams();
  const keyword = params.keyword;

  const pageNumber = params.pageNumber || 1;

  // using hooks
  const dispatch = useDispatch();
  // same name as in the store
  // to grab it and pull out what we want from it -> display in out output(return)
  const productList = useSelector((state) => state.productList);
  // because of this we can see our product useSelector
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    // dispatch(send off to a destination or for a purpose) listProducts actions
    // fire off the action
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
