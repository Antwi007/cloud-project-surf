import React from 'react';
import {  NavLink } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

import {
  Navbar,
  Nav,
  Container,
} from "reactstrap";
import Logo from "./images/surf_logo (2).svg"

const Header = () => {
  return (
    <header className="header">
      <Navbar 
      expand="sm"
      className="shadow navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <Container fluid={true}>
        <div className="d-flex align-items-center">
            <NavLink  to="/">
                <div className="py-1 navbar-brand">
                  <img src={Logo} alt="Directory logo" />
                </div>
            </NavLink>
        </div>
      </Container>
      <Nav navbar className="ml-auto">
          <NavLink to="/search-results-page">
              Results
          </NavLink>
      </Nav>
      <Nav navbar className="ml-2">
        <NavLink to="/profile">
          Profile
        </NavLink>
      </Nav>
      <Nav navbar className="ml-2">
        <NavLink to="/signup">
          SignUp
        </NavLink>
      </Nav>
      <Nav navbar className="ml-2">
        <NavLink to="/login">
          Login
        </NavLink>
      </Nav>
      <Nav navbar style={{ marginRight: '7%' , marginLeft: '2%'}}>
        <GoogleAuth />
      </Nav>
    </Navbar>

    </header>
  );
};

export default Header;
