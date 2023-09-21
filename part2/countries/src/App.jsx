import { useEffect, useState } from 'react'

const App = () => {
	const [country, setCountry] = useState('')
	const [data, setData] = useState(null)
	const [individualCountry, setIndividualCountry] = useState(null)

	const fetchIndividual = async (name) => {
		const response = await (
			await fetch(
				`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
			)
		).json()
		return response
	}

	const filtered =
		data?.filter((obj) =>
			obj.name.common.toLowerCase().includes(country.toLowerCase())
		) || []

	if (filtered.length === 1)
		fetchIndividual(filtered[0]?.name?.common).then(setIndividualCountry)

	useEffect(() => {
		const fetchData = async () => {
			const response = await (
				await fetch(`https://studies.cs.helsinki.fi/restcountries/api/all`)
			).json()
			setData(response)
		}
		fetchData()
	}, [])

	return (
		<>
			<span>find countries</span>
			<input
				type="text"
				value={country}
				onChange={(e) => setCountry(e.target.value)}
			/>
			{!country && <div>type to see results</div>}
			{filtered.length === 0 && country && (
				<div>Could not find anything similar</div>
			)}
			{filtered.length <= 10 &&
				filtered.length > 1 &&
				filtered.map((country) => (
					<div key={country.name.common}>{country.name.common}</div>
				))}

			{individualCountry && filtered.length === 1 && (
				<>
					<h2>{individualCountry.name.official}</h2>
					<div>capital {individualCountry.capital[0]}</div>
					<div>area {individualCountry.area}</div>
					<h4>Languages: </h4>
					<ul>
						{Object.keys(individualCountry.languages).map((lang) => (
							<li key={lang}>{individualCountry.languages[lang]}</li>
						))}
					</ul>
					<img
						src={individualCountry.flags.svg}
						alt={individualCountry.flags.alt}
						height="200px"
						width="200px"
					/>
				</>
			)}
		</>
	)
}
export default App
