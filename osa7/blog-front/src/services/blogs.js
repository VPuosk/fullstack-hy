import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(
    baseUrl,
    newBlog,
    config
  )
  return response.data
}

const updateExisting = async (id, blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    `${baseUrl}/${id}`,
    blog,
    config
  )
  return response.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(
    `${baseUrl}/${id}`,
    config
  )
}

const postComment = async (id, content) => {
  const config ={
    headers: { Authorization: token },
  }
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    content,
    config
  )
  return response.data
}

export default {
  getAll: getAll,
  createNew: createNew,
  setToken: setToken,
  updateExisting: updateExisting,
  removeBlog: removeBlog,
  postComment: postComment
}