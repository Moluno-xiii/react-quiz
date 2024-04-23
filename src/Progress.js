import React from 'react'

export default function Progress({points, totalPoints, index, answer, numOfQuestions }) {
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
