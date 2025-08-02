import { useState, useCallback } from 'react';
import QUESTIONS from "./questions.js";
import Question from './components/Question.jsx';
import Summary from './components/Summary.jsx';

export default function App() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeIndex = userAnswers.length;

  const quizIsComplete = activeIndex === QUESTIONS.length;

  const handleAnswer = useCallback(function handleAnswer(answer) {
    setUserAnswers(prev => [...prev, answer]);
  }, []);

  return (
    <>
      <header>
        <img src="/quiz-logo.png" alt="Quiz logo" />
        <h1>ReactQuiz</h1>
      </header>

      <main id="quiz">
        {!quizIsComplete && (
          <Question
            key={activeIndex}
            index={activeIndex}
            question={QUESTIONS[activeIndex]}
            onSelectAnswer={handleAnswer}
            timeout={10000}
          />
        )}
        {quizIsComplete && <Summary userAnswers={userAnswers} />}
      </main>
    </>
  );
}
