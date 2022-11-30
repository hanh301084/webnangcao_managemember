require("./userDetails");
var mongoose = require('mongoose');
const User = mongoose.model("UserInfo");

var express = require('express');
var app = express();
app.use(express.json());

require('dotenv/config');
const bcrypt = require('bcryptjs');

const cors = require('cors');
app.use(cors());

const jwt = require('jsonwebtoken');
const JWT_SECRET =  //anything
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

mongoose.connect(process.env.DB_MONGO_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true } ,(err)=>{
  if (err)
  { 
    console.log('Failed connected!!!')
    throw err;
  }
  console.log("connect to db");
});


//route
app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ message: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ message: "ok", token: token, user: user});
    } else {
      return res.json({ message: "error" });
    }
  }
  res.json({ message: "error", error: "InvAlid Password" });
});
app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port`);
});

module.exports = app;
