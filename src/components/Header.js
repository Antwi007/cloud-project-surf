import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

import { changeLocation } from '../actions';

import {
  Navbar,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  Nav,
  Container,
} from "reactstrap";
import Logo from "./images/surf_logo (2).svg"
import userMenu from "../data/user-menu.json"

const Header = () => {
  const dispatch = useDispatch();

  var nearby_lat = useSelector(state => state.auth.nearby_lat);
  var nearby_lon = useSelector(state => state.auth.nearby_lon);

  var isSignedIn = useSelector(state => state.auth.isSignedIn);
  var surfProfile = useSelector(state => state.surfProfile);

  const [dropdownAnimate, setDropdownAnimate] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const toggleDropdown = (name) => {
    setDropdownOpen({ ...dropdownOpen, [name]: !dropdownOpen[name] })
  }
  const [profilePic, setProfilePic] = useState(null);

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
  }, []);

  useEffect(() => {
    // console.log("use effect called", surfProfile)
    try {
      var u = URL.createObjectURL(surfProfile.profilePic);
      setProfilePic(u)
    } catch {
      // console.log("here's the url", surfProfile.profilePic ? surfProfile.profilePic : `/content/img/${data.avatar}`)
      const randomNum = Math.floor(Math.random() * 10000)
      // console.log(surfProfile.profilePic + "?v=" + randomNum)
      setProfilePic(surfProfile.profilePic ? surfProfile.profilePic + "?v=" + randomNum : `/content${userMenu[0].img}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surfProfile.profilePic])

  // console.log("surf profile", surfProfile)

  return (
    <header className="header">
      <Navbar
        expand="md"
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

        {/* {isSignedIn && 
        <Nav navbar className="ml-2">
          <NavLink to="/profile">
            <h6>
              Profile
            </h6>
          </NavLink>
        </Nav>
        } */}
        {isSignedIn && userMenu && userMenu.map(item =>
          <Dropdown
            inNavbar
            className="ml-lg-3"
            isOpen={dropdownOpen[item.title]}
            toggle={() => toggleDropdown(item.title)}
            size="md"
          >
            <DropdownToggle
              nav
              style={item.type === "avatar" && { padding: 0, width: '20vh' }}
              onClick={() => setDropdownAnimate({ ...dropdownAnimate, [item.title]: !dropdownOpen[item.img] })}
            >
              <img src={profilePic} alt={item.title} className="avatar avatar-md avatar-border-white mr-2" />

            </DropdownToggle>
            <DropdownMenu className={dropdownAnimate[item.title] === false ? 'hide' : ''} end>
              {item.dropdown &&
                item.dropdown.map(dropdownItem =>
                  <NavLink to="/profile">
                    <DropdownItem>
                      {dropdownItem.title}
                    </DropdownItem>
                  </NavLink>
                )}
              <DropdownItem>
                <GoogleAuth />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
        {
          !isSignedIn &&
          <Nav navbar style={{ marginLeft: '1%', width: '40vh' }}>
            <GoogleAuth />
          </Nav>
        }

      </Navbar>

    </header>
  );
};

export default Header;
