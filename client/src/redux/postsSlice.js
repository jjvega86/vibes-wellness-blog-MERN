import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blog from "../api/blog";

export const getAllPostsAsync = createAsyncThunk(
  "posts/getAllPostsAsync",
  async () => {
    try {
      let response = await blog.get("/posts");
      const posts = response.data;
      return { posts };
    } catch (err) {
      console.log(err);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getAllPostsAsync.fulfilled]: (state, action) => {
      return action.payload.posts;
    },
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
