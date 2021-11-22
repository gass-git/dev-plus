import axios from "axios";

let answers_api = "https://api.stackexchange.com/2.3/users/14895985/answers?order=desc&sort=activity&site=stackoverflow";

function getAnswers({setAnswers, setLastAnswer}){
    var mergedArrays = [];
    
    axios.get(answers_api)
    .then((resp) => {
      // Last 4 asnswers data
      let answersArray = resp.data.items.slice(0,4);
      
      // Get questions titles associated to the answers
      answersArray.forEach((answer, index) => {
          let id = answer.question_id;
          let questions_api = `https://api.stackexchange.com/2.3/questions/${id}?order=desc&sort=activity&site=stackoverflow`
          
          axios.get(questions_api)
          .then((resp) => {
            let questionTitle = resp.data.items[0].title;
            
            mergedArrays.push({
              ...answersArray[index],
              ...{'title':questionTitle}
            });
            setAnswers(mergedArrays);
            setLastAnswer(mergedArrays[0].title);
          });  
        }
      );
    });
}

export default getAnswers;