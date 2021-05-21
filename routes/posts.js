const { Post, validate } = require("../models/post");
const express = require("express");
const router = express.Router();

//* GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
//* GET a single post by id

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(400).send(`There is no post with id: ${req.params.id}`);
    return res.send(post);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//* POST a single post
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);
    // create a new post object using the Post model
    // TODO: Query User documents for the username to add to createdBy
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

//* PUT a post by id
router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const postToUpdate = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        createdBy: req.body.createdBy,
      },
      { new: true }
    );

    if (!postToUpdate)
      return res
        .status(400)
        .send(`Post with id ${req.params.id} does not exist!`);
    await postToUpdate.save();
    return res.send(postToUpdate);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//* DELETE a single post by id
router.delete("/:id", async (req, res) => {
  try {
    const postToDelete = await Post.findByIdAndRemove(req.params.id);
    if (!postToDelete)
      return res
        .status(400)
        .send(`The post with id ${req.params.id} does not exist!`);
    return res.send(postToDelete);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
