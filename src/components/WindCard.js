import React from 'react';
import { Card, CardText, CardBody, Col } from 'reactstrap';
import Icon from './WeatherIcon';

const WindCard = (props) => {
  const data = props.data[0];

  const date = new Date(data["time"]);

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dateStr = days[date.getDay()] + ", " + months[date.getMonth()] + " " + (date.getDay()+1)


  return (
    <div>
      <Card>
        <CardBody>
          <Col className="justify-content-center">
            <div className="text-center">
              <Icon></Icon>
            </div>
            <CardText className="text-center">
              Date: {dateStr}
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

export default WindCard;
