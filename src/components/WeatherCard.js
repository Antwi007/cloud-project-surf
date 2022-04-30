import React from 'react';
import { Card, CardImg, CardText, CardBody, Col } from 'reactstrap';

const WeatherCard = (props) => {
 const data = props.data;

  return (
    <div>
      <Card>
        <CardBody>
          <Col className="justify-content-center">
            <CardImg top src={data["icon"]} alt="Card image cap" />
            <CardText className="text-center">
              {data["text_desc"]}
            </CardText>
            <CardText className="text-center">
              Temperature: {data["temp"]} °F
            </CardText>
            <p className="text-center">
             Feels Like : {data["feels_like"]} °F
            </p>
            <p className="text-center">
              Wind : {data["wind_mph"]} mph
            </p>
          </Col>
        </CardBody>
      </Card>
    </div>
  );
};

export default WeatherCard;
