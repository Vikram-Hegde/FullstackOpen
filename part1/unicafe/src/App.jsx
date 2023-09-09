import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({ good, neutral, bad }) => {
	// derived states
	const all = good + neutral + bad
	const average = (good - bad) / all
	const positive = (good / all) * 100

	return (
		<>
			<h1>statistics</h1>
			{good || neutral || bad ? (
				<table>
					<tbody>
						<StatisticLine text="good" value={good} />
						<StatisticLine text="neutral" value={neutral} />
						<StatisticLine text="bad" value={bad} />
						<StatisticLine text="all" value={all} />
						<StatisticLine text="average" value={average} />
						<StatisticLine text="positive" value={positive} />
					</tbody>
				</table>
			) : (
				<p>No feedback given</p>
			)}
		</>
	)
}

const Button = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<h1>give feedback</h1>
			<Button handleClick={() => setGood(good + 1)} text="good" />
			<Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Button handleClick={() => setBad(bad + 1)} text="bad" />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

export default App
