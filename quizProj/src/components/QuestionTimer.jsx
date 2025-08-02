import { useEffect, useState } from 'react';

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remaining, setRemaining] = useState(timeout);

  useEffect(() => {
    if (mode === 'answered') return;

    const interval = setInterval(() => {
      setRemaining(prev => prev - 100);
    }, 100);

    return () => clearInterval(interval);
  }, [mode]);

  useEffect(() => {
    if (remaining <= 0) {
      onTimeout();
    }
  }, [remaining, onTimeout]);

  return (
    <progress
      max={timeout}
      value={remaining}
      className={mode === 'answered' ? 'answered' : ''}
    />
  );
}
