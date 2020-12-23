import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userActions } from "../store/actions/userActions";
import { NavLink } from "react-router-dom";
import { serverLink } from "../utils/serverLink";
import Axios from "axios";

const link = serverLink();

function ResetPage(props) {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const token = props.match.params.token;

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
    const url = `${link}/user/reset/${token}`;
    Axios.post(url, {
      password: user.password,
    }).then((result) => {
      setMessage(result.data.message);
    });
  };

  return (
    <div className="reg-block">
      <h1>Update your password</h1>
      <div className="input-block">
        <label>New Password</label>
        <input
          onChange={handleOnChange}
          type="password"
          name="password"
        ></input>
      </div>
      <div>{message}</div>
      <button className="primary-button" onClick={handleOnClick}>
        Reset Password
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

export default connect(null, mapDispatchToProps)(ResetPage);
