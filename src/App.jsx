import { useState } from "react";

import TestSelector from "./components/TestSelector";
import TestScreen from "./components/TestScreen";
import TestResult from "./components/TestResult";

import questions from "./data/questions";

import "./App.css";

function App() {
  /* =========================
     PASSWORD
  ========================= */

  const CORRECT_PASSWORD = "033220";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  /* =========================
     DIVIDE QUESTIONS
  ========================= */

  const tests = [
    questions.slice(0, 30),
    questions.slice(30, 60),
    questions.slice(60, 90),
  ];

  /* =========================
     STATES
  ========================= */

  const [testNumber, setTestNumber] = useState(null);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswers, setSelectedAnswers] =
    useState({});

  const [showResult, setShowResult] =
    useState(false);

  /* =========================
     PASSWORD LOGIN
  ========================= */

  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      setIsLoggedIn(true);
      setPasswordError("");
      setPassword("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  };

  /* =========================
     ENTER KEY LOGIN
  ========================= */

  const handlePasswordKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  /* =========================
     CURRENT TEST
  ========================= */

  const currentTest =
    testNumber !== null
      ? tests[testNumber - 1]
      : [];

  const question =
    currentTest.length > 0
      ? currentTest[currentQuestion]
      : null;

  /* =========================
     GLOBAL QUESTION NUMBER
  ========================= */

  const globalQuestionNumber =
    testNumber !== null
      ? (testNumber - 1) * 30 +
        currentQuestion +
        1
      : 0;

  /* =========================
     SELECT TEST
  ========================= */

  const handleSelectTest = (number) => {
    setTestNumber(number);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  /* =========================
     SELECT ANSWER
  ========================= */

  const handleSelectAnswer = (answer) => {
    if (testNumber === null) return;

    setSelectedAnswers((previous) => ({
      ...previous,
      [globalQuestionNumber]: answer,
    }));
  };

  /* =========================
     NEXT QUESTION
  ========================= */

  const handleNext = () => {
    if (currentQuestion < currentTest.length - 1) {
      setCurrentQuestion(
        (previous) => previous + 1
      );
    } else {
      setShowResult(true);
    }
  };

  /* =========================
     PREVIOUS QUESTION
  ========================= */

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) => previous - 1
      );
    }
  };

  /* =========================
     JUMP TO QUESTION
  ========================= */

  const handleQuestionChange = (index) => {
    setCurrentQuestion(index);
    setShowResult(false);
  };

  /* =========================
     CURRENT TEST SCORE
  ========================= */

  const calculateScore = () => {
    if (testNumber === null) return 0;

    let score = 0;

    currentTest.forEach((item, index) => {
      const number =
        (testNumber - 1) * 30 +
        index +
        1;

      if (
        selectedAnswers[number] ===
        item.answer
      ) {
        score++;
      }
    });

    return score;
  };

  /* =========================
     FINAL SCORE
  ========================= */

  const calculateFinalScore = () => {
    let totalScore = 0;

    tests.forEach((test, testIndex) => {
      test.forEach((item, questionIndex) => {
        const number =
          testIndex * 30 +
          questionIndex +
          1;

        if (
          selectedAnswers[number] ===
          item.answer
        ) {
          totalScore++;
        }
      });
    });

    return totalScore;
  };

  /* =========================
     REVIEW TEST
  ========================= */

  const handleReview = () => {
    setCurrentQuestion(0);
    setShowResult(false);
  };

  /* =========================
     CHOOSE ANOTHER TEST
  ========================= */

  const handleChooseAnotherTest = () => {
    setTestNumber(null);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  /* =========================
     START AGAIN
  ========================= */

  const handleStartAgain = () => {
    setTestNumber(null);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResult(false);
  };

  /* =====================================================
     PASSWORD SCREEN
  ===================================================== */

  if (!isLoggedIn) {
    return (
      <main className="password-page">

        <div className="password-card">

          <div className="password-icon">
            🔒
          </div>

          <h1>
            Enter Password
          </h1>

          <p>
            Please enter the password to
            access the test.
          </p>

          <div className="password-input-wrapper">

            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError("");
              }}
              onKeyDown={handlePasswordKeyDown}
            />

          </div>

          {passwordError && (
            <div className="password-error">
              {passwordError}
            </div>
          )}

          <button
            className="password-login-button"
            onClick={handleLogin}
          >
            LOGIN
          </button>

        </div>

      </main>
    );
  }

  /* =====================================================
     WEBSITE
  ===================================================== */

  return (
    <main className="app">

      {/* TEST SELECTION */}

      {testNumber === null ? (

        <TestSelector
          onSelectTest={handleSelectTest}
        />

      ) : !showResult ? (

        /* TEST SCREEN */

        <TestScreen
          testNumber={testNumber}
          currentTest={currentTest}
          currentQuestion={currentQuestion}
          question={question}
          selectedAnswers={selectedAnswers}
          onSelectAnswer={handleSelectAnswer}
          onQuestionChange={handleQuestionChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

      ) : (

        /* RESULT SCREEN */

        <div className="test-container">

          <header className="test-header">

            <div className="header-left">

              <h1>TEST</h1>

              <span className="test-badge">
                Test {testNumber}
              </span>

            </div>

            <div className="header-right">
              Questão {testNumber * 30} / 90
            </div>

          </header>

          {testNumber < 3 ? (

            <TestResult
              testNumber={testNumber}
              score={calculateScore()}
              onNextTest={
                handleChooseAnotherTest
              }
              onReview={handleReview}
            />

          ) : (

            /* FINAL RESULT */

            <div className="result-card">

              <div className="result-icon">
                ✓
              </div>

              <h2>
                All Tests Completed!
              </h2>

              <p className="result-subtitle">
                You completed all 90 questions.
              </p>

              <div className="result-score">
                {calculateFinalScore()}
                <span> / 90</span>
              </div>

              <div className="result-details">

                <div className="result-item">
                  <span>
                    Correct Answers
                  </span>

                  <strong>
                    {calculateFinalScore()}
                  </strong>
                </div>

                <div className="result-item">
                  <span>
                    Wrong Answers
                  </span>

                  <strong>
                    {90 - calculateFinalScore()}
                  </strong>
                </div>

                <div className="result-item">
                  <span>
                    Percentage
                  </span>

                  <strong>
                    {Math.round(
                      (calculateFinalScore() /
                        90) *
                        100
                    )}
                    %
                  </strong>
                </div>

              </div>

              <div className="result-buttons">

                <button
                  className="review-button"
                  onClick={
                    handleChooseAnotherTest
                  }
                >
                  Choose Another Test
                </button>

                <button
                  className="next-test-button"
                  onClick={handleStartAgain}
                >
                  Start Again
                </button>

              </div>

            </div>

          )}

        </div>

      )}

    </main>
  );
}

export default App;