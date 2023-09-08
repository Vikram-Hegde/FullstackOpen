const Header = ({ course }) => {
	return <h1>{course}</h1>
}

const Part = ({ part, exercise }) => {
	return (
		<p>
			{part} {exercise}
		</p>
	)
}

const Content = ({
	content: { part1, exercises1, part2, exercises2, part3, exercises3 },
}) => {
	return (
		<>
			<Part part={part1} exercise={exercises1} />
			<Part part={part2} exercise={exercises2} />
			<Part part={part3} exercise={exercises3} />
		</>
	)
}

const Total = ({ content: { exercises1, exercises2, exercises3 } }) => {
	return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
}
const App = () => {
	const course = 'Half Stack application development'
	const partsNExercise = {
		part1: 'Fundamentals of React',
		exercises1: 10,
		part2: 'Using props to pass data',
		exercises2: 7,
		part3: 'State of a component',
		exercises3: 14,
	}

	return (
		<>
			<Header course={course} />
			<Content content={partsNExercise} />
			<Total content={partsNExercise} />
		</>
	)
}

export default App
