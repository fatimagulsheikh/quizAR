import TestHeader from "./TestHeader";
import Question from "./Question";
import QuestionNumbers from "./QuestionNumbers";

export default function TestScreen({
  testNumber,
  currentTest,
  currentQuestion,
  question,
  selectedAnswers,
  onSelectAnswer,
  onQuestionChange,
  onPrevious,
  onNext,
  answerError,
}) {
  const globalQuestionNumber =
    (testNumber - 1) * 30 + currentQuestion + 1;

  return (
    <div className="test-container">

      {/* HEADER */}
      <TestHeader
        testNumber={testNumber}
        questionNumber={globalQuestionNumber}
      />

      {/* QUESTION */}
      <div className="question-wrapper">

        <Question
          question={question}
          questionNumber={globalQuestionNumber}
          selectedAnswer={
            selectedAnswers[globalQuestionNumber]
          }
          onSelectAnswer={onSelectAnswer}
        />

      </div>

      {/* NUMBER NAVIGATION */}
      <QuestionNumbers
        currentQuestion={currentQuestion}
        currentTest={currentTest}
        testNumber={testNumber}
        selectedAnswers={selectedAnswers}
        onQuestionChange={onQuestionChange}
        onPrevious={onPrevious}
        onNext={onNext}
        answerError={answerError}
      />

      {/* BOTTOM ARROWS */}
      <div className="bottom-navigation">

        <button
          className="bottom-arrow"
          onClick={onPrevious}
          disabled={currentQuestion === 0}
        >
          ◀
        </button>

        <div className="bottom-progress">
          {currentQuestion + 1} / 30
        </div>

        <button
          className="bottom-arrow"
          onClick={onNext}
        >
          ▶
        </button>

      </div>

    </div>
  );
}