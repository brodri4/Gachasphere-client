import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

// ReactBoot Items
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/NavBar';


// Components
import Footer from '../components/Footer'

// Pages
import Profile from '../pages/Profile';
import MyList from '../pages/MyList';
import Games from '../pages/Games';


class AppNavBar extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         hderLinks: 
    //     }
    // }

    render() {
        return (
            <Router>
                <Container className='p-0' fluid={true}>
                    <NavBar className='border-bottom' collapseOnSelect bg='transparent' expand='sm'>
                        <NavBar.Brand>GachaSphere</NavBar.Brand>
                        <NavBar.Collapse id='responsive-navbar-nav' >
                            <Nav className='ml-auto'>
                                {this.props.isAuth ? null : <Nav.Link eventKey='1' as={Link} to='/games/all'>Games</Nav.Link>}
                                {/* pending auth token then below two will updated */}
                                {this.props.isAuth ? null : <Nav.Link eventKey='2' as={Link} to='/my-list'>My List</Nav.Link>}
                                {this.props.isAuth ? null : <Nav.Link eventKey='3' as={Link} to='/profile'>Profile</Nav.Link>}
                            </Nav>
                        </NavBar.Collapse>
                    </NavBar>
                    <Route path='/games/all' render={() => <Games />} />
                    <Route path='/my-list' render={() => <MyList />} />
                    <Route path='/profile' render={() => <Profile />} />

                    <Footer />
                </Container>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuthenticated
    }
}


export default connect(mapStateToProps)(AppNavBar);