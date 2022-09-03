// SECOND STEP
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
} from '../constants/productConstants';
// product list reducers
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      // on request start loading while no data is retrieved.
      return { loading: true, products: [] };
    // on success stop the loading and send the data from action.
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    // on error stop loading and send the error from action
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      // on request start loading while no data is retrieved.
      return { loading: true, ...state };
    // on success stop the loading and send the data from action.
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    // on error stop loading and send the error from action
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      // on request start loading while no data is retrieved.
      return { loading: true };
    // on success stop the loading and send the data from action.
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    // on error stop loading and send the error from action
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      // on request start loading while no data is retrieved.
      return { loading: true };
    // on success stop the loading and send the data from action.
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    // on error stop loading and send the error from action
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
