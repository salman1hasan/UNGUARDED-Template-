import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; //import bootstrap
import "bootstrap/dist/js/bootstrap.bundle";
import {Container,Nav,Navbar} from 'react-bootstrap'; //import bootstrap components
import {Link} from 'react-router-dom' //import link to hook up react router dom
import logo from  '../images/logo.png'
import Search from './layout/search';


const Header = () => {
  return (
    <>
   
          <Container fluid>
          <Navbar.Brand as={Link} to="/Home"> <img
                  src={logo}
                  width="40"
                  height="40"
                  alt=""
                /></Navbar.Brand>
                <Nav className="navbar-offcanvas ml-auto pe-3">
                <Nav.Link as={Link} className="inactive" to="/Home" >HOME</Nav.Link> 
                <Nav.Link as={Link} className="inactive" to="/Content">CONTENT</Nav.Link>
                <Nav.Link as={Link} className="inactive" to="/Cart">CART</Nav.Link>
                <Nav.Link as={Link} className="inactive" to="/Comingsoon">COMING SOON</Nav.Link>
                <Search/>
                </Nav>
          </Container>
  
    </>
  );
  }

export default Header;

