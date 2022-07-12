import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      return [...state, action.payload]
    },
    setBlogs(state, action) {
      return action.payload
    },
    addVote(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, createBlog, addVote, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll()
    console.log('reducer', response)
    dispatch(setBlogs(response))
  }
}

export const createNewBlog = (content) => {
  return async (dispatch) => {
    await blogService.create(content)
    dispatch(createBlog(content))
  }
}
export const voteForBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog.id, blog)
    console.log(blog)
    dispatch(addVote(blog))
  }
}
export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}
export default blogSlice.reducer
