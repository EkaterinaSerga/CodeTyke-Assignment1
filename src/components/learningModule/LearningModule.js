import React from "react";
import SelectionBox from "../selectionBox/SelectionBox";
import Button from "../button/Button";
import useWindowDimensions from "../../useWindowDimensions.js";

import "./Styles.scss";

const LearningModule = ({ setGameStatus }) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const { height, width } = useWindowDimensions();

  let currentQuestion = quizData.questionArr
    ? quizData.questionArr[currentQuestionId]
    : {};
  React.useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = () => {
    fetch("http://localhost:8080/problems")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuizData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    if (currentQuestionId < quizData.totalQuestions - 1) {
      setCurrentQuestionId(currentQuestionId + 1);
    } else {
      setCurrentQuestionId(0);
      setGameStatus({ message: "Great Job! Play again.", loadIntro: true });
    }
  };
  let possibleAnswers = [];
  if (currentQuestion.possibleAnswers) {
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox id={index} key={index} answer={answer} />;
    });
  }
  return (
    <div className="learningModule">
      {currentQuestion.title && (
        <>
          <div className="learningModule--header">
            <div className="learningModule--title">{currentQuestion.title}</div>
            <div className="learningModule--subHeader">
              {width > 430 ? currentQuestion.additionalInfo : null}
            </div>
          </div>

          <div className="learningModule--answerArea">
            <div className="learningModule--selections">{possibleAnswers}</div>
            <div className="learningModule--submitButtonContainer">
              <Button label="Submit" handleSubmit={handleSubmit} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LearningModule;
