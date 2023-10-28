// App.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from './AuthContext'; // Import the AuthProvider
import "./App.css";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Welcome from "./Components/Welcome"; // Import the Welcome component
import Question from "./Components/Question";
import Score from "./Components/Score";

function App() {
  const [state, setState] = useState({
    questionBank: [],
    currentQuestion: 0,
    selectedOption: "",
    score: 0,
    quizEnd: false,
    quizStarted: false,
  });

    useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple"
        );
        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const questionBank = data.results.map((questionData, index) => ({
              id: index + 1,
              question: questionData.question,
              options: [
                questionData.correct_answer,
                ...questionData.incorrect_answers,
              ],
              answer: questionData.correct_answer,
            }));
            setState({ ...state, questionBank, loading: false });
          } else {
            console.error("No questions found in API response");
            setState({ ...state, loading: false });
          }
        } else {
          console.error("Failed to fetch questions");
          setState({ ...state, loading: false });
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setState({ ...state, loading: false });
      }
    }
  
    if (!state.questionBank.length) {
      // Fetch data only when questionBank is empty
      fetchData();
    }
  }, []);
  
  const handleOptionChange = (e) => {
    setState({ ...state, selectedOption: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    checkAnswer();
    handleNextQuestion();
  };

  const checkAnswer = () => {
    const { questionBank, currentQuestion, selectedOption } = state;
    if (selectedOption === questionBank[currentQuestion].answer) {
      setState((prevState) => ({ ...prevState, score: prevState.score + 1 }));
    }
  };

  const handleNextQuestion = () => {
    const { questionBank, currentQuestion } = state;
    if (currentQuestion + 1 < questionBank.length) {
      setState((prevState) => ({
        ...prevState,
        currentQuestion: prevState.currentQuestion + 1,
        selectedOption: "",
      }));
    } else {
      setState({ ...state, quizEnd: true });
    }
  };
  
  const startQuiz = () => {
    setState({ ...state, quizStarted: true }); // Update quizStarted to true
  };

  const { user } = useAuth(); // Get the user state from the AuthProvider

  return (
    <div className="App d-flex flex-column align-items-center justify-content-center">
      <h1 className="app-title">QUIZ APP</h1>
      {user ? (
        // If the user is authenticated, show the Welcome component
        <Welcome />
      ) : (
        // If the user is not authenticated, show the Login component
        <Login />
      )}
  
      {user && !state.quizStarted ? (
        // If the user is authenticated but the quiz hasn't started, show the "Start Quiz" button
        <button onClick={startQuiz}>Start Quiz</button>
      ) : null}
  
      {user && state.quizStarted ? (
        // If the quiz has started, show the Quiz components
        state.questionBank.length > 0 ? (
          !state.quizEnd ? (
            // During the quiz, show the Question component
            <Question
              question={state.questionBank[state.currentQuestion]}
              selectedOption={state.selectedOption}
              onOptionChange={handleOptionChange}
              onSubmit={handleFormSubmit}
            />
          ) : (
            // After the quiz ends, show the Score component
            <Score
              score={state.score}
              onNextQuestion={handleNextQuestion}
              className="score"
            />
          )
        ) : (
          // While questions are loading, display a loading message
          <p>Loading questions...</p>
        )
      ) : null}
  
      {user && !state.quizStarted && (
        // If the user is authenticated but the quiz hasn't started, show the Logout component
        <Logout />
      )}
    </div>
  );
}

export default App;
