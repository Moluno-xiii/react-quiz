import React from "react";

export default function Buttons({dispatch, status, balance, loan}) {

  return (
    <div>
      <Button value={"Open Account"} clickEvent = {() => {dispatch({type : "openAccount"})}} disabled = {status === "open"}/>
    {  
    status === "open" &&
    <>
      <Button value={"Deposit 1000"} clickEvent = {() => {dispatch({type : "deposit" , payload : Number(1000)})}}/>
      <Button value={"Withdraw 200"} clickEvent = {() => {dispatch({type : "withdraw", payload : 200 })}} disabled={balance < 200}/>
      <Button value={"Request a loan of 5000"} clickEvent = {() => {dispatch({type : "requestLoan" , payload : 5000})}}/>
      <Button value={"Pay Loan"} clickEvent = {() => {dispatch({type : "payLoan"})}}/>
      <Button value={"Close Account"} clickEvent = {() => {dispatch({type : "closeAccount"})}} disabled={balance <= 0 && loan <= 0 }/>
    </>
      }
    </div>
  );
}

const Button = ({ value, clickEvent, disabled }) => {
  return <button className="btn" disabled = {disabled} onClick={clickEvent}>{value}</button>;
};
