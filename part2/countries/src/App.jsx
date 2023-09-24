import { useEffect, useState } from 'react'

const App = () => {
	const [input, setInput] = useState('')
	const [data, setData] = useState(null)

	const filtered = data?.filter((country) =>
		country.name.official.toLowerCase().includes(input.trim().toLowerCase())
	)

	// Conditionals
	const results = filtered?.length
	const notFound = !results && input
	const manyResults = input && results > 10
	const filteredCountry = results === 1 && filtered[0]
	const displayableResults = results >= 2 && results <= 10

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
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			{!input && <div>type to see results</div>}
			{notFound && <div>Could not find anything similar</div>}
			{manyResults && <div>Too many matches, try a different filter</div>}
			{displayableResults &&
				filtered.map((country) => (
					<section key={country.name.official}>
						<div>{country.name.common}</div>
						<button onClick={() => setInput(country.name.official)}>
							show
						</button>
					</section>
				))}
			{filteredCountry && (
				<>
					<h2>{filteredCountry.name.official}</h2>
					<div>capital {filteredCountry.capital[0]}</div>
					<div>area {filteredCountry.area}</div>
					<h4>Languages: </h4>
					<ul>
						{Object.keys(filteredCountry.languages).map((lang) => (
							<li key={lang}>{filteredCountry.languages[lang]}</li>
						))}
					</ul>
					<img
						src={filteredCountry.flags.svg}
						alt={filteredCountry.flags.alt}
						height="200px"
						width="auto"
					/>
				</>
			)}
		</>
	)
}

export default App
