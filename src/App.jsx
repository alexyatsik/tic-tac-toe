import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log/Log.jsx";

function App() {
	const [gameTurns, setGameTurns] = useState([]);
	const [activePlayer, setActivePlayer] = useState('X');

	function fieldSelectHandler(row, column) {
		setActivePlayer(currentPLayer => currentPLayer === 'X' ? 'O' : 'X' );
		setGameTurns(prevState => {
			let currentPlayer = 'X';

			if (prevState.length > 0 && prevState[0].player === 'X')
				currentPlayer = 'O';

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
			<Log />
		</main>
	);
}

export default App;
