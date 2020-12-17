import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function foo(ComposedComponent) {

    class Authenticate extends Component {
        constructor(props) {
            super(props)

            if (!props.isAuth) {
                this.props.history.push('/index')
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuth: state.userR.isAuthenticated
        }
    }

    return connect(mapStateToProps)(Authenticate)
}