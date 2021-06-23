const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

//* Get all users
router.get("/", userController.getAllUsers);

//* DELETE a single user from the database
router.delete("/:userId", [auth, admin], userController.deleteSingleUser);

module.exports = router;
