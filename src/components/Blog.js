import propTypes from 'prop-types'
import React, { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, isOwner, likeBlog, deleteBlog }) => {
  const [likes, setLikes] = useState(blog.likes)

  async function handleLike() {
    likeBlog(blog.id, { ...blog, likes: blog.likes + 1 })
    // setLikes(blog.likes + 1)
  }

  function handleDelete() {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <div>{blog.title}</div> <div>{blog.author}</div>
        <Togglable buttonLabel='view' cancelLabel='hide'>
          <div>
            <div>{blog.url}</div>
            <div>{likes} <button onClick={handleLike}>like</button></div>
            <div>{blog.user.name}</div>
            <button className={isOwner ? '' : 'none'} onClick={handleDelete}>remove</button>
          </div>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog

Blog.propTypes = {
  blog: propTypes.object,
  isOwner: propTypes.bool,
  likeBlog: propTypes.func,
  deleteBlog: propTypes.func
}