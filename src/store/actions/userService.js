import axios from 'axios';

export const userService = {
    login,
    register,
    logout
};

function login(user) {

    return axios.post('http://localhost:8080/users/authenticate', {
        username: user.username,
        password: user.password
    })
}

function register(user) {

    return axios.post('http://localhost/users/register', {
        username: user.username,
        password: user.password,
        email: user.email
    })
}

function logout() {
    localStorage.removeItem('jsonwebtoken');
}