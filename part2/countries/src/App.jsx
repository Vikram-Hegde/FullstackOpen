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
		data?.filter(
			(obj) =>
				obj.name.official.toLowerCase().startsWith(country.toLowerCase()) ||
				obj.name.common.toLowerCase().startsWith(country.toLowerCase())
		) || []

	const handleInput = (e) => {
		setCountry(e.target.value)
		if (filtered.length === 1)
			fetchIndividual(e.target.value).then(setIndividualCountry)
	}

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
			<input type="text" value={country} onChange={handleInput} />
			{!country && <div>type to see results</div>}
			{filtered.length === 0 && country && (
				<div>Could not find anything similar</div>
			)}
			{filtered.length <= 10 &&
				filtered.length > 1 &&
				filtered.map((country) => (
					<>
						<div key={country?.name?.official}>{country.name.common}</div>
						<button
							onClick={() => {
								fetchIndividual(country.name.official).then(
									setIndividualCountry
								)
								setCountry(country.name.official)
							}}
						>
							show
						</button>
					</>
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
						width="auto"
					/>
				</>
			)}
		</>
	)
}
export default App
