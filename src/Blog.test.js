/* eslint-disable no-undef */
import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react";
import Blog from './components/Blog'
import userEvent from '@testing-library/user-event'

describe("<Blog/>", () => {
    let container
    let mockHandler = jest.fn()
    beforeEach(() => {
        const blog = {
            "title": "React patterns",
            "author": "Michael Chan",
            "url": "https://reactpatterns.com/",
            "user": {
                "username": "charlotte", "name": "Charlotte", "blogs": ["62205d81e107c22bed8c1391", "62218bc3450c53d600a6cb46"],
            },
            "likes": 8,
        }

        container = render(<Blog blog={blog} likeBlog={mockHandler} />).container
    })

    test("renders its children, at start the url and likes are not displayed", () => {
        const title = screen.getByText("React patterns")
        const author = screen.getByText("Michael Chan")
        const div = container.querySelector(".togglableContent")
        const url = screen.getByText("https://reactpatterns.com/")
        const likes = screen.getByText("8")

        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(div).toHaveStyle("display: none;")
        expect(div).toContainElement(url)
        expect(div).toContainElement(likes)
    })

    test("after clicking the button, children are displayed", () => {
        const div = container.querySelector(".togglableContent")

        const button = screen.getByText("view")
        userEvent.click(button)
        
        expect(div).not.toHaveStyle("display: none;")
    })

    test("after clicking the like button twice, the handler is called twice", () => {
        const likeBtn = screen.getByText("like")
        userEvent.click(likeBtn)
        userEvent.click(likeBtn)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})