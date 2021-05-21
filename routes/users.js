const { User, validate } = require("../models/user");
const { Post } = require("../models/post");
const express = require("express");
const router = express.Router();

//* POST a new user
//TODO: Test in Postman
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//* POST a single post to a user's posts sub-document
//TODO: Test in Postman
//! Need to create the post in posts.js first, query for user.name
//! Then use response with post.id to make this request
router.post("/:userId/posts/:postId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);

    const post = await Post.findById(req.params.postId);
    if (!post)
      return res
        .status(400)
        .send(`The post with id ${req.params.postId} does not exist!`);

    user.posts.push(post);
    await user.save();
    return res.send(user.posts);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//* PUT a single post in a user's posts sub-document
//TODO: Test in Postman
//! Will need to make a request to this route when updating a post in posts.js
router.put("/:userId/posts/:postId", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const user = User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);

    const postToUpdate = await user.posts.id(req.params.postId);
    if (!postToUpdate)
      return res
        .status(400)
        .send(`Post with id ${req.params.id} does not exist!`);

    postToUpdate.title = req.body.title;
    postToUpdate.content = req.body.content;
    postToUpdate.image = req.body.image;
    postToUpdate.image = req.body.image;

    await postToUpdate.save();
    return res.send(postToUpdate);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//* DELETE a single post from a user's posts sub-document
//TODO: Test in Postman
//! This will need to trigger when a post is deleted in posts
router.delete("/:userId/posts/:postId", async (req, res) => {
  try {
    const user = User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);

    const postToDelete = await user.posts.id(req.params.postId);
    if (!postToDelete)
      return res
        .status(400)
        .send(`Post with id ${req.params.id} does not exist!`);

    postToDelete = await postToDelete.remove();
    return res.send(postToDelete);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
