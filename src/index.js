const express = require("express");
const app = express();
const authRouter = require("./routes/authRoutes");
const noteRouter = require("./routes/notesRoutes");
const mongoose = require("mongoose");
require('dotenv').config();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running at http://localhost:5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
