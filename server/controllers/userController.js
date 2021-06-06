const { User } = require("../models/user");
const { Post, validatePost } = require("../models/post");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
};

exports.deleteSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    await user.remove();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
};

exports.addSinglePostToUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      createdBy: req.body.createdBy,
    });

    user.posts.push(post);
    await user.save();
    return res.send(user.posts);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
};

exports.updateSinglePostOnUser = async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error);

    const user = await User.findById(req.params.userId);
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
    (postToUpdate.createdBy = req.body.createdBy), await user.save();
    return res.send(postToUpdate);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
};

exports.deleteSinglePostOnUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    console.log(user);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);

    let postToDelete = await user.posts.id(req.params.postId);
    if (!postToDelete)
      return res
        .status(400)
        .send(`Post with id ${req.params.postId} does not exist!`);

    postToDelete = await postToDelete.remove();
    user.save();
    return res.send(postToDelete);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
};
