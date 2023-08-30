import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  let blogStyle = {
    paddingTop: 7,
    paddingBottom: 8,
    paddingLeft: 5,
    backgroundColor: '#DDF0D0',
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => { setVisible(!visible) }
  
  const visibilityStyle = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'view'

  const addLike = async () => {
    try {
      await blogService.addLike(blog)
      setLikes(blog.likes + 1)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <button onClick={toggleVisibility}>{buttonText}</button>
    <div style={visibilityStyle}>
      {blog.url}<br/>
      likes {likes} <button onClick={addLike}>like</button><br/>
      {blog.user.name}
    </div>
  </div>
  )
}

export default Blog