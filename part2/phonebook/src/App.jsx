import './style.css'
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneBook from './phoneBook.js'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newPhoneNumber, setNewPhoneNumber] = useState('')
	const [search, setSearch] = useState('')
	const [notification, setNotification] = useState(null)

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

	const displayNotification = (message, type) => {
		setNotification({ message, type })
		setTimeout(() => {
			setNotification(null)
		}, 5000)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (newName.trim() === '' || newPhoneNumber.trim() === '') return

		const newPerson = {
			name: newName.trim(),
			number: newPhoneNumber,
		}

		const personExists = persons.find(
			(person) => person.name === newPerson.name
		)
		if (!personExists) {
			const response = await phoneBook.create(newPerson)
			setPersons([...persons, response])
			displayNotification(`Added ${newPerson.name}`, 'success')
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
				displayNotification(`Modified ${newPerson.name}`, 'success')
			}
		}

		setNewName('')
		setNewPhoneNumber('')
	}

	const handleDelete = async (id) => {
		const obj = persons.find((person) => person.id === id)
		if (window.confirm(`Delete ${obj.name}`)) {
			try {
				await phoneBook.deleteNumber(id)
				setPersons(await phoneBook.getAll())
				displayNotification(`Deleted ${obj.name}`, 'danger')
			} catch (e) {
				displayNotification(
					`Note ${obj.name} was already removed from the server`,
					'danger'
				)
				console.error(e)
				setPersons(persons.filter((person) => person.name !== obj.name))
			}
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification data={notification} />
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
