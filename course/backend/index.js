const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	const note = notes.find(note => note.id === id)
	if (note) {
		response.json(note)
	} else {
		response.status(404).end()
	}
})

app.delete('api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	notes = notes.filter(note => note.id !== id)
	
	response.status(204).end()
})

const generateId = () => {
	const maxId = notes.length > 0
		/* notes.map(n => n.id) creates a new array that contains all the ids of the notes. 
		Math.max returns the maximum value of the numbers that are passed to it. However, 
		notes.map(n => n.id) is an array so it can't directly be given as a parameter to Math.max. 
		The array can be transformed into individual numbers by using the "three dot" spread syntax */
		? Math.max(...notes.map(note => note.id))
		: 0
	return maxId + 1
}
app.post('/api/notes', (request, response) => {
	const body = request.body
	
	if (!body.content) {
		return response.status(400).json({
			error: 'content missing'
		})
	}
	
	const note = {
		content: body.content,
		/* If the data saved in the body variable has the important property, 
		the expression will evaluate to its value. If the property does not exist,
		then the expression will evaluate to false which is defined on the right-hand side */
		important: body.important || false,
		id: generateId(),
	}
	
	notes = notes.concat(note)
	
	response.json(note)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
