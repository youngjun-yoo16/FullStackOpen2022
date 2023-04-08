const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('combined'))

let persons = [
	{
		"id": 1,
      	"name": "Arto Hellas", 
      	"number": "040-123456"
    },
    { 
      	"id": 2,
      	"name": "Ada Lovelace", 
      	"number": "39-44-5323523"
    },
    { 
      	"id": 3,
      	"name": "Dan Abramov", 
      	"number": "12-43-234345"
    },
    { 
      	"id": 4,
      	"name": "Mary Poppendieck", 
      	"number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
	response.send(`Phonebook has info for ${persons.length} people <br/><br/> ${Date()}`)
})

app.get('/api/persons', (request, response) => {
 	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)
	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.delete('api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)
	
	response.status(204).end()
})

const generateId = () => {
	min = 5
	max = 10000
	const randomId = Math.random() * (max - min) + min
	return Math.floor(randomId)
}

app.post('/api/persons', (request, response) => {
	const body = request.body
	
	if (!body.name) {
		return response.status(400).json({
			error: 'name missing'
		})			
	} else if (!body.number) {
		return response.status(400).json({
			error: 'number missing'
		})		
	} else {
		const person = persons.find(person => person.name === body.name)
		if (!person) {
			return response.status(400).json({
				error: 'name must be unique'
			})			
		}
	}
	
	const person = {
		"id": generateId(),
		"name": body.name,
		"number": body.number,
	}
	
	persons = persons.concat(person)
	
	response.json(persons)
})

const PORT = 3002
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
