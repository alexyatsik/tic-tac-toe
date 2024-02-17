import {useState} from "react";

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

export default function GameBoard ({ onSelectField, activePlayerSymbol }) {
	const [gameBoard, setGameBoard] = useState(initialGameBoard);

	function fieldClickHandler(rowIndex, colIndex) {
		setGameBoard((prevState) => {
			const updatedBoard = [...prevState.map(innerArray => [...innerArray])];
			updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
			return updatedBoard;
		});

		onSelectField();
	}

	return <ol id="game-board">
		{gameBoard.map((row, rowIndex) => (
			<li key={rowIndex}>
				<ol>
					{row.map((playerSymbol, colIndex) => (
						<li key={colIndex}>
							<button onClick={() => fieldClickHandler(rowIndex, colIndex)}>{playerSymbol}</button>
						</li>
					))}
				</ol>
			</li>
		))}
	</ol>
}