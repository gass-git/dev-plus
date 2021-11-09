import React, { useEffect, useState } from "react";

const Question = ({ questionID, answerID }) => {
  const [questions, setQuestions] = useState([]);
  let api_url = `https://api.stackexchange.com/2.3/questions/${questionID}?order=desc&sort=activity&site=stackoverflow`;

  const getQuestions = async () => {
    let response = await fetch(api_url);
    let obj = await response.json();
    let responseArr = obj.items.slice(0, 5);

    responseArr.forEach(function (obj) {
      delete obj.owner;
      delete obj.tags;
    });

    setQuestions(responseArr);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  let AnswerURL = "https://stackoverflow.com/a/" + answerID;

  return (
    <React.Fragment>
      {questions.map((data) => {
        return (
          <a
            className="cap"
            key={questionID}
            href={AnswerURL}
            target="_blank"
            rel="noreferrer"
            title="Go to answer"
          >
            {data.title}
          </a>
        );
      })}
    </React.Fragment>
  );
};

export default Question;