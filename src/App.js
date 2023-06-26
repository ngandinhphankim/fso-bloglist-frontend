import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import authService from './services/auth'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { connect } from 'react-redux'
import { setNoti } from './redux/actions'
import propTypes from 'prop-types'

const App = ({ setNoti }) => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }

    (async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  }, [])

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const loggedUser = await authService.login({ username, password })
      console.log(loggedUser)

      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))

      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ message: exception.response.data.error, isError: true })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  function handleLogout() {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  async function createBlog(newBlog) {
    blogFormRef.current.toggleVisibility()
    try {
      const savedBlog = await blogService.createOne(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setNotification({ message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`, isError: false })
      setNoti({ message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`, isError: false })
    } catch (exception) {
      setNotification({ message: exception.response.data.error, isError: true })
    }
    setTimeout(() => setNotification(null), 5000)
  }

  async function deleteBlog(blogId) {
    try {
      await blogService.deleteOne(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
      setNotification({ message: `successfully removed`, isError: false })
    } catch (exception) {
      setNotification({ message: exception.response.data.error, isError: true })
    }
    setTimeout(() => setNotification(null), 5000)
  }

  async function likeBlog(blogId, blogToUpdate) {
    await blogService.updateOne(blogId, blogToUpdate)
  }

  return (
    <>
      <h1>blogs</h1>
      {/* {notification && <Notification message={notification.message} isError={notification.isError} />} */}
      <Notification />
      {user ?
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>

          <div>
            {blogs.sort((a, b) => a.likes > b.likes).map(blog =>
              <Blog key={blog.id} blog={blog} isOwner={user.username === blog.user.username} likeBlog={likeBlog} deleteBlog={deleteBlog} />
            )}
          </div>
        </div>
        : <LoginForm handleSubmit={handleLogin} handleUsernameChange={setUsername} handlePasswordChange={setPassword} username={username} password={password} />}
    </>
  )
}

export default connect(null, { setNoti })(App)

App.propTypes = {
  setNoti: propTypes.func
}