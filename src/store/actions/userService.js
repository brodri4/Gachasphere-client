import axios from 'axios';

export const userService = {
    login,
    register,
    logout
};

function login(user) {

    return axios.post('http://localhost:8080/user/login', {
        username: user.username,
        password: user.password
    })
}

function register(user) {

    console.log("service")

    return axios.post('http://localhost:8080/user/register', {
        username: user.username,
        password: user.password,
        email: user.email
    })
}

function logout() {
    localStorage.removeItem('jsonwebtoken');
}