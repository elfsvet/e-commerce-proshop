import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            // on request start loading while no data is retrieved.
            return { loading: true, products: [] }
            // on success stop the loading and send the data from action.
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
            // on error stop loading and send the error from action
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}