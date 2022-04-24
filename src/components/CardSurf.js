import React from "react";
import {  Link } from 'react-router-dom'
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
                <img src={data.thumbnail} alt={data.beach_name} className="img-fluid"/>
                  <Link to="/surf-page-detail">
                      <div className="tile-link" />
                  </Link>
            </div>
            <CardBody className="d-flex align-items-center">
                <div className="w-100">
                    <CardTitle tag="h6">
                        <Link to="/surf-page-detail">
                            <div className="text-decoration-none text-dark">
                                {data.beach_name}
                            </div>
                        </Link>
                    </CardTitle>
                    <CardSubtitle className="d-flex mb-3">
                        <p className="flex-grow-1 mb-0 text-muted text-sm">
                            SurfScore : {2}
                        </p>
                    </CardSubtitle>
                </div>
            </CardBody>
        </Card>
  )

}

export default CardSurf;

