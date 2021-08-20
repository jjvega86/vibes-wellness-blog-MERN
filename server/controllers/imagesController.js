const { Image } = require("../models/image");

exports.createSingleImage = async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const newImage = Image({ image: url + "/images/" + req.file.filename });
    await newImage.save();
    return res.status(200).send(newImage);
  } catch (error) {
    console.log(error);
  }
};
