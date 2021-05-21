const mongoose = require("mongoose");
const { postSchema } = require("./post");
const Joi = require("joi");

/**
    - Name (string)
    - Email (string)
    - Password
    - Posts
*/

const userSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 100 },
  email: { type: String, required: true, minLength: 2, maxLength: 100 },
  password: { type: String, required: true, minLength: 2, maxLength: 100 },
  posts: { type: [postSchema], default: [] },
});

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().min(2).max(100).required(),
    password: Joi.string().min(2).max(100).required(),
  });
  return schema.validate(user);
};

module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validate = validateUser;
