import { createContext, useContext } from "react";
import { useReducer, useEffect } from "react";


const QuizContext = createContext()

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
    //   console.log(state);
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
        ...state,
        points: 0,
        index: 0,
        answer: null,
        status: "ready",
      };

    default:
      throw new Error("Invalid action type");
  }
};

function QuizProvider({children}) {
      const [{ questions, status, index, answer, points }, dispatch] =
        useReducer(reducer, initialState);

      const numOfQuestions = questions.length;

      useEffect(() => {
        fetch("http://localhost:8000/questions")
          .then((result) => result.json())
          .then((data) => dispatch({ type: "dataReceived", payload: data }))
          .catch((err) => dispatch({ type: "dataError" }));
      }, []);

        const totalPoints = questions.reduce((a, b) => a + b.points, 0);
         const question = questions[index];
  return (
    <QuizContext.Provider value={{
        dispatch, numOfQuestions, status, index, answer, points, questions, totalPoints, question
    }}>
        {children}
    </QuizContext.Provider>
  )
}

const useQuiz = () => {
    const context = useContext(QuizContext)
    if (context === undefined) {
        throw new Error("Context was used outside it's scope")
    }
    return context
}

export {useQuiz, QuizProvider}

     