import { useEffect, useState } from 'react';
import Answers from './Answers.jsx';
import QuestionTimer from './QuestionTimer.jsx';


function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Question({ index, question, onSelectAnswer, timeout }) {
  const [shuffledAnswers, setShuffledAnswers] = useState(() =>
    shuffle(question.answers)
  );
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    setShuffledAnswers(shuffle(question.answers));
  }, [question]);

  function handleSelect(answer) {
    setAnswer(answer);
    setTimeout(() => {
      onSelectAnswer(answer);
    }, 1200);
  }

  function handleTimeout() {
    onSelectAnswer(null); // skipped
  }

  return (
    <div id="question">
      <header>
        <QuestionTimer
          key={index}
          timeout={timeout}
          onTimeout={handleTimeout}
          mode={answer ? 'answered' : 'active'}
        />
        <h2>{question.text}</h2>
      </header>
      <Answers
        answers={shuffledAnswers}
        selected={answer}
        correct={question.answers[0]} // assumes first = correct
        onSelect={handleSelect}
      />
    </div>
  );
}
