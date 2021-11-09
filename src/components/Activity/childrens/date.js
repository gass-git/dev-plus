import React from "react";

const Date = ({ date }) => {
  var x = new Date(date * 1000);
  var months = [
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
  ];
  var year = x.getFullYear();
  var month = months[x.getMonth()];
  var day = x.getDate();
  
  day = day < 10 ? "0" + day : null;
  
  var convertedDate = month + " " + day + " " + year;
  
  return (
    <div className="date" title="Answer date">
      {convertedDate} -
    </div>
  );

};

export default Date;