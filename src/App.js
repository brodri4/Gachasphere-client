import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userActions } from './store/actions/userActions';

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
    <div>
      <label>Username</label>
      <input onChange={handleOnChange} type="text" name="username"></input>
      <label>Password</label>
      <input onChange={handleOnChange} type="text" name="password"></input>
      <button className="primary-button" onClick={handleOnClick}>Login</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return { 
    login: (user) => dispatch(userActions.login(user))
  }
}

export default connect(null, mapDispatchToProps)(App);
