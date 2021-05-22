const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    //! By storing the payload of the token in decoded, we gain access to it for middleware by setting it
    //! equal to a property on the request object that gets passed to the route handler
    return next();
  } catch (ex) {
    return res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
