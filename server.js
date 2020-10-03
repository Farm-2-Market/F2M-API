const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bodyParser = require("body-parser");
const db = require("./database/database");
const User = require("./models/userModels");
const Schema = Mongoose.Schema;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.json());
// const server = http.createServer(app);
app.post("/signup", async (req, res) => {
  db();
  try {
    let newUser = new User({
      _id: Mongoose.Types.ObjectId(),
      email: `${req.body.email}`,
      username: `${req.body.username}`,
      password: `${req.body.password}`,
    });

    newUser.save((err) => {
      if (err) {
        console.log(err);
      }
      User.findOne({ username: `${req.body.username}` }, function (err, user) {
        if (err) console.log(err);

        // test a matching password
        user.comparePassword(`${req.body.password}`, function (err, isMatch) {
          if (err) console.log(err);
          console.log("Password Matches:", isMatch); // -> Password123: true
        });
      });
    });

    console.log(request.body.password);

    var result = await user.save();
    res.status(200).send("hello");
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.get("/", (req, res) => {
//   db();
//   res.send(`Hello Amazon! ${port}`);
// });
app.post('/users/login', async(req, res) => {
  //Login a registered user
  try {
    User.findOne({ username: `${req.body.username}` }, function (err, user) {
      if (err){
         console.log(err);
      }
      // test a matching password
      user.comparePassword(`${req.body.password}`, function (err, isMatch) {
        if (err){
           console.log(err);
        }
        console.log("Password Matches:", isMatch); // -> Password123: true
      });
    });

  //     console.log(req.body)
  //     let email = req.body.email;
  //     let username = req.body.username;
  //     let password =
  //     const user = await User.findByCredentials(email, username password)
  //     if (!user) {
  //         return res.status(401).send({error: 'Login failed! Check authentication credentials'})
  //     }
  //     const token = await user.generateAuthToken()
  //     res.send({ user, token })
  // } catch (error) {
  //     res.status(400).send(error)
  // }

}
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
