const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

//* Get all users
router.get("/", userController.getAllUsers);

//* DELETE a single user from the database
router.delete("/:userId", [auth, admin], userController.deleteSingleUser);

//* POST a single post to a user's posts sub-document
router.post("/:userId/posts/", auth, userController.addSinglePostToUser);

//* PUT a single post in a user's posts sub-document
//! Will need to make a request to this route when updating a post in posts.js
router.put(
  "/:userId/posts/:postId",
  auth,
  userController.updateSinglePostOnUser
);

//* DELETE a single post from a user's posts sub-document
//! This will need to trigger when a post is deleted in posts
router.delete(
  "/:userId/posts/:postId",
  auth,
  userController.deleteSinglePostOnUser
);

module.exports = router;
