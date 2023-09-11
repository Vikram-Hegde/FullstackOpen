
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

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((item) => (
				<Part key={item.name} part={item.name} exercise={item.exercises} />
			))}
		</>
	)
}

const Total = ({ parts }) => {
	return (
		<b>
			Total of {parts.reduce((acc, exercise) => acc + exercise.exercises, 0)}{' '}
			exercises
		</b>
	)
}

const Course = ({ courses }) => {
	return courses.map((course) => (
		<section key={course.id}>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</section>
	))
}

const App = () => {
	const courses = [
		{
			name: 'Half Stack application development',
			id: 1,
			parts: [
				{
					name: 'Fundamentals of React',
					exercises: 10,
					id: 1,
				},
				{
					name: 'Using props to pass data',
					exercises: 7,
					id: 2,
				},
				{
					name: 'State of a component',
					exercises: 14,
					id: 3,
				},
				{
					name: 'Redux',
					exercises: 11,
					id: 4,
				},
			],
		},
		{
			name: 'Node.js',
			id: 2,
			parts: [
				{
					name: 'Routing',
					exercises: 3,
					id: 1,
				},
				{
					name: 'Middlewares',
					exercises: 7,
					id: 2,
				},
			],
		},
	]
	return <Course courses={courses} />
}

export default App
