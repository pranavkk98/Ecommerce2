const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");
const User = require("../models/User.model");

let authMiddleware = async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res.status(403).json({ info: "Auth Token Invalid", type: "error" });
  }
  try {
    let decoded = jwt.verify(token, jwtSecret);
    let user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ info: "Unauthorized", type: "error" });
    }
    if (user.isFlagged) {
      return res.status(403).json({
        info: "User Banned, Contact Admin for details.",
        type: "error",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ info: "Auth Token Invalid", type: "error" });
  }
};

module.exports = authMiddleware;
