const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

//* POST a valid login attempt
//! when a user logs in, a new JWT token is generated and sent if their email/password credentials are correct
router.post("/login", authController.loginUser);

//* POST register a new user
router.post("/register", authController.registerUser);

module.exports = router;
