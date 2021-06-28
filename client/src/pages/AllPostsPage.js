import React, { useState, useEffect } from "react";
import blog from "../api/blog";

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await blog.get("/posts");
      setAllPosts(response.data);
      console.log(allPosts);
    })();
  }, []);

  return allPosts.map((post) => (
    <li key={post.id}>
      {post.title} {post.content}
    </li>
  ));
};

export default AllPosts;
