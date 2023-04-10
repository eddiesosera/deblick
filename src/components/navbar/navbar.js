import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Compare from '../../pages/compare';

function NavBar() {
  return (
    <>
    <Navbar bg='light' variant='light'>
        <Container>
            <Navbar.Brand href='/'>DV200</Navbar.Brand>
            <Nav className='me-auto'>
                <Link className='nav-link' to='/compare'>Compare</Link>
                <Link className='nav-link' to='/timeline'>Timeline</Link>
            </Nav>
        </Container>
    </Navbar>
    </>
  )
}

export default NavBar