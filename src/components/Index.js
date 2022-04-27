import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from "./SearchBar"
import surf_options from "../data/surf-options.json"
import CardSurfOptions from "./CardSurfOptions"
import { changeLocation } from '../actions';

const Index = () => {

  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);

  var nearby_lat = useSelector(state => state.auth.nearby_lat);
  var nearby_lon = useSelector(state => state.auth.nearby_lon);

  const getLocation = () => {
    if (nearby_lat || nearby_lon) {
      return;
    }
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus('Got it!');
        dispatch(changeLocation({
          nearby_lat: position.coords.latitude,
          nearby_lon: position.coords.longitude
        }));
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const data = {
    "searchOptions": [{
      "value": "small",
      "label": "Surf Breaks"
    },
    {
      "value": "medium",
      "label": "Surf Lessons"
    },
    {
      "value": "large",
      "label": "Surf Rentals"
    }
    ]
  }

  return (
    <React.Fragment>
      <section className="hero-home" style={{ backgroundImage: `url(content/img/photo-1534850336045-c6c6d287f89e.jpg)` }}>
        <Container className="py-6 py-md-7 text-white z-index-20">
          <Row>
            <Col xl="10">
              {
                <div className="text-center text-lg-left">
                  <p className="subtitle letter-spacing-4 mb-2 text-secondary text-shadow">
                    Enjoy The Best Surfing Experience Ever
                  </p>
                  <h1 className="display-3 font-weight-bold text-shadow">
                    Welcome to Surfworld
                  </h1>
                </div>
              }
              <SearchBar
                options={data.searchOptions}
                className="mt-5 p-3 p-lg-1 pl-lg-4"
                btnClassName="rounded-xl"
              />
            </Col>
          </Row>
        </Container>
      </section>
      {surf_options &&
        <section className="py-6 bg-gray-100">
          <Container>
            <div className="pb-lg-4">
              <p className="subtitle text-primary">Explore These great resources Near you</p>
              <h2>Quick Browse</h2>
            </div>
            <Row>
              {surf_options.posts.map(block =>
                <Col key={block.title}>
                  <CardSurfOptions data={block} />
                </Col>
              )}
            </Row>
          </Container>
        </section>
      }
    </React.Fragment>
  )
};

export default Index;
