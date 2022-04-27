import React from "react";
import { Link } from 'react-router-dom'
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap'

const CardSurf = (props) => {
    const data = props.data
    var type = null;

    if (data["beach_name"] !== undefined) {
        type = "beaches"
    } else if (data["lesson_name"] !== undefined) {
        type = "lessons"
    } else if (data["shop_name"] !== undefined) {
        type = "surfshops"
    } 

    return (

        <Card className="h-auto border-0 shadow">
            <div className="card-img-top overflow-hidden gradient-overlay">
                <img src={data.thumbnail} alt={type} className="img-fluid" />
                <Link to={{ pathname: '/surf-page-detail', state: { query: data, search_type: type } }}>
                    <div className="tile-link" />
                </Link>
            </div>
            <CardBody className="d-flex align-items-center">
                <div className="w-100">
                    <CardTitle tag="h6">
                        <Link to={{ pathname: '/surf-page-detail', state: { query: data, search_type: type } }}>
                            <div className="text-decoration-none text-dark">
                                {type}
                            </div>
                        </Link>
                    </CardTitle>
                    {data.surf_score &&
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

