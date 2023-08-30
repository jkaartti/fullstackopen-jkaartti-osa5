import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  
  const notify = (message, isError) => {
    setMessage(message)
    setIsError(isError)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  // check if user is logged in already
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
  
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
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
      //console.log('login succesful')
    } catch (exception) {
      notify('wrong username or password', true)
    }
  }

  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)
  
      setBlogs(blogs.concat(response))
      blogFormRef.current.toggleVisibility()
      notify(
        `a new blog ${response.title} by ${response.author} added`,
        false
      )   
    } catch (exception) {
      console.log(exception)
      notify(`${
        exception.response !== undefined && exception.response.data.error !== undefined
          ? exception.response.data.error
          : exception
      }`, true)
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

  const blogFormRef = useRef()

  const createBlogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog}/>
    </Togglable>
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
        <Notification message={message} isError={isError}/>
        <div>{user.name} logged in {logoutButton()}</div>
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
      <Notification message={message} isError={isError}/>
      {!user && loginForm()}
    </div>
  )
}

export default App