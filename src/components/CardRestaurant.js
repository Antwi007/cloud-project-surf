import React from 'react'
import { Link } from 'react-router-dom'

import {
    Card,
    CardBody
} from 'reactstrap'

import Stars from '../components/Stars'

const CardRestaurant = (props) => {

    const data = props.data
    return (
        <Card 
            className="h-100 border-0 shadow"
            onMouseEnter={() => {
                props.onCardEnter(data.id)
            }}
            onMouseLeave={() => {props.onCardEnter()}}
        >
            <div
                style={{
                    backgroundImage: `url(${data.image_url})`,
                    minHeight: "200px"
                }}
                className="card-img-top overflow-hidden dark-overlay bg-cover"
            >
                <div className="card-img-overlay-bottom z-index-20">
                    <h4 className="text-white text-shadow">
                        {data.name}
                    </h4>
                    <p className="mb-2 text-xs">
                        <Stars stars={data.rating} />
                    </p>
                </div>
            </div>
            <a target="_blank" href={data.web_url}>
              <CardBody>
                  <p className="text-primary">
                      <i className="fa-map-marker-alt fa mr-1" />
                      &nbsp;{data.display_address[0] && data.display_address[0]}
                  </p>
              </CardBody>
            </a>
        </Card>
    )
}

export default CardRestaurant;
