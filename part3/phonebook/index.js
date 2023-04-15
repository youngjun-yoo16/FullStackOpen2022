require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/people')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('req', (req, res) => { 
	if (req.method === "POST") return JSON.stringify(req.body)
	else return null
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req'))

app.get('/info', (request, response) => {
	response.send(`Phonebook has info for ${persons.length} people <br/><br/> ${Date()}`)
})

app.get('/api/persons', (request, response) => {
	console.log("Phonebook:")
	Person.find({}).then(people => {
		response.json(people)
		people.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
	})
})

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
	})
	.catch(error => next(error))
})

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
	} /* else {
		const person = persons.find(person => person.name === body.name)
		if (person) {
			return response.status(400).json({
				error: 'name must be unique'
			})			
		}
	} */
	
	const person = new Person({
		name: body.name,
		number: body.number,
	})
	
	person.save().then(savedPerson => {
		console.log(`Added ${savedPerson.name} number ${savedPerson.number} to phonebook`)
		response.json(savedPerson)
	})
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
