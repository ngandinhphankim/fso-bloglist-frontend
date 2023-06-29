import React, { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNoti } from './redux/actions'
import authService from './services/auth'
import blogService from './services/blogs'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

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

      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))

      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNoti({ message: exception.response.data.error, isError: true }))
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
      dispatch(setNoti({ message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`, isError: false }))
    } catch (exception) {
      dispatch(setNoti({ message: exception.response.data.error, isError: true }))
    }
  }

  async function deleteBlog(blogId) {
    try {
      await blogService.deleteOne(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
      dispatch(setNoti({ message: `successfully removed`, isError: false }))
    } catch (exception) {
      dispatch(setNoti({ message: exception.response.data.error, isError: true }))
    }
  }

  async function likeBlog(blogId, blogToUpdate) {
    await blogService.updateOne(blogId, blogToUpdate)
  }

  return (
    <>
      <h1>blogs</h1>
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

export default App