export default function TestResult({
  testNumber,
  score,
  currentTest,
  selectedAnswers,
  onNextTest,
  onReview,
}) {
  const total = 30;

  const wrong = total - score;

  const percentage = Math.round(
    (score / total) * 100
  );

  // Test ke actual question numbers
  const startNumber = (testNumber - 1) * 30;

  return (
    <div className="result-page">

      {/* =========================
          RESULT SUMMARY
      ========================= */}

      <div className="result-card">

        <div className="result-icon">
          ✓
        </div>

        <h2>
          Test {testNumber} Complete
        </h2>

        <p className="result-subtitle">
          Your result for Test {testNumber}
        </p>

        <div className="result-score">
          {score}
          <span> / 30</span>
        </div>

        <div className="result-details">

          <div className="result-item">
            <span>Correct Answers</span>
            <strong>{score}</strong>
          </div>

          <div className="result-item">
            <span>Wrong Answers</span>
            <strong>{wrong}</strong>
          </div>

          <div className="result-item">
            <span>Percentage</span>
            <strong>{percentage}%</strong>
          </div>

        </div>

        <div className="result-buttons">

          <button
            className="review-button"
            onClick={onReview}
          >
            Review Test
          </button>

          <button
  className="next-test-button"
  onClick={onNextTest}
>
  Another Quiz →
</button>

        </div>

      </div>


      {/* =========================
          QUESTION REVIEW
      ========================= */}

      <div className="answers-review">

        <div className="answers-review-header">

          <h2>
            Question Review
          </h2>

          <p>
            Check which answers were correct and which were wrong.
          </p>

        </div>


        {currentTest.map((item, index) => {

          const questionNumber =
            startNumber + index + 1;

          const userAnswer =
            selectedAnswers[questionNumber];

          const correctAnswer =
            item.answer;

          const isCorrect =
            userAnswer === correctAnswer;

          return (
            <div
              className={`review-question ${
                isCorrect
                  ? "review-correct"
                  : "review-wrong"
              }`}
              key={questionNumber}
            >

              {/* QUESTION HEADER */}

              <div className="review-question-header">

                <div className="review-question-number">
                  Question {questionNumber}
                </div>

                <div
                  className={`review-status ${
                    isCorrect
                      ? "status-correct"
                      : "status-wrong"
                  }`}
                >
                  {isCorrect ? "✓ Correct" : "✕ Wrong"}
                </div>

              </div>


              {/* QUESTION TEXT */}

              <div className="review-question-text">

                {item.question}

              </div>


              {/* IMAGE IF AVAILABLE */}

              {item.image && (
                <div className="review-question-image">

                  <img
                    src={item.image}
                    alt={`Question ${questionNumber}`}
                  />

                </div>
              )}


              {/* ANSWERS */}

              <div className="review-answers">

                <div
                  className={`review-answer ${
                    userAnswer === correctAnswer
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
                    {userAnswer || "Not Answered"}
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
        })}

      </div>

    </div>
  );
}