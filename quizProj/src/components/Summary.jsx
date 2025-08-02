import QUESTIONS from '../questions.js';

export default function Summary({ userAnswers }) {
  const skipped = userAnswers.filter(a => a === null).length;
  const correct = userAnswers.filter((a, i) => a === QUESTIONS[i].answers[0]).length;
  const wrong = QUESTIONS.length - skipped - correct;

  return (
    <section id="summary">
      <img src="/trophy.png" alt="Trophy" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p><span className="number">{Math.round((skipped / QUESTIONS.length) * 100)}%</span><span className="text">Skipped</span></p>
        <p><span className="number">{Math.round((correct / QUESTIONS.length) * 100)}%</span><span className="text">Correct</span></p>
        <p><span className="number">{Math.round((wrong / QUESTIONS.length) * 100)}%</span><span className="text">Incorrect</span></p>
      </div>
      <ol>
        {QUESTIONS.map((q, i) => {
          const userAnswer = userAnswers[i];
          const className = userAnswer === null
            ? 'skipped'
            : userAnswer === q.answers[0]
            ? 'correct'
            : 'wrong';
          return (
            <li key={q.id}>
              <h3>{i + 1}</h3>
              <p className="question">{q.text}</p>
              <p className={`user-answer ${className}`}>
                {userAnswer ?? 'Skipped'}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
