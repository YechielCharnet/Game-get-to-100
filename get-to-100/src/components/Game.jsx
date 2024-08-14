import { useState } from "react";

function Game(props) {
  const initialPlayers = ["yosi", "moti", "Yechiel", "eliyahu"];
  const [players, setPlayers] = useState(initialPlayers);
  const [values, setValues] = useState(
    initialPlayers.map(() => Math.floor(Math.random() * 99 + 1))
  );
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [steps, setSteps] = useState(Array(initialPlayers.length).fill(0));
  const [winner, setWinner] = useState(null);

  const handleChange = (index, operation) => {
    const newValues = [...values];
    const newSteps = [...steps];

    switch (operation) {
      case "plus":
        newValues[index] += 1;
        newSteps[index] += 1;
        break;
      case "minus":
        newValues[index] -= 1;
        newSteps[index] += 1;
        break;
      case "multi":
        newValues[index] *= 2;
        newSteps[index] += 1;
        break;
      case "split":
        newValues[index] = Math.floor(newValues[index] / 2);
        newSteps[index] += 1;
        break;
      default:
        break;
    }

    setValues(newValues);
    setSteps(newSteps);

    // נבדוק אם יש מנצח
    const winningPlayerIndex = newValues.findIndex((value) => value === 100);
    if (winningPlayerIndex !== -1) {
      setWinner({
        player: players[winningPlayerIndex],
        steps: newSteps[winningPlayerIndex],
      });
      setTimeout(() => {
        newValues[winningPlayerIndex] = Math.floor(Math.random() * 99 + 1);
        newSteps[winningPlayerIndex] = 0;
        setValues(newValues);
        setSteps(newSteps);
      }, 500);
    } else {
      setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % players.length);
    }
  };

  const Quit = () => {
    const indexToRemove = currentPlayer;

    const newPlayers = players.filter((_, i) => i !== indexToRemove);
    const newValues = values.filter((_, i) => i !== indexToRemove);
    const newSteps = steps.filter((_, i) => i !== indexToRemove);

    setPlayers(newPlayers);
    setValues(newValues);
    setSteps(newSteps);

    if (newPlayers.length > 0) {
      setCurrentPlayer((prevPlayer) => prevPlayer % newPlayers.length);
    }
  };

  return (
    <div className="board">
      {winner && (
        <div className="winner-alert">
          {winner.player} is the winner! by {winner.steps} steps, You received
          an additional turn bonus
        </div>
      )}
      {players.map((player, index) => (
        <div key={index} className="player">
          <textarea id="textarea" type="text" value={values[index]} readOnly />
          {`Welcome ${player} - Steps: ${steps[index]}`}
          <div id="buttons">
            <button
              onClick={() => handleChange(index, "plus")}
              disabled={index !== currentPlayer}
            >
              plus
            </button>
            <button
              onClick={() => handleChange(index, "minus")}
              disabled={index !== currentPlayer}
            >
              minus
            </button>
            <button
              onClick={() => handleChange(index, "multi")}
              disabled={index !== currentPlayer}
            >
              multi
            </button>
            <button
              onClick={() => handleChange(index, "split")}
              disabled={index !== currentPlayer}
            >
              split
            </button>
            <button onClick={Quit} id="Quit">Quit</button>
          </div>
          {/* <button onClick={() => <Game/>}>start</button> */}
        </div>
      ))}
    </div>
  );
}

export default Game;
