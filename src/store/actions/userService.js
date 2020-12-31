import axios from "axios";
import { serverLink } from "../../utils/serverLink";

export const userService = {
  login,
  register,
  logout,
};

const link = serverLink();

function login(user) {
  return axios.post(`${link}/user/login`, {
    username: user.username,
    password: user.password,
  });
}

function register(user) {

  return axios.post(`${link}/user/register`, {
    username: user.username,
    password: user.password,
    email: user.email,
  });
}
// function sendEmailRequest(user) {
//   console.log("service");

//   return axios.post(`${link}/user/reset`, {
//     password: user.password,
//   });
// }

function logout() {
  localStorage.removeItem("jsonwebtoken");
}
