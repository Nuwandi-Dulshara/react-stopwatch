import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false); //A boolean state that determines if the stopwatch is currently running.
  const [elapsedTime, setElapsedTime] = useState(0); // A state that keeps track of the elapsed time in milliseconds.
  const intervalIdRef = useRef(null); //store the interval ID returned by setInterval
  const startTimeRef = useRef(0); //stores the start time of the stopwatch

  useEffect(() => {
    if (isRunning) { //hook monitors the isRunning state. When isRunning becomes true, it starts an interval that updates
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);//isRunning is false, the interval is cleared using clearInterval.
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime(elapsedTime) {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="stopwatch">
      <div className="show">{formatTime(elapsedTime)}</div>
      <div className="controls">
        <button onClick={start} className="start-btn">
          Start
        </button>
        <button onClick={stop} className="stop-btn">
          Stop
        </button>
        <button onClick={reset} className="reset-btn">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
