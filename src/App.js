import React, { useReducer } from "react";
import Amounts from "./Amounts";
import Buttons from "./Buttons";
import Header from "./Header";

// open, RequestLoan, deposit, withdraw, payLoan, closeAccount
const initialState = {
  balance: Number(0),
  loan: Number(0),
  status: "not opened",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "openAccount":
      console.log(state.status)
      return {
        ...state,
        status: "open",
      };

    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "requestLoan":
      return {
        ...state,
        loan: state.loan + action.payload,
        balance: state.balance + action.payload,
      };

    case "withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "payLoan":
      return {
        ...state,
        loan: 0,
      };

    case "closeAccount":
      return {
        ...state, loan : 0, balance: 0, status : "not opened"
      };
    default:
      return state;
  }
};

export default function App() {
  const [{ balance, loan, status }, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Header />
      <Amounts balance={balance} loan={loan} />
      <Buttons dispatch={dispatch} status={status} balance={balance} loan={loan}/>
    </div>
  );
}
