const { Post, validatePost } = require("../models/post");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(400).send(`There is no post with id: ${req.params.id}`);
    return res.send(post);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
};

exports.createSinglePost = async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error);
    // create a new post object using the Post model
    // TODO: Query User documents for the username to add to createdBy
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      createdBy: req.body.createdBy,
    });

    console.log(post);

    // save the new post by inserting the document into the Mongo database
    await post.save();

    // Getting all the posts by createdBy user and returning them in the response.
    let posts = await Post.find({ createdBy: req.body.createdBy });
    console.log(posts);
    return res.send(posts);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
};

exports.updateSinglePost = async (req, res) => {
  try {
    const { error } = validatePost(req.body);
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
};

exports.deleteSinglePost = async (req, res) => {
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
};
