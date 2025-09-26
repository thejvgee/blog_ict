import {createSlice} from '@reduxjs/toolkit'

const BlogReducer  = createSlice({
  initialState : {blogs : []},

  name : 'BlogReducer',

  reducers : {
    addBlogs : (state ,action) => {
      state = state.blogs = action.payload
    },
    removeBlogs : (state) => {
      state = state.blogs = []
    },
  }
})

export const {addBlogs , removeBlogs} = BlogReducer.actions 

export default BlogReducer.reducer