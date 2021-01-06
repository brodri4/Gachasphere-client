import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../store/actions/userActions';
import { NavLink } from 'react-router-dom';

function RegisterPage(props) {
    const [user, setUser] = useState({})
    const [editing, setEditing] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        setEditing(true)
        setInvalid(false)
    }

    const handleOnClick = () => {
        if (user.username && user.password && user.email) {
            props.register(user)
            setEditing(false)
        } else {
            setInvalid(true)
        }
    }

    return (
        <div className="reg-page">
            <div className="reg-block">
                <h1 className="heading">Register</h1>
                {!editing && !props.registerLoading && props.registerFailed && <h2 className="message-text">{props.message}</h2>}
                {invalid && <h2 className="message-text">Please fill out all fields.</h2>}
                <div className="input-block">
                    <label htmlFor="regUsername" className="secondary-text">Username</label>
                    <input onChange={handleOnChange} type="text" name="username" id="regUsername" onKeyPress={(e) => {if (e.key === 'Enter') {handleOnClick()}}}></input>
                    <label htmlFor="regPassword" className="secondary-text">Password</label>
                    <input onChange={handleOnChange} type="password" name="password" id="regPassword" onKeyPress={(e) => {if (e.key === 'Enter') {handleOnClick()}}}></input>
                    <label htmlFor="regEmail" className="secondary-text">Email</label>
                    <input onChange={handleOnChange} type="email" name="email" id="regEmail" onKeyPress={(e) => {if (e.key === 'Enter') {handleOnClick()}}}></input>
                </div>
                <button className="primary-button" onClick={handleOnClick}>Register</button>
                <div className="flex-row">
                    <hr className="line"></hr>
                    <p className="or">or</p>
                    <hr className="line"></hr>
                </div>
                <NavLink to="/index"><button className="secondary-button">Login</button></NavLink>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        registerFailed: state.userR.registerFailed,
        registerLoading: state.userR.registerLoading,
        message: state.userR.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (user) => dispatch(userActions.register(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)