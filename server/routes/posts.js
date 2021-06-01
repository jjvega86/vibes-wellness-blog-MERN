const postController = require("../controllers/postController");
const express = require("express");
const router = express.Router();

//* GET all posts
router.get("/", postController.getAllPosts);

//* GET a single post by id

router.get("/:id", postController.getPostById);

//* POST a single post
router.post("/", postController.createSinglePost);

//* PUT a post by id
router.put("/:id", postController.updateSinglePost);

//* DELETE a single post by id
router.delete("/:id", postController.deleteSinglePost);

module.exports = router;
