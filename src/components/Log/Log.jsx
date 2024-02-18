export default function Log({ logs }) {
	return <ol id="log">
		{logs.map( (log, index) => {
			const isHighlighted = index === 0 ? 'highlighted' : undefined;
			const coordinate = `${log.square.row}, ${log.square.column}`;
			return <li
				className={isHighlighted}
				key={coordinate}
			>{log.player} selected {coordinate}</li>
		})};
	</ol>
}