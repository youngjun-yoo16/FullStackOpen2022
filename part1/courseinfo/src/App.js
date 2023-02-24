const Header = ({ course }) => {
	return (
		<div>
			<h2>{course}</h2>
		</div>
	)
}

const Part = ({ part }) => {
	return (
		<div>
			<p>
				{part.name} {part.exercises}
			</p>
		</div>
	)
}

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map(part =>
				<Part key={part.id} part={part} />
			)}
		</div>
	)
}

const Total = ({ parts }) => {
	return (
		<div>
			<p>
			   <b>
				   total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
			   </b>
			</p>
		</div>
	)
}

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
	<div>
	   <h1>Web development curriculum</h1>
	   <Course course={course} />   
	</div> 
  )
}
				
export default App