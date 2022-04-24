/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useHistory, Link, BrowserRouter }from "react-router-dom";

import {
    Card,
    CardBody,
    CardTitle
} from 'reactstrap'


const CardSurfOptions = (props) => {
    
    const [nearby_lat, setNearbyLat] = useState(null);
    const [nearby_lon, setNearbyLon] = useState(null);
    const [status, setStatus] = useState(null);
    const data = props.data
    const router = useHistory();

    const getLocation = () => {
        if (!navigator.geolocation) {
          setStatus('Geolocation is not supported by your browser');
        } else {
          setStatus('Locating...');
          navigator.geolocation.getCurrentPosition((position) => {
            setStatus(null);
            setNearbyLat(position.coords.latitude);
            setNearbyLon(position.coords.longitude);
          }, () => {
            setStatus('Unable to retrieve your location');
          });
        }
        console.log(status);
      }
    
    const handleSubmit = async (event) => {

        event.preventDefault();
        getLocation();
        let query = {};
        query["nearby_lat"] = nearby_lat;
        query["nearby_lon"] = nearby_lon;
        query["option"] = data.option;
        query["isNearby"] = true;
    
        router.push({
            pathname: '/search-results-page',
            query,
          });
      };

    useEffect(() => {
        getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Card className="card-poster gradient-overlay hover-animate mb-4 mb-lg-0" onClick={handleSubmit}>
          <div>
          <BrowserRouter>
            <Link to="#">
                    <div className="tile-link" />
                </Link>
            </BrowserRouter>
         </div>
          <img src={`/content/${data.img}`} alt="Card image" className="bg-image" />
          <CardBody className="card-body overlay-content">
              <CardTitle tag="h6" className="card-title text-shadow text-uppercase">
                  {data.title}
              </CardTitle>
          </CardBody>
      </Card>

  )
}

export default CardSurfOptions;
