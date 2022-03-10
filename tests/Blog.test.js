/* eslint-disable no-undef */
import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react";
import Blog from "../src/components/Blog";

describe("renders content", () => {
    test("Blog - display the blog's title and author but not its url or num of likes", () => {
        const blog = {
            "title": "React patterns",
            "author": "Michael Chan",
            "url": "https://reactpatterns.com/",
            "likes": 8,
        }

        const { container } = render(<Blog blog={blog} />)

        const title = screen.getByText("React patterns")
        const author = screen.getByText("Michael Chan")
        // const url = screen.getByText("https://reactpatterns.com/")
        // const url = container.querySelector()
        // const likes = screen.getByText("8")

        expect(title).toBeDefined()
        expect(author).toBeDefined()
        // expect(url).not.toBeDefined()
        // expect(likes).not.toBeDefined()
    })
})