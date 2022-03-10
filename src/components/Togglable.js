import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    const { buttonLabel, cancelLabel } = props

    function toggleVisibility() {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    return (
        <>
            <button style={hideWhenVisible} onClick={toggleVisibility}>{buttonLabel}</button>
            <div style={showWhenVisible} className='togglableContent'>
                {props.children}
            </div>
            <button style={showWhenVisible} onClick={toggleVisibility}>{cancelLabel || 'cancel'}</button>
        </>
    )
})

Togglable.displayName = 'Toggable'

export default Togglable

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string,
    children: PropTypes.element
}
