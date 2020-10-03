const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt');
const app = express();
const Mongoose=require('mongoose');
const Schema = Mongoose.Schema
// const UserModel = require('./models/userModels');
const port = process.env.PORT || 3000;
const db = require('./database/database');
const bodyParser=require('body-parser');
  app.use(cors())
  app.use(bodyParser.urlencoded({
  extended: true
}));
const User = require('./models/userModels');

app.use(bodyParser.json());
// const server = http.createServer(app);
app.post("/signup", async (req, res) => {
  // make db queryies and res.json the data
db()

  //user does not exist yet
  try {
    console.log("first", req.body.password)
    let newUser= new User({
      _id: Mongoose.Types.ObjectId(),
      email: `${req.body.email}`,
      username: `${req.body.username}`,
      password: `${req.body.password}`
    })
    console.log('try')
    // console.log('test', request);
      // request.body.password = bcrypt.hashSync(request.body.password, 10);
      newUser.save((err)=>{
        console.log('inside save')
        if (err){
          console.log(err);
          User.findOne({ username:`${username}`,  function(err, user) {
            console.log("user", user)
            if (err) console.log(err);

    // test a matching password
    user.comparePassword(`${req.body.password}`, function(err, isMatch) {
      if (err) console.log(err);
      console.log('Password123:', isMatch); // -> Password123: true
  });

  // test a failing password
  user.comparePassword('123Password', function(err, isMatch) {
      if (err) console.log(err);
      console.log('123Password:', isMatch); // -> 123Password: false
  });
}
          })
        }
      })
      res.status(200)



      // console.log(request.body.password)

      // var result = await user.save();
      // response.send(result);
  }
 catch (error) {
      res.status(500).send(error);
  }

});

app.get('/', (req, res) => {
  db();
  res.send(`Hello Amazon! ${port}`)

})
// app.get('/things', (req, res) => {
//   console.log('server')
//   res.send(['hello from the farm to market api'])
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})