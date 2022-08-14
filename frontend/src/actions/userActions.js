import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants'
import axios from 'axios'




export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    // when we actually send data we want to send in the headers the content type of application / json.
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    // getting the user data as id name email token....
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      // ... and passing it as payload
      payload: data,
    })
    // ...setting this data to local storage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


//?  should it be async?
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}


export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
    // when we actually send data we want to send in the headers the content type of application / json.
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    // getting the user data as id name email token....
    const { data } = await axios.post(
      '/api/users',
      // get this data...
      { name, email, password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      // ... and passing it as payload
      payload: data,
    })
// after we registered we should be logged in
    dispatch({
      type: USER_LOGIN_SUCCESS,
      // ... and passing it as payload
      payload: data,
    })
    
    // ...setting this data to local storage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



// to set the token we would need to set getState next to dispatch in async arguments
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {


    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const { userLogin: {userInfo}} = getState()
    // when we actually send data we want to send in the headers the content type of application / json.
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      },
    }
    // getting the user data as id name email token....
    const { data } = await axios.get(
      `/api/users/${id}`,
      config
    )

    dispatch({
      type: USER_DETAILS_SUCCESS,
      // ... and passing it as payload
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const updateUserProfileDetails = (user) => async (dispatch, getState) => {
  try {


    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const { userLogin: {userInfo}} = getState()
    // when we actually send data we want to send in the headers the content type of application / json.
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      },
    }
    // getting the user data as id name email token....
    const { data } = await axios.put(
      `/api/users/profile`,
      user,
      config
    )

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      // ... and passing it as payload
      payload: data,
    })
    
    dispatch({
      type: USER_LOGIN_SUCCESS,
      // ... and passing it as payload
      payload: data,
    })

    localStorage.setItem('userInfo',JSON.stringify(data))


  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
