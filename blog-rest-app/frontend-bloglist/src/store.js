import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducer/blogReducer'
import userReducer from './reducer/userReducer'
const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer,
  },
})

export default store
