import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConstants"
import axios from 'axios'
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        // when we actually send data we want to send in the headers the content type of application / json.
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // getting the user data as id name email token.... 
        const { data } = await axios.post(
            '/api/users/login',
            { email, password },
            config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            // ... and passing it as payload
            payload: data
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