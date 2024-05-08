import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import ErrorMessage from "./Error";
import Start from "./Start";
import Question from "./Question";
import Progress from "./Progress";
import FinishedQuiz from "./FinishedQuiz";
import { useQuiz } from "./contexts/QuizProvider";

function App() {
  const { status, numOfQuestions, dispatch, index, answer } = useQuiz();

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
            <Progress />
            <Question />
          </>
        )}
      </Main>

      {status === "finished" && (
        <>
          <FinishedQuiz />

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
