import { userConstants } from '../actions/userActionTypes';

const initialState = { isAuthenticated: false };

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case userConstants.LOGIN_REQUESTED:
            return {
                ...state,
                loginLoading: true,
                loginFailed: false
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loginLoading: false,
                loginFailed: false
            }
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                loginLoading: false,
                loginFailed: true,
                message: action.payload
            }
        case userConstants.REGISTER_LOADING:
            return {
                ...state,
                registerLoading: true,
                registerFailed: false
            }
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                registerLoading: false,
                registerFailed: false
            }
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                registerLoading: false,
                registerFailed: true,
                message: action.payload
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

export default userReducer
