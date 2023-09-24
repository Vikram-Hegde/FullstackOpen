import { useEffect, useState } from 'react'

const App = () => {
	const [input, setInput] = useState('')
	const [data, setData] = useState(null)
	const [weatherData, setWeaterData] = useState(null)
	const [selectedCountry, setSelectedCountry] = useState(null)

	const filtered = data?.filter((country) =>
		country.name.official.toLowerCase().includes(input.trim().toLowerCase())
	)

	useEffect(() => {
		const fetchData = async () => {
			const response = await (
				await fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
			).json()
			setData(response)
		}
		fetchData()
	}, [])

	useEffect(() => {
		if (filtered && filtered.length === 1) {
			const country = filtered[0]
			setSelectedCountry(country)
		} else setSelectedCountry(null)
	}, [filtered])

	useEffect(() => {
		if (selectedCountry) {
			fetchWeatherData(selectedCountry.latlng)
		}
	}, [selectedCountry])

	const fetchWeatherData = async (coord) => {
		let weather = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${
				coord[1]
			}&appid=${import.meta.env.VITE_OPENAPI_KEY}&units=metric`
		)
		let response = await weather.json()
		setWeaterData(response)
	}

	const showResultsMessage = () => {
		if (!input) return 'Type to see results'
		if (!filtered.length) return 'Could not find anything similar'
		if (filtered.length > 10) return 'Too many matches, try a different filter'
		return null
	}

	console.log(weatherData)

	const displayResults = () => {
		if (filtered?.length > 10) return null

		if (selectedCountry) {
			console.log('how many times did you run')
			return (
				<>
					<h2>{selectedCountry.name.official}</h2>
					<div>Capital: {selectedCountry.capital[0]}</div>
					<div>Area: {selectedCountry.area}</div>
					<h4>Languages: </h4>
					<ul>
						{Object.keys(selectedCountry.languages).map((lang) => (
							<li key={lang}>{selectedCountry.languages[lang]}</li>
						))}
					</ul>
					<img
						src={selectedCountry.flags.svg}
						alt={selectedCountry.flags.alt}
						height="200px"
						width="auto"
					/>
					{weatherData && (
						<>
							<h3>Weather in {weatherData.name}</h3>
							<div>temperature {weatherData.main.temp} Celcius</div>
							<img
								src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
								alt={weatherData.weather[0].description}
							/>
							<div>wind {weatherData.wind.speed} m/s</div>
						</>
					)}
				</>
			)
		}

		return filtered?.map((country) => (
			<section key={country.name.official}>
				<div>{country.name.official}</div>
				<button onClick={() => setInput(country.name.official)}>show</button>
			</section>
		))
	}

	return (
		<>
			<span>Find countries</span>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			{<div>{showResultsMessage()}</div>}
			{displayResults()}
		</>
	)
}

export default App
