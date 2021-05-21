const connectDb = require("./startup/db");
const posts = require("./routes/posts");
const users = require("./routes/users");
const express = require("express");
const app = express();
require("dotenv").config();

connectDb();

app.use(express.json());
app.use(`/api/posts`, posts);
app.use(`/api/users`, users);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
