import React from 'react'
import Options from './Options'

export default function Question({answer, question, points, index, numOfQuestions, dispatch
}) {
  return (
    <div>

      <h4>{question.question}</h4>
      <Options question={question} points = {points} dispatch = {dispatch} answer = {answer}/>
    </div>
  );
}
