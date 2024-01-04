const SECRET_KEY = "vishalborse";
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      req.userId = user.id;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Unauthorized User",
    });
  }
};

module.exports = auth;
