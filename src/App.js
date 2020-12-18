import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userActions } from './store/actions/userActions';
import { NavLink } from 'react-router-dom';

function App(props) {
  const [user, setUser] = useState({});

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  const handleOnClick = () => {
    props.login(user)
  }

  useEffect(() => {
    userActions.logout()
  }, [])

  return (
    <div className="login-block">
      <h1>Login</h1>
      <div className="input-block">
        <label>Username</label>
        <input onChange={handleOnChange} type="text" name="username"></input>
        <label>Password</label>
        <input onChange={handleOnChange} type="password" name="password"></input>
      </div>
      <button className="primary-button" onClick={handleOnClick}>Login</button>
      <div className="flex-row">
            <hr className="line"></hr>
            <p>or</p>
            <hr className="line"></hr>
      </div>
      <NavLink to="/register"><button className="secondary-button">Register</button></NavLink>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return { 
    login: (user) => dispatch(userActions.login(user))
  }
}

export default connect(null, mapDispatchToProps)(App);
