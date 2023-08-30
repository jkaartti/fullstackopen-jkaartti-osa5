import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogs, setBlogs] = useState([])
  
  // check if user is logged in already
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
  
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      console.log('login succesful')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const emptyBlogForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const createBlog = async (event) => {
    event.preventDefault()

    console.log('creating blog')
    try {
      const newBlog = { title, author, url }
      const response = await blogService.create(newBlog)
      //console.log(response)

      const savedBlog = {
        title: response.title,
        author: response.author,
        url: response.url,
      }

      setBlogs(blogs.concat(savedBlog))

      emptyBlogForm()
    } catch (exception) {
      console.log('error creating blog:', exception)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const createBlogForm = () => (
    <form onSubmit={createBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const logoutButton = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  // if user is logged in, show the blog list
  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <div>{user.name} logged in {logoutButton()}</div>
        <h2>create new</h2>
        {createBlogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  // if user is not logged in, show the login form
  return (
    <div>
      <h2>login to application</h2>
      {!user && loginForm()}
    </div>
  )
}

export default App