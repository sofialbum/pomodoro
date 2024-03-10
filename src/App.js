import React, { useState, useEffect, useCallback, useRef, useMemo} from "react";
let myInterval;


function App() {
  const durations = useMemo(() => [25, 5, 15], []);
  let currentIndex = useRef(0);

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedLength, setSelectedLength] = useState(durations[currentIndex.current]);

  const switchToNextSession = useCallback(() => {
    if (currentIndex.current < durations.length - 1) {
      currentIndex.current++;
    } else {
      currentIndex.current = 0;
    }

    const selectedDuration = durations[currentIndex.current];
    setSelectedLength(selectedDuration);

    switch (selectedDuration) {
      case 25:
        setMinutes(25);
        setSeconds(0);
        break;
      case 5:
        setMinutes(5);
        setSeconds(0);
        break;
      case 15:
        setMinutes(15);
        setSeconds(0);
        break;
      default:
        // Manejar cualquier otro caso si es necesario
        break;
    }
  }, [durations, currentIndex]);


  
  useEffect(() => {
    if (isActive) {
      myInterval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(myInterval);
          setIsActive(false);
          switchToNextSession(selectedLength);
        } else {
          if (seconds === 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);
    } else {
      clearInterval(myInterval);
    }

    return () => clearInterval(myInterval);
  }, [isActive, minutes, seconds, selectedLength, switchToNextSession]);

 

  


  const handleStartTimer = () => {
    setIsActive(true);
    
  };

  const handlePauseTimer = () => {
    setIsActive(false);
  };

  const handleRestartTimer = () => {
    setIsActive(false);
    setMinutes(25)
    setSeconds(0)
  }

  const handlePomodoro = () => {
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
  };

  const handleBreak = () => {
    setMinutes(5);
    setSeconds(0);
    setIsActive(false);
  };

  const handleLongBreak = () => {
    setMinutes(15);
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="App">
       <section>
        <menu>
          <h1>Pomodoro Timer</h1>
          <button onClick={handlePomodoro}>Pomodoro</button>
          <button onClick={handleBreak}>Break</button>
          <button onClick={handleLongBreak}>Long Break</button>
        </menu>
        <div>
          <p>
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </p>
        </div>
      </section>

      <div>
        <h6>Controllers</h6>
        <button onClick={handleStartTimer}>Start</button>
        <button onClick={handlePauseTimer}>Pause</button>
        <button onClick={handleRestartTimer}>Restart</button>
      </div>
    </div>
  );
}

export default App;
