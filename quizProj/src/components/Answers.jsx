export default function Answers({ answers, selected, correct, onSelect }) {
  return (
    <ul id="answers">
      {answers.map((a) => {
        let className = '';

        if (selected) {
          if (a === selected) {
            className = a === correct ? 'correct' : 'wrong';
          }
          if (a !== selected && a !== correct) {
            className = 'faded';
          }
          if (a === correct && selected !== correct) {
            className = 'correct';
          }
        }

        return (
          <li key={a} className="answer">
            <button
              className={className}
              onClick={() => onSelect(a)}
              disabled={selected !== null}
            >
              {a}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
