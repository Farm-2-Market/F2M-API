const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const db = require("./database/database");
const User = require("./models/userModels");
const Schema = Mongoose.Schema;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
db();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// const server = http.createServer(app);
app.post("/signup", async function (req, res) {
  try {
    let testUser = new User({
      _id: Mongoose.Types.ObjectId(),
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    // save user to database
    User.findOne({ username: `${testUser.username}` }, function (err, user) {
      if (!user) {
        testUser.save(function (err) {
          if (err) {
            throw err;
          }

          // fetch user and test password verification
          User.findOne({ username: req.body.username }, function (err, user) {
            if (err) throw err;

            // test a matching password
            user.comparePassword(req.body.password, function (err, isMatch) {
              if (err) {
                throw err;
              }
<<<<<<< HEAD
              console.log("Password123:", isMatch);
=======
              console.log("matching passwords:", isMatch);
              if (isMatch){
                user.generateToken((err, user)=>{
                  if (err){
                    res.send(err)
                  }
                  console.log(user.token)
                  res.send(user.token)
                })
              } else {
                res.send("passwords don't match")
              }
>>>>>>> 021bc5ad0d62109c52227815af5d8cdc6da88476
              return res.send("user created");
            });
          });
        });
      } else {
        res.send("user exists");
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (err) throw err;
          console.log("passwords match?:", isMatch); // -> Password123: true
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/login", function (req, res) {
  console.log(req.body);
  try {
    User.findOne({ username: `${req.body.username}` }, function (err, user) {
      if (!user) {
        res.send("username not found");
      } else {
        // res.send("user exists");
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (err) throw err;
          console.log("passwords match?:", isMatch);
          user.generateToken((err, user)=>{
            if (err){
              res.send(err)
            }
            console.log(user.token)
            res.send(user.token)
          })
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
