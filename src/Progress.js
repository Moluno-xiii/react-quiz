import React from 'react'
import { useQuiz } from './contexts/QuizProvider';

export default function Progress() {
  const {points, totalPoints, index, answer, numOfQuestions} = useQuiz()
  return (
    <header className="progress">
      <progress max={15} value={(index + Number(answer !== null))} />

      <p>
        {index + 1} of {numOfQuestions} questions
      </p>

      <p>
        {points} / {totalPoints} Points
      </p>
    </header>
  );
}
