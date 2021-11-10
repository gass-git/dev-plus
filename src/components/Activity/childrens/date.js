import React from "react";
import { Fragment } from "react";

const Date = ({ entry }) => {
  var x = new window.Date(entry * 1000),
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  year = x.getFullYear(), month = months[x.getMonth()], 
  day = x.getDate();
  
  if(day < 10) { day = "0" + day }

  var convertedDate = month + " " + day + " " + year;
  return <Fragment>{convertedDate}</Fragment>;
};

export default Date;