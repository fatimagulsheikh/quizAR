export default function TestResult({
  testNumber,
  score,
  onNextTest,
  onReview,
}) {
  const total = 30;

  const wrong = total - score;

  const percentage = Math.round(
    (score / total) * 100
  );

  return (
    <div className="result-card">

      {/* RESULT ICON */}
      <div className="result-icon">
        ✓
      </div>


      {/* TITLE */}
      <h2>
        Test {testNumber} Complete
      </h2>


      {/* SUBTITLE */}
      <p className="result-subtitle">
        Your result for Test {testNumber}
      </p>


      {/* SCORE */}
      <div className="result-score">
        {score}
        <span> / 30</span>
      </div>


      {/* RESULT DETAILS */}
      <div className="result-details">

        {/* CORRECT */}
        <div className="result-item">

          <span>
            Correct Answers
          </span>

          <strong>
            {score}
          </strong>

        </div>


        {/* WRONG */}
        <div className="result-item">

          <span>
            Wrong Answers
          </span>

          <strong>
            {wrong}
          </strong>

        </div>


        {/* PERCENTAGE */}
        <div className="result-item">

          <span>
            Percentage
          </span>

          <strong>
            {percentage}%
          </strong>

        </div>

      </div>


      {/* BUTTONS */}
      <div className="result-buttons">

        {/* REVIEW TEST */}
        <button
          className="review-button"
          onClick={onReview}
        >
          Review Test
        </button>


        {/* CHOOSE ANOTHER TEST */}
        <button
          className="next-test-button"
          onClick={onNextTest}
        >
          Choose Another Test

          <span>
            →
          </span>

        </button>

      </div>

    </div>
  );
}