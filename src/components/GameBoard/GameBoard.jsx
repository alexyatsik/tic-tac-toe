const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

export default function GameBoard ({ onSelectField, turns }) {
	let gameBoard = initialGameBoard;

	for (const turn of turns) {
		const { square, player } = turn;
		const { row, column } = square;

		gameBoard[row][column] = player;
	}

	return <ol id="game-board">
		{gameBoard.map((row, rowIndex) => (
			<li key={rowIndex}>
				<ol>
					{row.map((playerSymbol, colIndex) => (
						<li key={colIndex}>
							<button onClick={() => onSelectField(rowIndex, colIndex)} disabled={playerSymbol !== null}>
								{playerSymbol}
							</button>
						</li>
					))}
				</ol>
			</li>
		))}
	</ol>
}