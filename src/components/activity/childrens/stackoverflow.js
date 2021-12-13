import React from "react";
import Date from './date';
import { Fragment } from 'react';

export default function Stackoverflow({answers}){
  return [
    <Fragment key="SO-identifier">
      <div className="sub-title">
          LATEST EDITS & ANSWERS
      </div>
      <div className="container">
        {answers.map((data) => {
          let answer_id = data.answer_id,
              answerURL = "https://stackoverflow.com/a/" + answer_id;
          
          return [
            <a 
              key={answer_id} 
              href={answerURL} 
              className="block" 
              target="_blank" 
              rel="noreferrer"
              title="See on Stack Overflow"
            >
              <div className="date">
                <Date entry={data.creation_date} />
              </div>
              <div className="question">
                {data.title}
              </div>
            </a>
          ]
          })}
      </div> 
    </Fragment>
  ]
}