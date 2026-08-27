export default function TestHeader({ testNumber, questionNumber }) {
  return (
    <header className="test-header">
      <div className="header-left">
        <h1>TVDE TEST</h1>

        <span className="test-badge">
          Test {testNumber}
        </span>
      </div>

      <div className="header-right">
        Questão {questionNumber} / 90
      </div>
    </header>
  );
}