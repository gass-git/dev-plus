import React, {useState} from "react";
import reactDom from "react-dom";
import './activity.css';
import Date from './childrens/date';

const Activity = ({questions, answers}) => {

  const Block = (question_id, answer_id, date) => {
    let url = "https://stackoverflow.com/a/" + answer_id;

    return (
      <React.Fragment>
      {/* <Date key={answer_id} entry={date} /> */}
        <div className="block">
          <a
            className="cap"
            key={question_id}
            href={url}
            target="_blank"
            rel="noreferrer"
            title="Go to answer"
          >
           
          </a>
        </div>
      </React.Fragment>
    );
  };

  return (
    <section className="activity">
      <div className="title">Activity</div>
      <div className="content">
        <div className="sub-title">
          STACK OVERFLOW LATEST ANSWERS
        </div>
        <div className="container">
          {answers.map((data, index) => {
              return (
                <Block
                  key={data.answer_id}
                  date={data.creation_date}
                  question_id={data.question_id}
                  answer_id={data.answer_id}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default Activity;