import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPostsAsync } from "../features/posts/postsSlice";

const AllPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, [posts]);

  return (
    <>
      {posts ? (
        posts.map((post) => (
          <li key={post._id}>
            {post.title} {post.content}
          </li>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default AllPosts;
