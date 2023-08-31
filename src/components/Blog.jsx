import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, addLike, removeBlog }) => {
  let blogStyle = {
    paddingTop: 7,
    paddingBottom: 8,
    paddingLeft: 5,
    backgroundColor: '#DDF0D0',
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => { setVisible(!visible) }
  
  const visibilityStyle = { display: visible ? '' : 'none' }
  const buttonText = visible ? 'hide' : 'view'

  const handleLike = () => { addLike (blog) }

  const handleRemove = () => { removeBlog(blog) }

  const remove = () => {
    if (!removeBlog) {
      return ''
    }
    return (
      <button onClick={handleRemove}>remove</button>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{buttonText}</button>
      <div style={visibilityStyle}>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={handleLike}>like</button><br/>
        {blog.user.name}<br/>
        {remove()}
      </div>
    </div>
  )
}

export default Blog