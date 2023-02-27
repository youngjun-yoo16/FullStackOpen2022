import { useState } from 'react'

const Name = ({ name }) => <li>{name}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const addName = (event) => {
	  event.preventDefault()
	  const nameObject = {
		  name: newName
	  }
	  setPersons(persons.concat(nameObject))
	  setNewName('')
  }
  
  const handleNameChange = (event) => {
	  console.log(event.target.value)
	  setNewName(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
		  {persons.map(person => 
			<Name key={person.name} name={person.name} />
		  )}
	  </ul>
    </div>
  )
}

export default App