import { userConstants } from './userActionTypes';
import { userService } from './userService';
import history from '../../utils/history';
import { setAuthenticationHeader } from '../../utils/authenticate';

export const userActions = {
    login,
    register,
    logout
}

function login(user) {
    return dispatch => {
        userService.login(user)
        .then(
            result => {
                if (result.data.login === true) {
                    const token = result.data.token;
                    localStorage.setItem('jsonwebtoken', token);
                    setAuthenticationHeader(token);
                    dispatch(success());
                    history.push('/homepage');
                } else if (result.data.login === false) {
                    dispatch(failure(result.data.message))
                }
            },
            error => {
                dispatch(failure(error))
            }
        )
    }

    function success() { return { type: userConstants.LOGIN_SUCCESS } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, payload: error } }
}

function register(user) {
    return dispatch => {
        console.log("action")
        userService.register(user)
        .then(
            result => {
                console.log(result)
                if (result.data.userAdded === true) {
                    const token = result.data.token;
                    localStorage.setItem('jsonwebtoken', token);
                    setAuthenticationHeader(token);
                    dispatch(success());
                    history.push('/index')
                } else if (result.data.userAdded === false) {
                    dispatch(failure(result.data.message))
                }
            },
            error => {
                dispatch(failure(error))
            }
        )
    }

    function success() { return { type: userConstants.REGISTER_SUCCESS } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error: error } }
}

function logout() {
    userService.logout()
    history.push('/index')
    return { type: userConstants.LOGOUT }
}