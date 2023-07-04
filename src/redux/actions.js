import { ADD_BLOG, CLEAR_BLOGS, DELETE_BLOG, RESET_NOTI, SET_BLOGS, SET_NOTI } from "./actionTypes"

export const setNoti = ({ message, isError }) => {
    return {
        type: SET_NOTI,
        payload: { message, isError }
    }
}

export const resetNoti = () => {
    return { type: RESET_NOTI }
}

export const addBlog = newBlog => {
    return {
        type: ADD_BLOG,
        payload: newBlog
    }
}

export const deleteBlog = blogId => {
    return {
        type: DELETE_BLOG,
        payload: blogId
    }
}

export const setBlogs = blogs => {
    return {
        type: SET_BLOGS,
        payload: blogs
    }
}

export const clearBlogs = () => {
    return { type: CLEAR_BLOGS }
}
