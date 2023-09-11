const Persons = ({ data }) => {
	return (
		<ul>
			{data.map(({ id, name, number }) => (
				<li key={id}>
					{name} - {number}
				</li>
			))}
		</ul>
	)
}

export default Persons
