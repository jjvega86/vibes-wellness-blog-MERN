import React, { useState, useEffect } from "react";
import blog from "../api/blog";

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState(null);

  useEffect(() => {
    (async () => {
      let response = await blog.get("/posts");
      setAllPosts(response.data);
    })();
  }, []);

  return (
    <>
      <div className="col-md-3"></div>
      <div className="col-md-6">
        {allPosts ? (
          allPosts.map((post) => (
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
