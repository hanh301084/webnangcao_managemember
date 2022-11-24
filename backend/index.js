var express = require('express');
var mongoose = require('mongoose');
var app = express();
app.use(express.json());
require('dotenv/config');
require("./userDetails");
const User = mongoose.model("UserInfo");
const cors = require('cors');
app.use(cors());
const bcrypt = require('bcryptjs');

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
      return res.json({ error: "User Exists" });
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


app.listen(process.env.PORT, () => {
    console.log(`Server started on port`);
});

module.exports = app;
