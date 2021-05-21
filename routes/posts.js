const Post = require("../models/post");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
  } catch (ex) {}
});

router.post("/", async (req, res) => {
  try {
    // create a new post object using the Post model
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      createdBy: req.body.createdBy,
    });

    // save the new post by inserting the document into the Mongo database
    await post.save();

    // returns a response to the requester with the object that was posted as the body
    return res.send(post);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
