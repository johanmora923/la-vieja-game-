// filepath: /home/johanmora923/la vieja/grandmother/src/App.jsx
import './App.css';
import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import Square from './components/square.jsx';
import { winners, TURNS } from './utils/constants.js';
import { getBestMove } from './components/IA.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [winner, setWinner] = useState(null);
  
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ? turnFromStorage : TURNS.x;
  });

  const [record,setRecord] = useState(() =>{
    const recordFromStorage = window.localStorage.getItem('record');
    return recordFromStorage ? recordFromStorage : 0;
  });

  const checkWinner = useCallback((boardToCheck) => {
    for (const line of winners) {
      const [a, b, c] = line;
      if (boardToCheck[a] && 
          boardToCheck[a] === boardToCheck[b] && 
          boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a];
      }
    }
    return null;
  }, []);

  const updateBoard = useCallback((index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);

    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
      if (newWinner === '×') {
        setRecord(record + 1);
        window.localStorage.setItem('record', record + 1);
      };
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }, [board, turn, winner, checkWinner]);

  useEffect(() => {
    if (turn === TURNS.o && !winner) {
      const bestMove = getBestMove(board);
      if (bestMove !== null) {
        setTimeout(() => {
          updateBoard(bestMove);
        }, 700);
      }
    }
  }, [turn, board, winner, updateBoard]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  return (
    <ErrorBoundary>
      <main className='board'>
        <h1>tic tac toe</h1>
        <button onClick={resetGame}>empezar de nuevo</button>
        <section className='game'>
          {board.map((value, index) => (
            <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          ))}
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.x}>
            {TURNS.x}
          </Square>
          <Square isSelected={turn === TURNS.o}>
            {TURNS.o}
          </Square>
        </section>
        <section className='record'>
          <h2>record</h2>
          <p>{record}</p>
        </section>
        {winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {winner === false ? 'empate' : 'gano:'}
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )}
      </main>
    </ErrorBoundary>
  );
}

export default App;