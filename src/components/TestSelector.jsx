export default function TestSelector({ onSelectTest }) {
  return (
    <div className="selector-page">
      <div className="selector-box">

        <h1>TVDE TEST</h1>

        <p className="selector-subtitle">
          Select the test you want to take
        </p>

        <div className="test-options">

          <button
            className="test-option"
            onClick={() => onSelectTest(1)}
          >
            <span className="test-option-title">
              Test 1
            </span>

            <span className="test-option-questions">
              Questions 1 - 30
            </span>

            <span className="start-text">
              START TEST →
            </span>
          </button>


          <button
            className="test-option"
            onClick={() => onSelectTest(2)}
          >
            <span className="test-option-title">
              Test 2
            </span>

            <span className="test-option-questions">
              Questions 31 - 60
            </span>

            <span className="start-text">
              START TEST →
            </span>
          </button>


          <button
            className="test-option"
            onClick={() => onSelectTest(3)}
          >
            <span className="test-option-title">
              Test 3
            </span>

            <span className="test-option-questions">
              Questions 61 - 90
            </span>

            <span className="start-text">
              START TEST →
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}