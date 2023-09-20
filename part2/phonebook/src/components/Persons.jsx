const Persons = ({ data, handleDelete }) => {
	return (
		<ul>
			{data.map(({ id, name, number }) => (
				<li key={number}>
					{name} - {number}
					<button onClick={() => handleDelete(id)}>delete</button>
				</li>
			))}
		</ul>
	)
}

export default Persons
