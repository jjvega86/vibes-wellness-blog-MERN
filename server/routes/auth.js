const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
let upload = multer();

//* POST a valid login attempt
//! when a user logs in, a new JWT token is generated and sent if their email/password credentials are correct
router.post("/login", authController.loginUser);

//* POST register a new user
router.post("/register", upload.none(), authController.registerUser);

module.exports = router;
