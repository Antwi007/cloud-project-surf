import React from 'react';
import { Card, CardText, CardBody, Col } from 'reactstrap';
import Icon from './WeatherIcon';

const WindCard = (props) => {
  const data = props.data[0];

  var date = null;
  try {
    date = new Date(data["time"]);
  } catch {
    date = new Date();
  }

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dateStr = days[date.getDay()] + ", " + months[date.getMonth()] + " " + (date.getDay() + 1)

  var surfHeight = "2-3";
  var humanRelation = "Thigh to waist"
  try {
    surfHeight = data["min-surf-height"] + "-" + data["max-surf-height"]
    humanRelation = data["HumanRelation"]
  } catch { }


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
              Surf Height : {surfHeight} ft
            </p>
            <p className="text-center">
              Human Relation : {humanRelation}
            </p>
          </Col>
        </CardBody>
      </Card>
    </div>
  );
};

export default WindCard;