import "./App.css";
import { useState, useEffect } from "react";

let myInterval;

function App() {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [selectedLength, setSelectedLength] = useState(true); // Estado de trabajo o descanso
  const [isActive, setIsActive] = useState(false); // Estado del temporizador: activo o detenido


  // const decrementSeconds = () => {
  //   setSeconds(seconds - 1)
//   if(seconds === 0){
  //     setMinutes(minutes - 1)
  //   }
  // }

  const decrementSeconds = () => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 0) {
        setMinutes((prevMinutes) => {
          if (prevMinutes === 0) {
            // Aquí podrías manejar el final del temporizador si es necesario
            return 0; // Por ejemplo, detener el temporizador
          }
          return prevMinutes - 1; // Reducir los minutos
        });
        return 59; // Reiniciar los segundos a 59
      } else {
        return prevSeconds - 1; // Reducir los segundos
      }
    });
  };
  
  const handleStartTimer = () => {
      if (!isActive) {
        myInterval = setInterval(decrementSeconds, 1000);
        console.log(myInterval)
        setIsActive(true);
      }

  };

  
  const handlePauseTimer = () => {
    console.log(myInterval)
    if (isActive) {
      clearInterval(myInterval);
      setIsActive(false);
    }
  };

  const handlePomodoro = () => {
    setMinutes(25);
    setSeconds(0);
  };

  const handleBreak = () => {
    setMinutes(5);
    setSeconds(0);
  };

  const handleLongBreak = () => {
    setMinutes(15);
    setSeconds(0);
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
        <h6>Controles</h6>
        <button onClick={handleStartTimer}>Start</button>
        <button onClick={handlePauseTimer}>Pause</button>
        <button>Restart</button>
      </div>
    </div>
  );
}

export default App;
