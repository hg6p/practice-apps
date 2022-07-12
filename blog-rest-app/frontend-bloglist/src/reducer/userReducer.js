import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/login'
import blogService from '../services/blogs'
const personSlice = createSlice({
  name: 'person',
  initialState: '',
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return ''
    },
  },
})

export const { setUser, removeUser } = personSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    console.log(credentials)
    let data = await userService.login(credentials)
    console.log('data', data)
    console.log('data type', JSON.stringify(data))

    await blogService.setToken(data.token)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(data))
    dispatch(setUser(data.username))
  }
}
export default personSlice.reducer
