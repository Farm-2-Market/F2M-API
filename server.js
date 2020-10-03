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
app.post("/login", async(req, res) => {
  getUser = async (username)=>{
    let user = await User.findOne({ username });
    if (!user) {
      throw new Error({ error: 'Invalid login credentials' })
  };
  console.log("getuser")
  return user;
  }
  db();
  //Login a registered user
  console.log("req body password", req.body.password)
  try {
    let user = await getUser(req.body.username);
    console.log("user1", user)
    if (user){
      console.log("so true")
      let match = await bcrypt.compare(req.body.password, user.password, function(err, res) {
        if (err){
          // handle error
          console.log("ERROR!!!!: ", err)
        }
        if (res) {
          // Send JWT
          console.log("IT WORKED!!!!!!!!!!!!")
        } else {
          // response is OutgoingMessage object that server response http request
          console.log('passwords do not match');
        }
      });
      console.log("req pw", req.body.password)
      console.log("user pw", user.password)
      console.log("match", match)
      delete user.password;
      if (match){
        console.log("user", user)
        let token = jwt.sign(
          {
            data: {
              name: user.username
            },
          },
          jwtKey,
          { expiresIn: "1h" }
        )
        console.log("token")
      }
    }
} catch (error) {
    res.status(400).send(error)
}

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
