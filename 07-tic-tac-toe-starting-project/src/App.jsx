import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./wining-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveActivePlayer(gameTurns){
let currentPlayer = 'X';
      if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
      }
      return currentPlayer;
}
function App() {
  const [ players, setPlayers] = useState({
    X: 'player 1',
    O: 'player 2',
  });
  const [gameTurns, setGameTurns] = useState([]);
  //const [hasWinner, setHasWinner] = useState(false);
  //const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = [...initialGameBoard.map((array) => [...array])];
    for (const turn of gameTurns){
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }
  let winner;  
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ){
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'x');
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square: {row: rowIndex, col: colIndex }, 
        player: activePlayer}, ...prevTurns
      ];
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }
  function handlePlayerNameChange (symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      };
    });
  }
  return (
    <main>
      <div id="game-container" className="highlight-player">
        <ol id="players">
          <Player initialName="Player 1" 
          symbol="X" 
          isActive={activePlayer === 'X'}
          onChangeName={handlePlayerNameChange}
          />
          <Player initialName="Player 2" 
          symbol="O" 
          isActive={activePlayer === 'O'}
          onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare}
        board = {gameBoard} 
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
