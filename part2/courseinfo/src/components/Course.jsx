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

export default Course
