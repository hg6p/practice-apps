import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'
const userBaseUrl = 'http://localhost:3001/api/users'
let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}
const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}
const getUsers = async () => {
  const request = await axios.get(userBaseUrl)
  return request.data
}
const getAllUsersBlogs = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}
export default {
  getAll,
  create,
  update,
  deleteBlog,
  setToken,
  getUsers,
  getAllUsersBlogs,
}
