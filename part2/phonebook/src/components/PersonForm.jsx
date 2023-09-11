const PersonForm = ({
	handleSubmit,
	newName,
	newPhoneNumber,
	setNewName,
	setNewPhoneNumber,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				name:{' '}
				<input
					placeholder="enter name"
					value={newName}
					onChange={(e) => setNewName(e.target.value)}
				/>
				<br />
				number:{' '}
				<input
					placeholder="enter phone number"
					value={newPhoneNumber}
					onChange={(e) => setNewPhoneNumber(e.target.value)}
				/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

export default PersonForm