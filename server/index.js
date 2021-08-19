const connectDb = require("./startup/db");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const imagesRouter = require("./routes/images");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

connectDb();

app.use(cors());
app.use(express.json()); // automatically parses incoming requests with JSON payloads
app.use(`/api/posts`, postsRouter);
app.use(`/api/users`, usersRouter);
app.use(`/api/auth`, authRouter);
app.use(`/api/images`, imagesRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
