import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import ErrorMessage from "./Error";
import Start from "./Start";
import Question from "./Question";
import Progress from "./Progress";
import FinishedQuiz from "./FinishedQuiz";

const initialState = {
  questions: [],

  // loading, error, finished, ready
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      console.log(state);
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataError":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
      };

    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finishedQuiz":
      return {
        ...state,
        index: 0,
        answer: null,
        status: "finished",
      };


    case "restart":
      return {
        ...state, points : 0, index : 0, answer : null, status : "ready"
      }

    default:
      throw new Error("Invalid action type");
  }
};

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numOfQuestions = questions.length;
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((result) => result.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataError" }));
  }, []);

  const totalPoints = questions.reduce((a, b) => a + b.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && (
          <Start numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              totalPoints={totalPoints}
              points={points}
              index={index}
              answer={answer}
              numOfQuestions={numOfQuestions}
            />
            <Question
              numOfQuestions={numOfQuestions}
              question={questions[index]}
              index={index}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />
          </>
        )}
      </Main>

      {status === "finished" && (
        <>
          <FinishedQuiz points={points} totalPoints={totalPoints} />

          <button
            className="btn"
            onClick={() => {
              dispatch({ type: "restart" });
            }}
          >
            restart
          </button>
        </>
      )}
      <div>
        {status === "active" &&
          index < numOfQuestions - 1 &&
          answer != null && (
            <button
              className="btn"
              onClick={() => {
                dispatch({ type: "nextQuestion" });
              }}
            >
              Next Question
            </button>
          )}

        {status === "active" &&
          index === numOfQuestions - 1 &&
          answer !== null && (
            <>
              <button
                className="btn"
                onClick={() => {
                  dispatch({ type: "finishedQuiz" });
                }}
              >
                finish
              </button>
            </>
          )}
      </div>
    </div>
  );
}

export default App;
