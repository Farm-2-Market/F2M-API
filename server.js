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
app.post("/signup", async (request, response) => {
  db();
  try {
    // console.log('test', request);
      // request.body.password = bcrypt.hashSync(request.body.password, 10);

      let newUser= new User({
        email: `${email}`,
        username: `${username}`,
        password: `${password}`
      })
      newUser.save((err)=>{
        if (err){
          throw err;
          User.findOne({ username:`${username}`,  function(err, user) {
            if (err) throw err;

    // test a matching password
    user.comparePassword('Password123', function(err, isMatch) {
      if (err) throw err;
      console.log('Password123:', isMatch); // -> Password123: true
  });

  // test a failing password
  user.comparePassword('123Password', function(err, isMatch) {
      if (err) throw err;
      console.log('123Password:', isMatch); // -> 123Password: false
  });
}
          })
        }
      })



      // console.log(request.body.password)

      // var result = await user.save();
      // response.send(result);
  }
 catch (error) {
      response.status(500).send(error);
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