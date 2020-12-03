const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bodyParser = require("body-parser");
const connectDB = require("./database/database");
const User = require("./models/userModels");
const Schema = Mongoose.Schema;
const app = express();
const port = process.env.PORT || 3000;
connectDB();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
//Routes
app.get('/tokenIssued', function (req, res){
function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null){
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.SECRET, (err, user) => {
    console.log(err)
    if (err){
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}
})

app.post("/signup", async function (req, res) {
  try {
    //Object to create a new user
    let newUser = new User({
      _id: Mongoose.Types.ObjectId(),
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    console.log("NU", newUser)
    // Check to see if user already exists in database
    User.findOne({ username: `${newUser.username}` }, function (err, user) {
      console.log("Q", !user)
      // if the user doesn't exist save the user to the database
      if (user) {
        console.log("user exists console log")
        return res.send("user exists");
      } else {
        newUser.save(function (err, cb) {
          console.log("save called")
          if (err) {
            throw err;
          } if (cb) {
            console.log("created log")
            return res.send("user created")
        }
        })
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
      if (user) {
        // res.send("user exists");
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (err){
             throw err
            }
            console.log("passwords match?:", isMatch);
            if (isMatch){
            user.generateToken((err, user)=>{
              if (err){
                res.send(err)
              }
              console.log("access:", user.accessToken,"refresh:", user.refreshToken)
              // res.send(user.accessToken, user.refreshToken)
          res.send({user: user.username, accessToken: user.accessToken, refreshToken: user.refreshToken })
          })
        } else {
          res.sendStatus(401)
        }
        });
      } if (!user){
        console.log("get outta heah!")
      }
    })
  }
   catch (error) {
    res.status(500).send(error);
  }
})

app.post('/logout', (req, res) => {
  const { token } = req.body;

})
app.listen(port, () => {
  console.log(`F2M app listening at http://localhost:${port}`);
});
