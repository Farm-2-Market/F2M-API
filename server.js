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

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
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
      password: req.body.password,
    });
    // save user to database
    User.findOne({ username: `${newUser.username}` }, function (err, user) {
      if (!user) {
        newUser.save(function (err) {
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
      if (user) {
        // res.send("user exists");
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (err){
             throw err
            }
            console.log("passwords match?:", isMatch);
            user.generateToken((err, user)=>{
              if (err){
                res.send(err)
              }
              console.log("access:", user.accessToken,"refresh:", user.refreshToken)
              // res.send(user.accessToken, user.refreshToken)
          res.send({user: user.username, accessToken: accessToken, refreshToken: refreshToken })
          })
        });
      } else {
        res.send("username and password combination not found")
      }
    }
   catch (error) {
    res.status(500).send(error);
  }
})
// });

app.post('/logout', (req, res) => {
  const { token } = req.body;

})
app.listen(port, () => {
  console.log(`F2M app listening at http://localhost:${port}`);
});
