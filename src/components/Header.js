import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

import { changeLocation } from '../actions';

import {
  Navbar,
  Nav,
  Container,
} from "reactstrap";
import Logo from "./images/surf_logo (2).svg"

const Header = () => {
  const dispatch = useDispatch();

  var nearby_lat = useSelector(state => state.auth.nearby_lat);
  var nearby_lon = useSelector(state => state.auth.nearby_lon);

  const getLocation = () => {
    if (nearby_lat || nearby_lon) {
      return;
    }
    if (!navigator.geolocation) {
      return;
    } else {
      console.log('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Got it!');
        console.log(position.coords.latitude, position.coords.longitude)
        dispatch(changeLocation({
          nearby_lat: position.coords.latitude,
          nearby_lon: position.coords.longitude
        }));
      }, () => {
        console.log('Unable to retrieve your location')
      });
    }
  }

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header className="header">
      <Navbar
        expand="sm"
        className="shadow navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <Container fluid={true}>
          <div className="d-flex align-items-center">
            <NavLink to="/">
              <div className="py-1 navbar-brand">
                <img src={Logo} alt="Directory logo" />
              </div>
            </NavLink>
          </div>
        </Container>
        <Nav navbar className="ml-auto">
          <NavLink to="/search-results-page">
            <h6>
             Catalog
            </h6>
          </NavLink>
        </Nav>
        <Nav navbar className="ml-2">
          <NavLink to="/profile">
            <h6>
            Profile
            </h6>
          </NavLink>
        </Nav>
        <Nav navbar style={{ marginLeft: '1%', width: '40vh' }}>
          <GoogleAuth />
        </Nav>
      </Navbar>

    </header>
  );
};

export default Header;
