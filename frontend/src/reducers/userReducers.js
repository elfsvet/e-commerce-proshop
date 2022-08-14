import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      // on request start loading while no data is retrieved.
      return { loading: true }
    // on success stop the loading and send the data from action.
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    // on error stop loading and send the error from action
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      // on request start loading while no data is retrieved.
      return { loading: true }
    // on success stop the loading and send the data from action.
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    // on error stop loading and send the error from action
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
