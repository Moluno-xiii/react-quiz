import React from "react";
import { useQuiz } from "./contexts/QuizProvider";

export default function Options() {
  const { question, dispatch, answer } = useQuiz();
  const disable = answer !== null;
  return (
    <div>
      {question.options.map((option, i) => {
        return (
          <button
            className={`btn btn-option ${i === answer ? "answer" : ""} ${
              disable
                ? i === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            style={{ marginBottom: "5px" }}
            onClick={() => {
              dispatch({ type: "newAnswer", payload: i });
            }}
            disabled={disable}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
