const { User, validateUser } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
}

exports.loginUser = async (req, res) => {
  console.log(req.body);
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Invalid email or password.`);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    return res.send(token);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
};

exports.registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res
        .status(400)
        .send(`Body of your request is not valid! ${error}`);

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send(`Email ${req.body.email} already claimed!`);
    }

    const salt = await bcrypt.genSalt(10);
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
    });

    await newUser.save();
    const token = newUser.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(newUser);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
};
