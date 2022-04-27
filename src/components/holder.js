import React from "react";
import { useHistory } from 'react-router-dom'
import {  Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap'
import SurfingService  from '../apis/SurfingService'

const CardSurf = (props) => {
    const data = props.data
    const type = props.type
    const surfingObject = new SurfingService();
    const router = useHistory();

    var name_dict = {
    "beaches" : "beach_name",
    "lessons" : "shop_name",
    "surfshops" : "shop_name"
    }

    async function getSurfResults(surf_id) {
        try {
          const params = {}
            
          if(surf_id) {
              params["id"] = surf_id;
          }
          const resp = await surfingObject.getSurfDetails(params)
          
          if(resp.statusCode === 200) {
              return resp.body;
          }
          
        } catch (error) {
          console.log(error)
        }
      }


    const handleSubmit = async (event) => {

        event.preventDefault();
        let query = {};
        
        if(type === "beaches") {
            var results = getSurfResults(data.surfline_id)
            if(data){
                query["surf_details"] = results
            }
        }

        query["type"] = type
        query["data"] = data
        router.push({
            pathname: '/search-page-detail',
            query,
          });
      };


  return (
    
    <Card className="h-100 border-0 shadow" onClick={handleSubmit}>
            <div className="card-img-top overflow-hidden gradient-overlay">
                <img src={data.thumbnail} alt={data[name_dict[type]]} className="img-fluid"/>
                  <Link to="#">
                      <div className="tile-link" />
                  </Link>
            </div>
            <CardBody className="d-flex align-items-center">
                <div className="w-100">
                    <CardTitle tag="h6">
                        <Link to="#">
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

