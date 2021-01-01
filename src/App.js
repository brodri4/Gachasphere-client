import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userActions } from "./store/actions/userActions";
import { NavLink } from "react-router-dom";

function App(props) {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setEditing(true)
    setInvalid(false)
  };

  const handleOnClick = () => {
    if (user.username && user.password) {
      props.login(user);
      setEditing(false)
    } else {
      setInvalid(true)
    }
  };

  const guestLogin = () => {
    let guestUser = {
      username: "guest",
      password: "password"
    };

    props.login(guestUser)
    setEditing(false)
  }

  useEffect(() => {
    userActions.logout();
  }, []);

  return (
    <div className="login-page">
      <div className="login-block">
        <h1 className="heading">Login</h1>
        {!editing && !props.loginLoading && props.loginFailed && <h2 className="message-text">{props.message}</h2>}
        {invalid && <h2 className="message-text">Please fill out all fields.</h2>}
        <div className="input-block">
          <label className="secondary-text" htmlFor="loginUsername">Username</label>
          <input onChange={handleOnChange} type="text" name="username" id="loginUsername" onKeyPress={(e) => {if (e.key === 'Enter') {handleOnClick()}}}></input>
          <label className="secondary-text" htmlFor="loginPassword">Password</label>
          <input
            onChange={handleOnChange}
            type="password"
            name="password"
            id="loginPassword"
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
        <div className="login-buttons">
          <NavLink to="/register">
            <button className="secondary-button">Register</button>
          </NavLink>
          <NavLink to="/recover">
            <button className="tertiary-button">Forgot your password?</button>
          </NavLink>
          <button className="tertiary-button" onClick={guestLogin}>Login as Guest</button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginFailed: state.userR.loginFailed,
    loginLoading: state.userR.loginLoading,
    message: state.userR.message
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(userActions.login(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
