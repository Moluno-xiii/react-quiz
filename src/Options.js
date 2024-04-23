import React from "react";

export default function Options({ question, dispatch, answer, points }) {
  const disable = answer !== null;
  return (
    // <div>
    //     {question.options.map((option => (
    //         <button className='btn btn-option' key={option} style={{marginBottom : "5px"}}>
    //             {option}
    //         </button>
    //     )))}

    <div>
      {question.options.map((option, i) => {
        return (
          <button
            // className={`btn btn-option ${
            //   !disable
            //     ? i === answer
            //       ? "answer"
            //       : ""
            //     : question.correctOption === i
            //     ? "correct"
            //     : ""
            // }`}
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
    // {/* </div> */}
  );
}
