import { useState } from "react"
import blogs from "../services/blogs"

const Blog = ({ blog }) => {
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

  return (
  <div style={blogStyle} onClick={toggleVisibility}>
    {blog.title} {blog.author}
    <button onClick={toggleVisibility}>{buttonText}</button>
    <div style={visibilityStyle}>
      {blog.url}<br/>
      likes {blog.likes} <button>like</button><br/>
      {blog.user.name}
    </div>
  </div>
  )
}

export default Blog