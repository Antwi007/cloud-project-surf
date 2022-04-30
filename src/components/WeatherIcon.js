import React from "react";
import WeatherIcon from "react-icons-weather";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  icon: {
    padding: theme.spacing(3, 2),
    fontSize: "4.5rem",
    color: "#66bb6a"
  }
}));

export const Icon = ({ code = 761, size = "3x" }) => {
  const classes = useStyles();

  return (
    <div>
      <WeatherIcon
        name="owm"
        iconId={code}
        flip="horizontal"
        rotate="90"
        className={classes.icon}
        fixedWidth={false}
      />
    </div>
  );
};

export default Icon;
