import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver/GameOver.jsx";

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

function deriveActivePlayer(gameTurns) {
	let currentPlayer = 'X';

	if (gameTurns.length > 0 && gameTurns[0].player === 'X')
		currentPlayer = 'O';

	return currentPlayer;
}

function App() {
	const [players, setPlayers] = useState({
		'X': 'Player 1',
		'O': 'Player 2'
	});
	const [gameTurns, setGameTurns] = useState([]);
	const activePlayer = deriveActivePlayer(gameTurns);

	let gameBoard = [...initialGameBoard.map(array=>[...array])];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, column } = square;

		gameBoard[row][column] = player;
	}

	let winner = null;
	for(const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

		if (firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol)
			winner = players[firstSquareSymbol];
	}

	const hasDraw = gameTurns.length === 9 && !winner;

	function fieldSelectHandler(row, column) {
		setGameTurns(prevState => {
			const currentPlayer = deriveActivePlayer(prevState);

			const updatedTurns = [
				{
					square: {row, column},
					player: currentPlayer
				},
				...prevState
			];

			return updatedTurns;
		});
	}

	function restartHandler() {
		setGameTurns([]);
	}

	function playerNameChangeHandler(symbol, newName) {
		setPlayers(prevPlayers => {
			return {
				...prevPlayers,
				[symbol]: newName
			}
		});
	}

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName="Player 1"
						symbol="X"
						isActive={activePlayer === 'X'}
						onChangeName={playerNameChangeHandler}
					/>
					<Player
						initialName="Player 2"
						symbol="O"
						isActive={activePlayer === 'O'}
						onChangeName={playerNameChangeHandler}
					/>
				</ol>
				{(winner || hasDraw) && <GameOver winner={winner} onRestart={restartHandler} />}
 				<GameBoard
					turns={gameTurns}
					onSelectField={fieldSelectHandler}
					board={gameBoard}
				/>
			</div>
			<Log logs={gameTurns} />
		</main>
	);
}

export default App;
