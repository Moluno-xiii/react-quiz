import React from "react";
import { useQuiz } from "./contexts/QuizProvider";

export default function Start() {
const {numOfQuestions, dispatch} = useQuiz()
  return (
    <div className="start">
      <p>Welcome to React Quiz</p>
      <h3>{numOfQuestions} questions to test your react mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({type : "start"})}>
        Let's start
      </button>
    </div>
  );
}
