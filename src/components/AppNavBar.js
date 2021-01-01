import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../store/actions/userActions';

// ReactBoot Items
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/NavBar';
import logo from '../images/GachasphereRed.png';

// Pages
// import Profile from '../pages/Profile';
// import MyLists from '../pages/MyLists';
// import Games from '../pages/Games';
import Navbar from 'react-bootstrap/NavBar';
// import HomePage from '../pages/HomePage';

// for when we make a profile page
// {!this.props.isAuth ? null : <Nav.Link eventKey='3' as={Link} to='/profile'>Profile</Nav.Link>}

class AppNavBar extends React.Component {
    // constructor(props) {
    //     super(props)
    // }


    render() {
        return (

                <Container id="header" className='p-0' fluid={true}>
                    <NavBar className='border-bottom' collapseOnSelect bg='transparent' expand='sm'>
                        <NavBar.Brand><Nav.Link as={Link} to='/homepage'><img className="logo" src={logo} alt="GachaSphere Logo" /></Nav.Link></NavBar.Brand>
                        <Navbar.Toggle id="NavBar_Toggler" className='border-bottom' aria-controls='NavBar_Toggler' />
                        <NavBar.Collapse id='responsive-navbar-nav' >
                            <Nav className='ml-auto'>
                                {!this.props.isAuth ? null : <Nav.Link eventKey='1' as={Link} to='/games/all'>Games</Nav.Link>}
                                {!this.props.isAuth ? null : <Nav.Link eventKey='2' as={Link} to='/my-lists'>My Lists</Nav.Link>}
                                {!this.props.isAuth ? null : <button className="nav-button" onClick={this.props.logout}>Logout</button>}
                            </Nav>
                        </NavBar.Collapse>
                    </NavBar>
                </Container>

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