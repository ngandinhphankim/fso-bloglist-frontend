import PropTypes from 'prop-types'
import React from 'react'

export default function LoginForm({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) {
    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleSubmit}>
                <div>username: <input name='Username' type='text' value={username} onChange={({ target }) => handleUsernameChange(target.value)} /></div>
                <div>password: <input name='Password' type='password' value={password} onChange={({ target }) => handlePasswordChange(target.value)} /></div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}
