/* eslint-disable no-undef */

import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./components/BlogForm"

describe('<BlogForm/>', () => {
    let container
    let mockHandler
    beforeEach(() => {
        mockHandler = jest.fn()
        container = render(<BlogForm createBlog={mockHandler} />).container
    })

    test('the form calls the event handler with the right details when a new blog is created', () => {
        const inputs = screen.getAllByRole('textbox')
        userEvent.type(inputs[0], 'Test Blog Title')
        userEvent.type(inputs[1], 'Test Author')
        userEvent.type(inputs[2], 'Test Link')

        const button = screen.getByText('create')
        userEvent.click(button)

        expect(mockHandler).toHaveBeenCalled()

        const { title, author, url } = mockHandler.mock.calls[0][0]
        expect(title).toBe('Test Blog Title')
        expect(author).toBe('Test Author')
        expect(url).toBe('Test Link')
    })
})