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
    <div className="reset-page">
      <div className="reset-block">
        <h1 className="heading">Send Password Reset Email</h1>
        <h2 className="message-text">{message}</h2>
        <div className="input-block">
          <label className="secondary-text" htmlFor="resetEmail">Email</label>
          <input onChange={handleOnChange} onKeyPress={(e) => {if (e.key === 'Enter') {handleOnClick()}}} id="resetEmail" type="email" name="email"></input>
        </div>
        <div className="reset-buttons">
          <button className="primary-button" onClick={handleOnClick}>
            Send Email
          </button>
          <div className="flex-row">
            <hr className="line"></hr>
            <p className="or">or</p>
            <hr className="line"></hr>
          </div>
          <NavLink to="/index">
            <button className="secondary-button">Login</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => dispatch(userActions.register(user)),
  };
};

export default connect(null, mapDispatchToProps)(PasswordReset);
