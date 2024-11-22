

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink } from 'react-router-dom';
// import FormLogin from './FormLogin'; 
 import logo from '../assets/galaxy-training-logo.png'


export function NavbarPage() {


  return (
    <>
      <Navbar expand="lg" className="navCustome pt-4 pb-4">
        <Container>
          <Navbar.Brand as={NavLink} to="/"><img src={logo} className="logo" alt="Galaxy Training" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ps-5 ms-auto">
              <Nav.Link as={NavLink} to="/" className='active-link'>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/products" className='active-link'>Products</Nav.Link>
              <Nav.Link as={NavLink} to="/category" className='active-link'>Category</Nav.Link>
              <Nav.Link as={NavLink} to="/about" className='active-link'>About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}