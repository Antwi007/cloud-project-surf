import React from 'react';
import { Card,CardText, CardBody, Col } from 'reactstrap';
import Icon from './WeatherIcon';

const WeatherCard = (props) => {
 const data = props.data[0];

  return (
    <div>
      <Card>
        <CardBody>
          <Col className="justify-content-center">
            <div className="text-center">
            <Icon></Icon>
            </div>
            <CardText className="text-center">
              Time: {data["time"]}
            </CardText>
            <p className="text-center">
             Surf Height : {data["min-surf-height"]}-{data["max-surf-height"]} ft
            </p>
            <p className="text-center">
              Human Relation : {data["HumanRelation"]}
            </p>
          </Col>
        </CardBody>
      </Card>
    </div>
  );
};

export default WeatherCard;
