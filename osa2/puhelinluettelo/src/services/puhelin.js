import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
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

const removeNumber = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

//export default { 
//  getAll: getAll, 
//  create: create, 
//  update: update 
//}

const puhelin = {
    getAll: getAll, 
    create: create, 
    update: update,
    removeNumber: removeNumber
};
export default puhelin;