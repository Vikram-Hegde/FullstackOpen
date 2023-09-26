const Persons = ({ data, handleDelete }) => {
	return (
		<ul>
			{data.map(({ id, name, number }) => (
				<li key={id}>
					{name} - {number}
					<button onClick={() => handleDelete(id)}>delete</button>
				</li>
			))}
		</ul>
	)
}

export default Persons
