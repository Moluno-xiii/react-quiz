import React from "react";
import { useQuiz } from "./contexts/QuizProvider";

export default function FinishedQuiz() {
  const { points, totalPoints } = useQuiz();
  const pointsPercentage = (points / totalPoints) * 100;

  return (
    <p className="result" style={{ padding: "5px 10px" }}>
      You scored {points} out of {totalPoints} ({Math.ceil(pointsPercentage)}%)
    </p>
  );
}
