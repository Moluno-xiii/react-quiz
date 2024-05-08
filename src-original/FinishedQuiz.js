import React from 'react'

export default function FinishedQuiz({points, totalPoints}) {
const pointsPercentage = (points / totalPoints ) * 100

  return (
    <p className='result' style={{padding : "5px 10px"}}>
        You scored {points} out of {totalPoints} ({Math.ceil(pointsPercentage)}%)
    </p>
  )
}
