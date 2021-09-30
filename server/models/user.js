const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

/**
    - Name (string)
    - Email (string)
    - Password
    - Posts
*/

const userSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 50 },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  password: { type: String, required: true, minLength: 8, maxLength: 1024 },
  profileImage: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      isAdmin: this.isAdmin,
      profileImage: this.profileImage,
    },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
};

module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;
