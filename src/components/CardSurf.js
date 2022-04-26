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
  const type = props.type

var name_dict = {
    "beaches" : "beach_name",
    "lessons" : "shop_name",
    "surfshops" : "shop_name"
}


  return (
    
    <Card className="h-100 border-0 shadow">
            <div className="card-img-top overflow-hidden gradient-overlay">
                <img src={data.thumbnail} alt={data[name_dict[type]]} className="img-fluid"/>
                  <Link to={{ pathname: '/surf-page-detail', state: { query: data, search_type: type}}}>
                      <div className="tile-link" />
                  </Link>
            </div>
            <CardBody className="d-flex align-items-center">
                <div className="w-100">
                    <CardTitle tag="h6">
                        <Link to={{ pathname: '/surf-page-detail', state: { query: true}}}>
                            <div className="text-decoration-none text-dark">
                                {data[name_dict[type]]}
                            </div>
                        </Link>
                    </CardTitle>
                    {  data.surf_score &&
                        <CardSubtitle className="d-flex mb-3">
                            <p className="flex-grow-1 mb-0 text-muted text-sm">
                                SurfScore : {data.surf_score.toFixed(2)}
                            </p>
                        </CardSubtitle>
                    }
                </div>
            </CardBody>
        </Card>
  )

}

export default CardSurf;

