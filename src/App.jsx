import { useState } from "react";

import TestScreen from "./components/TestScreen";
import TestResult from "./components/TestResult";

import questions from "./data/questions";

import "./App.css";

function App() {
  /* =========================
     PASSWORD
  ========================= */

  const CORRECT_PASSWORD = "1991";

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

  // 1 = first 30
  // 2 = second 30
  // 3 = last 30
  const [testNumber, setTestNumber] = useState(1);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [answerError, setAnswerError] = useState("");

  const [showResult, setShowResult] = useState(false);

  /* =========================
     PASSWORD LOGIN
  ========================= */

  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      setIsLoggedIn(true);
      setPasswordError("");
      setPassword("");

      // Login ke baad direct first quiz
      setTestNumber(1);
      setCurrentQuestion(0);
      setShowResult(false);
      setAnswerError("");
    } else {
      setPasswordError(
        "Incorrect password. Please try again."
      );
    }
  };

  /* =========================
     ENTER KEY
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
    tests[testNumber - 1] || [];

  /* =========================
     CURRENT QUESTION
  ========================= */

  const question =
    currentTest.length > 0 &&
    currentTest[currentQuestion]
      ? currentTest[currentQuestion]
      : null;

  /* =========================
     GLOBAL QUESTION NUMBER
  ========================= */

  const globalQuestionNumber =
    (testNumber - 1) * 30 +
    currentQuestion +
    1;

  /* =========================
     SELECT ANSWER
  ========================= */

  const handleSelectAnswer = (answer) => {
    setSelectedAnswers((previous) => ({
      ...previous,
      [globalQuestionNumber]: answer,
    }));

    // Answer select hone par error remove
    setAnswerError("");
  };

  /* =========================
     NEXT QUESTION
  ========================= */

  const handleNext = () => {
    const currentAnswer =
      selectedAnswers[globalQuestionNumber];

    // Answer select nahi kiya
    if (!currentAnswer) {
      setAnswerError(
        "Please select an answer before continuing."
      );

      return;
    }

    // Error remove
    setAnswerError("");

    /* =========================
       NEXT QUESTION
    ========================= */

    if (
      currentQuestion <
      currentTest.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );

      return;
    }

    /* =========================
       30 QUESTIONS COMPLETED
    ========================= */

    setShowResult(true);
  };

  /* =========================
     PREVIOUS QUESTION
  ========================= */

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) => previous - 1
      );

      setAnswerError("");
    }
  };

  /* =========================
     QUESTION NUMBER CLICK
  ========================= */

  const handleQuestionChange = (index) => {
    if (
      index >= 0 &&
      index < currentTest.length
    ) {
      setCurrentQuestion(index);

      setShowResult(false);

      setAnswerError("");
    }
  };

  /* =========================
     CURRENT QUIZ SCORE
  ========================= */

  const calculateScore = () => {
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

    questions.forEach((item, index) => {
      const questionNumber =
        index + 1;

      if (
        selectedAnswers[questionNumber] ===
        item.answer
      ) {
        totalScore++;
      }
    });

    return totalScore;
  };

  /* =========================
     REVIEW CURRENT QUIZ
  ========================= */

  const handleReview = () => {
    setCurrentQuestion(0);

    setShowResult(false);

    setAnswerError("");
  };

  /* =========================
     ANOTHER QUIZ
     30 → 30 → 30
  ========================= */

  const handleAnotherQuiz = () => {
    // Test 1 → Test 2
    if (testNumber < 3) {
      setTestNumber(
        (previous) => previous + 1
      );

      setCurrentQuestion(0);

      setShowResult(false);

      setAnswerError("");

      return;
    }

    // Test 3 ke baad kuch nahi
    // Final result already show hoga
  };

  /* =========================
     START AGAIN
  ========================= */

  const handleStartAgain = () => {
    setTestNumber(1);

    setCurrentQuestion(0);

    setSelectedAnswers({});

    setShowResult(false);

    setAnswerError("");
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
            access the quiz.
          </p>

          <div className="password-input-wrapper">

            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(event) => {
                setPassword(
                  event.target.value
                );

                setPasswordError("");
              }}
              onKeyDown={
                handlePasswordKeyDown
              }
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
     MAIN QUIZ
  ===================================================== */

  return (
    <main className="app">

      {!showResult ? (

        /* =========================
           QUIZ SCREEN
        ========================= */

        <TestScreen
          testNumber={testNumber}
          currentTest={currentTest}
          currentQuestion={currentQuestion}
          question={question}
          selectedAnswers={selectedAnswers}
          onSelectAnswer={
            handleSelectAnswer
          }
          onQuestionChange={
            handleQuestionChange
          }
          onPrevious={
            handlePrevious
          }
          onNext={
            handleNext
          }
          answerError={answerError}
        />

      ) : testNumber < 3 ? (

        /* =========================
           QUIZ 1 / QUIZ 2 RESULT
        ========================= */

        <div className="test-container">

          <header className="test-header">

            <div className="header-left">

              <h1>QUIZ</h1>

              <span className="test-badge">
                Quiz {testNumber}
              </span>

            </div>

            <div className="header-right">

              {testNumber * 30}
              {" "} / 90

            </div>

          </header>

          <TestResult
            testNumber={testNumber}
            score={calculateScore()}
            currentTest={currentTest}
            selectedAnswers={
              selectedAnswers
            }
            onNextTest={
              handleAnotherQuiz
            }
            onReview={handleReview}
          />

        </div>

      ) : (

        /* =========================
           FINAL RESULT
        ========================= */

        <div className="test-container">

          <header className="test-header">

            <div className="header-left">

              <h1>QUIZ</h1>

              <span className="test-badge">
                Completed
              </span>

            </div>

            <div className="header-right">
              90 / 90
            </div>

          </header>

          <div className="result-page">

            <div className="result-card">

              <div className="result-icon">
                ✓
              </div>

              <h2>
                All Quizzes Completed!
              </h2>

              <p className="result-subtitle">
                You completed all 90 questions.
              </p>

              <div className="result-score">

                {calculateFinalScore()}

                <span>
                  {" "} / 90
                </span>

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
                    {90 -
                      calculateFinalScore()}
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
                  className="next-test-button"
                  onClick={
                    handleStartAgain
                  }
                >
                  Start Again
                </button>

              </div>

            </div>

            {/* =========================
                ALL QUESTIONS REVIEW
            ========================= */}

            <div className="answers-review">

              <div className="answers-review-header">

                <h2>
                  All Questions Review
                </h2>

                <p>
                  Review your answers from all 90 questions.
                </p>

              </div>

              {questions.map(
                (item, index) => {

                  const questionNumber =
                    index + 1;

                  const userAnswer =
                    selectedAnswers[
                      questionNumber
                    ];

                  const correctAnswer =
                    item.answer;

                  const isCorrect =
                    userAnswer ===
                    correctAnswer;

                  return (
                    <div
                      className={`review-question ${
                        isCorrect
                          ? "review-correct"
                          : "review-wrong"
                      }`}
                      key={
                        questionNumber
                      }
                    >

                      <div className="review-question-header">

                        <div className="review-question-number">

                          Question{" "}
                          {questionNumber}

                        </div>

                        <div
                          className={`review-status ${
                            isCorrect
                              ? "status-correct"
                              : "status-wrong"
                          }`}
                        >

                          {isCorrect
                            ? "✓ Correct"
                            : "✕ Wrong"}

                        </div>

                      </div>

                      <div className="review-question-text">

                        {item.question}

                      </div>

                      {item.image && (
                        <div className="review-question-image">

                          <img
                            src={
                              item.image
                            }
                            alt={`Question ${questionNumber}`}
                          />

                        </div>
                      )}

                      <div className="review-answers">

                        <div
                          className={`review-answer ${
                            userAnswer ===
                            correctAnswer
                              ? "answer-correct"
                              : userAnswer
                                ? "answer-wrong"
                                : ""
                          }`}
                        >

                          <span>
                            Your Answer
                          </span>

                          <strong>
                            {userAnswer ||
                              "Not Answered"}
                          </strong>

                        </div>

                        <div className="review-answer correct-answer">

                          <span>
                            Correct Answer
                          </span>

                          <strong>
                            {correctAnswer}
                          </strong>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default App;