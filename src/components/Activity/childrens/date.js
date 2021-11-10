import React from "react";
import { Fragment } from "react";

const Date = ({ entry }) => {
  var x = new window.Date(entry * 1000),
  year = x.getFullYear(), month = x.getMonth() + 1, 
  day = x.getDate();
  
  if(day < 10) { day = "0" + day }
  if(month < 10) { month = "0" + month }

  var convertedDate = year + "-" + month + "-" + day;
  return <Fragment>{convertedDate}</Fragment>;
};

export default Date;