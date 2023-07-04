import { ADD_BLOG, CLEAR_BLOGS, DELETE_BLOG, SET_BLOGS } from "../actionTypes";

const initialState = {
    blogs: []
}

export default function (state = initialState, action) {
    const { blogs } = state
    switch (action.type) {
        case ADD_BLOG:
            return {
                ...state,
                blogs: [...blogs.concat(action.payload)]
            }

        case DELETE_BLOG: {
            const blogId = action.payload
            return {
                ...state,
                blogs: blogs.filter(blog => blog.id !== blogId)
            }
        }

        case SET_BLOGS:
            return {
                ...state,
                blogs: [...action.payload]
            }

        case CLEAR_BLOGS:
            return {
                ...state,
                blogs: []
            }

        default:
            return state;
    }
}