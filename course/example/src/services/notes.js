import axios from 'axios'

/* The react app running in the browser now fetches the data from 
node/express-server that runs in localhost:3001. */
const baseUrl = 'https://backend-server.run.goorm.site/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  /* const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting)) */
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }