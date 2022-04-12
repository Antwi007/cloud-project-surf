import React from 'react';
// import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

import {
  Navbar,
  Nav,
  Container,
  Button,
} from "reactstrap";
import Logo from "./images/surf_logo (2).svg"

const Header = () => {
  return (
    // <div className="ui secondary pointing menu">
    //   <Link to="/" className="item">
    //     Streamy
    //   </Link>
    //   <div className="right menu">
    //     <Link to="/" className="item">
    //       All Streams
    //     </Link>
    //     <GoogleAuth />
    //   </div>
    // </div>
    <header className="header">
      <Navbar 
      expand="sm"
      className="shadow navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <Container fluid={true}>
        <div className="d-flex align-items-center">
          <Button color="light" size="sm">
              <div className="py-1 navbar-brand">
                <img src={Logo} alt="Directory logo" />
              </div>
          </Button>
        </div>
      </Container>
      <Nav navbar className="ml-auto" style={{ marginRight: '7%' }}>
        <GoogleAuth />
      </Nav>
    </Navbar>

    </header>
  );
};

export default Header;
