const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { Image } = require("../models/image");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + Path2D.extname(file.originalname));
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

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const image = req.body.image;
    const newImage = Image({ image: image });
    await newImage.save();
    return res.status(200).send("Image added successfully!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
