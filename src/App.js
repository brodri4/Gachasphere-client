import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userActions } from "./store/actions/userActions";
import { NavLink } from "react-router-dom";

function App(props) {
  const [user, setUser] = useState({});

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnClick = () => {
    props.login(user);
  };

  useEffect(() => {
    userActions.logout();
  }, []);

  return (
    <div className="login-page">
      <div className="login-block">
        <h1 className="heading">Login</h1>
        <div className="input-block">
          <label className="secondary-text">Username</label>
          <input onChange={handleOnChange} type="text" name="username" onKeyPress={(e) => {if (e.key === 'Enter') {handleOnClick()}}}></input>
          <label className="secondary-text">Password</label>
          <input
            onChange={handleOnChange}
            type="password"
            name="password"
            onKeyPress={(e) => {if (e.key === 'Enter') {handleOnClick()}}}></input>
        </div>
        <button className="primary-button" onClick={handleOnClick}>
          Login
        </button>
        <div className="flex-row">
          <hr className="line"></hr>
          <p className="or">or</p>
          <hr className="line"></hr>
        </div>
        <div className="flex-row">
          <NavLink to="/register">
            <button className="secondary-button">Register</button>
          </NavLink>
          <NavLink to="/recover">
            <button className="tertiary-button">Forgot your password?</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(userActions.login(user)),
  };
};

export default connect(null, mapDispatchToProps)(App);
