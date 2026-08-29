import React, { useState, useEffect } from 'react';
import { formatTime } from '../utils/date';

export default function Timer({ initialSeconds = 0, isRunning = true, onTick = () => {} }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds(s => s + 1);
      onTick();
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTick]);

  return (
    <div className="text-3xl font-mono font-bold text-primary tracking-wider">
      {formatTime(seconds)}
    </div>
  );
}
