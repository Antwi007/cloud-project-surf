import React from "react";
import { BrowserRouter, Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap'

const CardSurf = (props) => {
  const data = props.data
  return (
    
    <Card className="h-100 border-0 shadow">
            <div className="card-img-top overflow-hidden gradient-overlay">
                <img src={`/content/img/${data.image}`} alt={data.name} className="img-fluid" />
                <BrowserRouter>
                  <Link to="/detail-rooms">
                      <div className="tile-link" />
                  </Link>
                </BrowserRouter>
            </div>
            <CardBody className="d-flex align-items-center">
                <div className="w-100">
                    <CardTitle tag="h6">
                      <BrowserRouter>
                        <Link to="/detail-rooms">
                            <div className="text-decoration-none text-dark">
                                {data.name}
                            </div>
                        </Link>
                      </BrowserRouter>
                    </CardTitle>
                    <CardSubtitle className="d-flex mb-3">
                        <p className="flex-grow-1 mb-0 text-muted text-sm">
                            SurfScore : {data.stars}
                        </p>
                    </CardSubtitle>
                </div>
            </CardBody>
        </Card>
  )

}

export default CardSurf;

