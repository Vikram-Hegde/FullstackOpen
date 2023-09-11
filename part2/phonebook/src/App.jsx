import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	])
	const [newName, setNewName] = useState('')
	const [newPhoneNumber, setNewPhoneNumber] = useState('')
	const [search, setSearch] = useState('')

	const filter = search
		? persons.filter((person) =>
				person.name.toLowerCase().includes(search.toLowerCase())
		  )
		: persons

	const handleSubmit = (e) => {
		e.preventDefault()
		const ifExists = persons
			.map((x) => x.name.toLowerCase())
			.indexOf(newName.toLowerCase())
		if (ifExists === -1)
			setPersons([
				...persons,
				{ id: crypto.randomUUID(), name: newName, number: newPhoneNumber },
			])
		else alert(`${newName} is already added to phonebook`)
		setNewName('')
		setNewPhoneNumber('')
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter
				searchVal={search}
				handleInput={(e) => setSearch(e.target.value)}
			/>
			<h2>Add a new</h2>
			<PersonForm
				handleSubmit={handleSubmit}
				setNewName={setNewName}
				setNewPhoneNumber={setNewPhoneNumber}
				newName={newName}
				newPhoneNumber={newPhoneNumber}
			/>
			<h2>Numbers</h2>
			<Persons data={filter} />
		</div>
	)
}

export default App
