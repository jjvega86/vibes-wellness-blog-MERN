const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const { Image } = require("../models/image");
const imagesController = require("../controllers/imagesController");
const auth = require("../middleware/auth");
const { memoryStorage } = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });
let storage2 = multer.memoryStorage();
let upload2 = multer({ storage: storage2 });

router.post(
  "/upload",
  [upload.single("image"), auth],
  imagesController.createSingleImage
);

router.post(
  "/cloudUpload",
  [upload2.single("image"), auth],
  imagesController.createSingleImageCloud
);

router.get("/profileImage", auth, imagesController.getProfileImage);
module.exports = router;
