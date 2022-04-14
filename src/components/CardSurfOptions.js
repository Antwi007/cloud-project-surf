/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { BrowserRouter, Link }from "react-router-dom";

import {
    Card,
    CardBody,
    CardTitle
} from 'reactstrap'


const CardSurfOptions = (props) => {
    
    const data = props.data

    return (
      <Card className="card-poster gradient-overlay hover-animate mb-4 mb-lg-0">
          <div>
          <BrowserRouter>
          <Link to="/">
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
