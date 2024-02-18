import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log/Log.jsx";

function deriveActivePlayer(gameTurns) {
	let currentPlayer = 'X';

	if (gameTurns.length > 0 && gameTurns[0].player === 'X')
		currentPlayer = 'O';

	return currentPlayer;
}

function App() {
	const [gameTurns, setGameTurns] = useState([]);
	const activePlayer = deriveActivePlayer(gameTurns);

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

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
					<Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
				</ol>
 				<GameBoard
					turns={gameTurns}
					onSelectField={fieldSelectHandler}
				/>
			</div>
			<Log logs={gameTurns} />
		</main>
	);
}

export default App;
