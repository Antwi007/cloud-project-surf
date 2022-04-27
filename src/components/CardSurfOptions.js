/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link, BrowserRouter } from "react-router-dom";

import {
  Card,
  CardBody,
  CardTitle
} from 'reactstrap'

const CardSurfOptions = (props) => {

  const nearby_lat = useSelector(state => state.auth.nearby_lat)
  const nearby_lon = useSelector(state => state.auth.nearby_lon)
  const data = props.data;
  const router = useHistory();

  const handleSubmit = async (event) => {

    event.preventDefault();
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
