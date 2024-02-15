const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

const secret = "adwiegh1(#*^&@B#@0dfas)";
const salt = bcrypt.genSaltSync(10);

try {
  mongoose.connect(
    "mongodb+srv://mernblog:vamik2001@cluster0.ryf935x.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("MongoDb Connection Success");
} catch (e) {
  console.log(e);
}

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const UserDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(UserDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/post", uploadMiddleware.single("file"), (req, res) => {
  const {originalName} = req.file;
  const parts = originalName.split('.');
  const ext = parts[parts.length-1]
  res.json({ ext });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userDoc = await User.findOne({ username });
  const isPassOK = bcrypt.compareSync(password, userDoc.password);
  if (isPassOK) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("Wrong password or username");
  }
});
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  res.json(req.cookies);
});
app.listen(8000);
