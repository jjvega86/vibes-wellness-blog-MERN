const { Image } = require("../models/image");
const { User } = require("../models/user");

exports.createSingleImage = async (req, res) => {
  try {
    console.log(req.user);
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
