const { User } = require("../models/user");
const { Image } = require("../models/image");

exports.createSingleImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.user._id} does not exist!`);
    const url = req.protocol + "://" + req.get("host");
    user.profileImage = url + "/images/" + req.file.filename;
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

exports.createSingleImageCloud = async (req, res) => {
  console.log(req.file);
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.user._id} does not exist!`);
    let newImage = new Image({
      name: req.body.name,
    });
    newImage.img.data = req.file.buffer;
    newImage.img.contentType = req.file.mimetype;
    await newImage.save();
    user.imageData = newImage;
    user.hasProfileImage = true;
    await user.save();
    console.log(user);
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
  }
};

exports.getProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("imageData");
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.user._id} does not exist!`);
    console.log(user);

    res.status(200).send(user.imageData);
  } catch (error) {
    console.log(error);
  }
};
