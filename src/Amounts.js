import React from 'react'

export default function Amounts({balance, loan}) {
  return (
    <div className='amount'>
      <p>Balance : {balance}</p>
      <p>Loan : {loan}</p>
    </div>
  )
}
