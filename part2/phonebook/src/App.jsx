import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneBook from './phoneBook.js'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newPhoneNumber, setNewPhoneNumber] = useState('')
	const [search, setSearch] = useState('')

	useEffect(() => {
		;(async function () {
			setPersons(await phoneBook.getAll())
		})()
	}, [])

	const filter = search
		? persons.filter((person) =>
				person.name.toLowerCase().includes(search.trim().toLowerCase())
		  )
		: persons

	const handleSubmit = async (e) => {
		e.preventDefault()

		const newPerson = {
			name: newName.trim(),
			number: newPhoneNumber,
		}

		const personExists = persons.find((person) => person.name === newPerson.name)
		if (!personExists) {
			const response = await phoneBook.create(newPerson)
			setPersons([...persons, response])
		} else {
			if (
				window.confirm(
					`${newPerson.name} already exists, replace the old number with the new one?`
				)
			) {
				const changedNumber = { ...personExists, number: newPerson.number }
				const response = await phoneBook.update(personExists.id, changedNumber)
				setPersons(
					persons.map((person) =>
						person.id === personExists.id ? response : person
					)
				)
			}
		}

		setNewName('')
		setNewPhoneNumber('')
	}

	const handleDelete = async (id) => {
		const obj = persons.find((person) => person.id === id)
		if (window.confirm(`Delete ${obj.name}`)) {
			await phoneBook.deleteNumber(id)
			setPersons(await phoneBook.getAll())
		}
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
			<Persons data={filter} handleDelete={handleDelete} />
		</div>
	)
}

export default App
