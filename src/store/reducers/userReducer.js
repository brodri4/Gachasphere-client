import { userConstants } from '../actions/userActionTypes';

const initialState = { isAuthenticated: false };

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload
            }
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload
            }
        // all reducers will need to listen for this
        case userConstants.LOGOUT:
            return {
                initialState
            }
        default:
            return state
    }
}

export default reducer;