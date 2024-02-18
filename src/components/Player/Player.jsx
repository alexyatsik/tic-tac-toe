import {useState} from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	function buttonClickHandler() {
		setIsEditing(prevState => !prevState);

		if (isEditing)
			onChangeName(symbol, playerName);
	}

	function inputChangeHandler(event) {
		setPlayerName(event.target.value);
	}

	let playerNameElement = <span className="player-name">{playerName}</span>;
	let buttonCaption = 'Edit';
	if (isEditing) {
		playerNameElement = <input type="text" required value={playerName} onChange={inputChangeHandler}/>;
		buttonCaption = 'Save';
	}

	return (
		<li className={isActive ? 'active' : undefined}>
			<span className="player">
				{playerNameElement}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={buttonClickHandler}>{buttonCaption}</button>
		</li>
	);
}