import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userActions } from "../store/actions/userActions";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { serverLink } from "../utils/serverLink";

const link = serverLink();

function PasswordReset(props) {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
  }, []);

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnClick = () => {
    axios
      .post(`${link}/user/recover`, {
        email: user.email,
      })
      .then((result) => {
        setMessage(result.data.message);
      });
  };

  return (
    <div className="reg-block">
      <h1>Reset your password</h1>
      <div className="input-block">
        <label>Email</label>
        <input onChange={handleOnChange} type="email" name="email"></input>
      </div>
      <div>{message}</div>
      <button className="primary-button" onClick={handleOnClick}>
        Send Password Reset Email
      </button>
      <div className="flex-row">
        <hr className="line"></hr>
        <p>or</p>
        <hr className="line"></hr>
      </div>
      <NavLink to="/index">
        <button className="secondary-button">Login</button>
      </NavLink>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => dispatch(userActions.register(user)),
  };
};

export default connect(null, mapDispatchToProps)(PasswordReset);
