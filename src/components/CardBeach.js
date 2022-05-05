import React, {useState} from "react";
import {  Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap'

import img1 from "./images/surf_photo_1.jpeg"
import img2 from "./images/surf_photo_2.jpeg"
import img3 from "./images/surf_lessons_1.jpeg"
import img4 from "./images/sad_surf.jpeg"

const beachImages = [
  img1,
  img2,
  img3,
  img4
];

const CardBeach = (props) => {
  const data = props.data
  const type = props.type
  const center = props.center
  const randomIndex = useState(Math.floor(Math.random() * beachImages.length));
  
  const query = {
    "beach_name" : data.beach_name,
    "beach_lon": center[1],
    "beach_lat": center[0],
    "thumbnail": beachImages[randomIndex[0]],
    "id": data["surfline_id"],
    "surfscore": data["surf_score"]
  }

  console.log("this is props", props)

  return (
    <Card className="card-poster gradient-overlay hover-animate mb-4 mb-lg-0">
        <div>
        <Link 
          to={{ 
            pathname: '/surf-page-detail', 
            state: { query: query, search_type: type},
            id: props.data.id
          }}
        >
          <div className="tile-link" />
        </Link>
        </div>
        <img src={beachImages[randomIndex[0]]} alt={data.beach_name} className="bg-image" />
        <CardBody className="card-body overlay-content">
          <CardTitle tag="h6" className="card-title text-shadow text-uppercase">
            {data.beach_name}
          </CardTitle>
          <CardSubtitle className="d-flex mb-3">
              <p className="card-title text-shadow text-sm">
                  Distance: {parseFloat(data.yelp_beach_distance_from_shop).toFixed(2)}
              </p>

              
          </CardSubtitle>
          <div className="surfscore-cardBeach">
              <p className="card-title text-shadow text-sm">
                  SurfScore: {(query["surfscore"]).toFixed(2)}
              </p>
              </div>
        </CardBody>
    </Card>
  )

}

export default CardBeach;

