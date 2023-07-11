import { ADD_BLOG, DELETE_BLOG, RESET_NOTI, SET_BLOGS, SET_NOTI, UPDATE_BLOG } from "./actionTypes"

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

export const updateBlog = updatedBlog => {
    return {
        type: UPDATE_BLOG,
        payload: updatedBlog
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
