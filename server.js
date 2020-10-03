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

app.post("/signup", async function (req, res) {
  db();
  try {
        User.findOne({"username": req.body.username}, function (err,user) {
                if(!user)
                   return res.json({"Status":"username Not Valid"})

                user.comparePassword(req.body.password, function (err,isMatch) {
                    if(!isMatch){
                          return res.json({"Status":"Password Failed"})
                    };
                    user.generateToken( function (err,user) {
                        if(err){
                          res.status(400).send(err)
                        }
                        res.cookie('ths_auth',user.token).status(200).json({"Login Success":"True"})
                    })​
                })
        })
}
  catch (error) {
    res.status(500).send(error);
  }
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
