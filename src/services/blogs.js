import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  //console.log('token', token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  //console.log(config)

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addLike = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const updatedBlog = {
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
    user: blog.user.id,
  }

  const response = await axios.put(
    `${baseUrl}/${blog.id}`, updatedBlog, config
  )

  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(
    `${baseUrl}/${blog.id}`, config
  )

  return response.data
}

export default { setToken, getAll, create, addLike, remove }