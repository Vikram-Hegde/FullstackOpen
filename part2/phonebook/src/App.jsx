import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newPhoneNumber, setNewPhoneNumber] = useState('')
	const [search, setSearch] = useState('')

	useEffect(() => {
		fetch('http://localhost:3000/persons')
			.then((res) => res.json())
			.then(setPersons)
	}, [])

	const filter = search
		? persons.filter((person) =>
				person.name.toLowerCase().includes(search.toLowerCase())
		  )
		: persons

	const handleSubmit = async (e) => {
		e.preventDefault()
		const newPerson = {
			name: newName,
			number: newPhoneNumber,
		}
		const ifExists = persons
			.map((x) => x.name.toLowerCase())
			.indexOf(newName.toLowerCase())
		if (ifExists === -1) {
			const response = await fetch('http://localhost:3000/persons', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newPerson),
			})
			setPersons([...persons, await response.json()])
		} else alert(`${newName} is already added to phonebook`)
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