import {useState} from "react";

export default function Player({ initialName, symbol }) {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	function buttonClickHandler() {
		setIsEditing(prevState => !prevState);
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
		<li>
			<span className="player">
				{playerNameElement}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={buttonClickHandler}>{buttonCaption}</button>
		</li>
	);
}