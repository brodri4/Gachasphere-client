import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { userActions } from '../store/actions/userActions';

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
        <div>
            <label>Username</label>
            <input onChange={handleOnChange} type="text" name="username"></input>
            <label>Password</label>
            <input onChange={handleOnChange} type="text" name="password"></input>
            <label>Email</label>
            <input onChange={handleOnChange} type="text" name="email"></input>
            <button onClick={handleOnClick}>Register</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (user) => dispatch(userActions.register(user))
    }
}

export default connect(null, mapDispatchToProps)(RegisterPage)