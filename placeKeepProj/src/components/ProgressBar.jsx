import { useEffect, useRef, useState } from 'react';

export default function ProgressBar({ timer, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timer);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (remainingTime <= 0) {
      clearInterval(intervalRef.current);
      onTimeout(); // trigger delete when time runs out
    }
  }, [remainingTime, onTimeout]);

  return (
    <progress value={remainingTime} max={timer} />
  );
}
