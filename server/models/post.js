const mongoose = require("mongoose");
const Joi = require("joi");

/** 
- Title (string)
- Content (string)
- Image (string)
- Created by (string) //! this is the name property on User schema
- Date created (Date, default Date.now())
*/

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 2, maxLength: 100 },
  content: { type: String, required: true, minLength: 2, maxLength: 1000000 },
  image: { type: String, required: false, minLength: 2, maxLength: 500 },
  createdBy: { type: String, required: true, minLength: 2, maxLength: 100 },
  dateUpdated: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

const validatePost = (post) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    content: Joi.string().min(2).max(1000000).required(),
    image: Joi.string().min(2).max(500),
    createdBy: Joi.string().min(2).max(100).required(),
  });

  return schema.validate(post);
};

module.exports.Post = Post;
module.exports.validatePost = validatePost;
module.exports.postSchema = postSchema;
