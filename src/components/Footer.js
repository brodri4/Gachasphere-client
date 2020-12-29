import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

function Footer() {

    return (
        <footer className='mt-5'>
            <Container fluid={true}>
                <Row className='border-top justify-content-between p-3'>
                    <Col className='p-0' md='50%' sm='50%'>
                    </Col>
                    <Col className='p-0 d-flex justify-content-end' md='50%' >
                        <NavLink to="/about">About</NavLink>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer