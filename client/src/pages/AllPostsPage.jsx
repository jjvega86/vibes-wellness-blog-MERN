import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPostsAsync } from "../redux/postsSlice";
import blog from "../api/blog";

const AllPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, []);

  return (
    <>
      <div className="col-md-3"></div>
      <div className="col-md-6">
        {posts ? (
          posts.map((post) => (
            <li key={post.id}>
              {post.title} {post.content}
            </li>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div className="col-md-3"></div>
    </>
  );
};

export default AllPosts;
