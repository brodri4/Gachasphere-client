import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userActions } from "../store/actions/userActions";
import { NavLink } from "react-router-dom";
import { serverLink } from "../utils/serverLink";
import Axios from "axios";
import jwt_decode from "jwt-decode";

const link = serverLink();

function ResetPage(props) {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const token = props.match.params.token;
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    setMessage("");
    checkTokenExpiration(token);
  }, []);

  const checkTokenExpiration = (token) => {
    const decodedToken = jwt_decode(token);
    const dateNow = new Date();
    const tokenExpireTime = decodedToken.exp * 1000;
    console.log(decodedToken.exp);
    console.log(tokenExpireTime);
    console.log(dateNow.getTime());
    if (tokenExpireTime < dateNow.getTime()) {
      setIsExpired(true);
    }
  };
  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnClick = () => {
    if (user.password == user.confirmPassword) {
      const url = `${link}/user/reset/${token}`;
      Axios.post(url, {
        password: user.password,
      }).then((result) => {
        setMessage(result.data.message);
      });
    } else {
      setMessage("Password and confirm password do not match!");
    }
  };

  return (
    <div className="newPass-page">
      <h1 className="heading">Update Your Password</h1>
      <div className="newPass-block">
        <h2>{message}</h2>
        {!isExpired ? (
          <>
            <div className="input-block">
              <label htmlFor="newPassPassword" className="secondary-text">
                New Password
              </label>
              <input
                onChange={handleOnChange}
                type="password"
                name="password"
                id="newPassPassword"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleOnClick();
                  }
                }}
              ></input>
              <label htmlFor="newPassPassword" className="secondary-text">
                Confirm Password
              </label>
              <input
                onChange={handleOnChange}
                type="password"
                name="confirmPassword"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleOnClick();
                  }
                }}
              ></input>
            </div>
            <div className="reset-buttons">
              <button className="primary-button" onClick={handleOnClick}>
                Update
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
          </>
        ) : (
          <>
            <h3>Your request has expired!</h3>
            <div className="reset-buttons">
              <NavLink to="/recover">
                <button className="primary-button">
                  Forgot your password?
                </button>
              </NavLink>
              <div className="flex-row">
                <hr className="line"></hr>
                <p className="or">or</p>
                <hr className="line"></hr>
              </div>
              <NavLink to="/index">
                <button className="secondary-button">Login</button>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => dispatch(userActions.register(user)),
  };
};

export default connect(null, mapDispatchToProps)(ResetPage);
