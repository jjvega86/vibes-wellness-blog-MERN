const { User, validate } = require("../models/user");
const { Post } = require("../models/post");
const express = require("express");
const router = express.Router();

//* POST a new user
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
//! Will need to make a request to this route when adding a new post in posts.js
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

module.exports = router;
