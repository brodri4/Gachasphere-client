import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../store/actions/userActions';

// ReactBoot Items
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/NavBar';
import logo from '../images/GachasphereRed.png';


// Components

// Pages
import Profile from '../pages/Profile';
import MyList from '../pages/MyList';
import Games from '../pages/Games';
import Navbar from 'react-bootstrap/NavBar';


class AppNavBar extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Router>
                <Container id="header" className='p-0' fluid={true}>
                    <NavBar className='border-bottom' collapseOnSelect bg='transparent' expand='sm'>
                        <NavBar.Brand><img className="logo" src={logo} alt="GachaSphere Logo" /></NavBar.Brand>
                        <Navbar.Toggle className='border-bottom' aria-controls='navbar-toggle' />
                        <NavBar.Collapse id='responsive-navbar-nav' >
                            <Nav className='ml-auto'>
                                {!this.props.isAuth ? null : <Nav.Link eventKey='1' as={Link} to='/games/all'>Games</Nav.Link>}
                                {/* pending auth token then below two will updated */}
                                {!this.props.isAuth ? null : <Nav.Link eventKey='2' as={Link} to='/my-list'>My List</Nav.Link>}
                                {!this.props.isAuth ? null : <Nav.Link eventKey='3' as={Link} to='/profile'>Profile</Nav.Link>}
                                <button className="secondary-button" onClick={this.props.logout}>Logout</button>
                            </Nav>
                        </NavBar.Collapse>
                    </NavBar>
                    <Route path='/games/all' render={() => <Games />} />
                    <Route path='/my-list' render={() => <MyList />} />
                    <Route path='/profile' render={() => <Profile />} />

                </Container>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.userR.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(userActions.logout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);