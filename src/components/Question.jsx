export default function Question({
  question,
  questionNumber,
  selectedAnswer,
  onSelectAnswer,
}) {
  return (
    <div className="question-card">

      {/* QUESTION TITLE */}
      <div className="question-title">
        <div className="question-number-title">
          Q{questionNumber}.
        </div>

        <h2>{question.question}</h2>

        <div className="bookmark">
          🔖
        </div>
      </div>

      {/* QUESTION IMAGE */}
      {question.image && (
        <div className="question-image">
          <img
            src={question.image}
            alt={`Question ${questionNumber}`}
          />
        </div>
      )}

      {/* OPTIONS */}
      <div className="options">

        {question.options.map((option, index) => {

          const letter = String.fromCharCode(65 + index);

          const isSelected =
            selectedAnswer === option;

          return (
            <button
              key={index}
              type="button"
              className={`option-row ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => onSelectAnswer(option)}
            >

              <span className="option-letter">
                {letter}
              </span>

              <span className="option-text">
                {option}
              </span>

              <span className="option-checkbox">
                {isSelected && "✓"}
              </span>

            </button>
          );
        })}

      </div>

    </div>
  );
}