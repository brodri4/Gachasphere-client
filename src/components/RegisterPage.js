import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../store/actions/userActions';
import { NavLink } from 'react-router-dom';

function RegisterPage(props) {
    const [user, setUser] = useState({})

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleOnClick = () => {
        if (user.username && user.password && user.email) {
            console.log(user, "click!")
            props.register(user)
        }
    }

    return (
        <div className="reg-block">
            <h1>Register</h1>
            <div className="input-block">
                <label>Username</label>
                <input onChange={handleOnChange} type="text" name="username"></input>
                <label>Password</label>
                <input onChange={handleOnChange} type="password" name="password"></input>
                <label>Email</label>
                <input onChange={handleOnChange} type="email" name="email"></input>
            </div>
            <button className="primary-button"onClick={handleOnClick}>Register</button>
            <div className="flex-row">
                <hr className="line"></hr>
                <p>or</p>
                <hr className="line"></hr>
            </div>
            <NavLink to="/index"><button className="secondary-button">Login</button></NavLink>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (user) => dispatch(userActions.register(user))
    }
}

export default connect(null, mapDispatchToProps)(RegisterPage)