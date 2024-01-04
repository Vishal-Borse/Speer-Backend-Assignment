const express = require("express");
const authRouter = express.Router();
const { signin, signup } = require("../controllers/authControllers");
const authLimiter = require("../middleware/rateLimiter");

authRouter.post("/signup", authLimiter, signup);

authRouter.post("/signin", authLimiter, signin);

module.exports = authRouter;
