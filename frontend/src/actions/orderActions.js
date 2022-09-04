import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
} from '../constants/orderConstants';
import axios from 'axios';
// it will get the data we passed with button click
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    // it will dispatch create request and set loading to true
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    // we should pass our token and a header
    // defines userinfo value deconstructing it from the state
    const {
      userLogin: { userInfo },
    } = getState();

    // when we actually send data we want to send in the headers the content type of application / json.
    // TOKEN
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log(order);
    // getting the user data as id name email token....
    const { data } = await axios.post(`/api/orders`, order, config);
    console.log(data);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      // ... and passing it as payload
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    // it will dispatch create request and set loading to true
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    // we should pass our token and a header
    // defines userinfo value deconstructing it from the state
    const {
      userLogin: { userInfo },
    } = getState();

    // when we actually send data we want to send in the headers the content type of application / json.
    // TOKEN
    const config = {
      headers: {
        // in get request we don't need the content type
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // getting the user data as id name email token....
    const { data } = await axios.get(`/api/orders/${id}`, config);
    console.log(data);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      // ... and passing it as payload
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      // it will dispatch create request and set loading to true
      dispatch({
        type: ORDER_PAY_REQUEST,
      });
      // we should pass our token and a header
      // defines userinfo value deconstructing it from the state
      const {
        userLogin: { userInfo },
      } = getState();

      // when we actually send data we want to send in the headers the content type of application / json.
      // TOKEN
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // getting the user data as id name email token....
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      dispatch({
        type: ORDER_PAY_SUCCESS,
        // ... and passing it as payload
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    // it will dispatch create request and set loading to true
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });
    // we should pass our token and a header
    // defines userinfo value deconstructing it from the state
    const {
      userLogin: { userInfo },
    } = getState();

    // when we actually send data we want to send in the headers the content type of application / json.
    // TOKEN
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      // ... and passing it as payload
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    // it will dispatch create request and set loading to true
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });
    // we should pass our token and a header
    // defines userinfo value deconstructing it from the state
    const {
      userLogin: { userInfo },
    } = getState();

    // when we actually send data we want to send in the headers the content type of application / json.
    // TOKEN
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // getting the user data as id name email token....
    const { data } = await axios.get(`/api/orders/myorders`, config);

    console.log('data from request ' + data);
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      // ... and passing it as payload
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    // it will dispatch create request and set loading to true
    dispatch({
      type: ORDER_LIST_REQUEST,
    });
    // we should pass our token and a header
    // defines userinfo value deconstructing it from the state
    const {
      userLogin: { userInfo },
    } = getState();

    // when we actually send data we want to send in the headers the content type of application / json.
    // TOKEN
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // getting the user data as id name email token....
    const { data } = await axios.get(`/api/orders`, config);

    console.log('data from request ' + data);
    dispatch({
      type: ORDER_LIST_SUCCESS,
      // ... and passing it as payload
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
