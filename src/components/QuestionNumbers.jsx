export default function QuestionNumbers({
  currentQuestion,
  currentTest,
  testNumber,
  selectedAnswers,
  onQuestionChange,
  onPrevious,
  onNext,
}) {
  return (
    <div className="question-navigation">

      {/* LEFT ARROW */}
      <button
        className="nav-arrow"
        onClick={onPrevious}
        disabled={currentQuestion === 0}
      >
        ◀
      </button>

      {/* NUMBERS */}
      <div className="question-numbers-list">

        {currentTest.map((_, index) => {

          const globalNumber =
            (testNumber - 1) * 30 + index + 1;

          const isActive =
            currentQuestion === index;

          const isAnswered =
            selectedAnswers[globalNumber] !== undefined;

          return (
            <button
              key={globalNumber}
              className={`
                number-button
                ${isActive ? "active" : ""}
                ${isAnswered ? "answered" : ""}
              `}
              onClick={() => onQuestionChange(index)}
            >
              {globalNumber}
            </button>
          );
        })}

      </div>

      {/* RIGHT ARROW */}
      <button
        className="nav-arrow"
        onClick={onNext}
      >
        ▶
      </button>

    </div>
  );
}