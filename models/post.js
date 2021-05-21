const mongoose = require("mongoose");

/** 
- Title (string)
- Content (string)
- Image (string)
- Created by (User)
- Date created (Date, default Date.now())
*/

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 2, maxLength: 100 },
  content: { type: String, required: true, minLength: 2, maxLength: 1000000 },
  image: { type: String, required: true, minLength: 2, maxLength: 100 },
  createdBy: { type: String, required: true, minLength: 2, maxLength: 100 },
  dateCreated: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
