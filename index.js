const connectDb = require("./startup/db");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const express = require("express");
const app = express();
require("dotenv").config();

connectDb();

app.use(express.json());
app.use(`/api/posts`, postsRouter);
app.use(`/api/users`, usersRouter);
app.use(`/api/auth`, authRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
