import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPostsAsync } from "../redux/postsSlice";

const AllPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, [dispatch]);

  return (
    <>
      <div className="col-md-3"></div>
      <div className="col-md-6">
        {posts ? (
          posts.map((post) => (
            <li key={post._id}>
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
