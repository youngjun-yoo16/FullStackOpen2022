const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)
  
  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id
  })
  
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
	
  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response, next) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end() 
})

notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  /* By default, the updatedNote parameter of the event handler
  receives the original document without the modifications.
  We added the optional { new: true } parameter, which will cause our
  event handler to be called with the new modified document instead of the original. */
  Note.findByIdAndUpdate(request.params.id, { content, important }, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter