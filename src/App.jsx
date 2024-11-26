import React, { useState, useRef } from "react";
import "./index.css";
export default function App() {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const jamiSekund = () => {
    return (
      parseInt(hours || 0) * 3600 +
      parseInt(minutes || 0) * 60 +
      parseInt(seconds || 0)
    );
  };

  const vaqtTaxsim = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    setHours(hrs.toString().padStart(2, "0"));
    setMinutes(mins.toString().padStart(2, "0"));
    setSeconds(secs.toString().padStart(2, "0"));
  };

  const startTimer = () => {
    if (isRunning) return;

    let totalSeconds = jamiSekund();
    if (totalSeconds > 0) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        totalSeconds -= 1;
        vaqtTaxsim(totalSeconds);
        if (totalSeconds <= 0) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
        }
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setHours("00");
    setMinutes("00");
    setSeconds("00");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="timer-container p-10 bg-white rounded-lg shadow-lg">
        <div className="time-inputs flex  gap-5 items-center text-xl font-mono">
          <input
            type="text"
            value={hours}
            onChange={(e) =>
              setHours(e.target.value.slice(0, 2).replace(/[^0-9]/g, ""))
            }
            maxLength="2"
            className="w-16 h-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span>:</span>
          <input
            type="text"
            value={minutes}
            onChange={(e) =>
              setMinutes(e.target.value.slice(0, 2).replace(/[^0-9]/g, ""))
            }
            maxLength="2"
            className="w-16 h-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span>:</span>
          <input
            type="text"
            value={seconds}
            onChange={(e) =>
              setSeconds(e.target.value.slice(0, 2).replace(/[^0-9]/g, ""))
            }
            maxLength="2"
            className="w-16 h-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="buttons flex space-x-4 mt-6">
          <button
            onClick={startTimer}
            disabled={isRunning}
            className={`px-6 py-2 rounded-md font-semibold ${
              isRunning
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            Start
          </button>
          <button
            onClick={stopTimer}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold"
          >
            Stop
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-semibold"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
