import { ADD_BLOG, DELETE_BLOG, SET_BLOGS, UPDATE_BLOG } from "../actionTypes";

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

        case UPDATE_BLOG: {
            // const updatedBlog = action.payload
            // return {
            //     ...state,
            //     blogs: [updatedBlog].concat(blogs.filter(blog => blog.id !== updatedBlog.id))
            // }
            return state
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

        default:
            return state;
    }
}