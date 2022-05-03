import React, { useState } from "react";
import { Link } from 'react-router-dom'
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';

import '../scss/surfscore.scss';

const CardSurf = (props) => {
    const data = props.data;
    var color = "red"

    var type = null;

    if (data["beach_name"] !== undefined) {
        type = "beaches"
    } else if (data["lesson_name"] !== undefined) {
        type = "lessons"
    } else if (data["shop_name"] !== undefined) {
        type = "surfshops"
    }

    var secondaryText = null;
    if (data["beach_name"] !== undefined) {

        if (data.surf_score.toFixed(2) < 4){
            color="red"
        } else if (data.surf_score.toFixed(2)< 7){
            color = "yellow"
        } else{
            color = "green"
        }
        secondaryText = "SurfScore: " + data.surf_score.toFixed(2)
    } else if (data["lesson_name"] !== undefined && data.distance_from_coord_miles) {
        secondaryText = "Distance from Loc: " + data.distance_from_coord_miles;
    } else if (data["shop_name"] !== undefined && data.distance_from_coord_miles) {
        secondaryText = "Distance from Loc: " + data.distance_from_coord_miles;
    } else if (data["lesson_name"] !== undefined || data["shop_name"] !== undefined ) {
        secondaryText = "Rating: " + data.rating;
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
                                {(data["beach_name"] ?? data["lesson_name"]) ?? data["shop_name"]}
                            </div>
                        </Link>
                    </CardTitle>
                    <CardSubtitle className="d-flex mb-3">
                        <p className="flex-grow-1 mb-0 text-muted text-sm">
                            
                            {(data["beach_name"] !== undefined) ?
                                <>
                                <span>SurfScore: </span> <span className={color}>{data.surf_score.toFixed(2)}</span>

                                </>
                            :
                            <>
                                {secondaryText}
                            </>
                            }
                            
                            
                        </p>
                    </CardSubtitle>
                </div>
            </CardBody>
        </Card>
    )

}

export default CardSurf;

