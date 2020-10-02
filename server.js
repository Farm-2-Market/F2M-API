const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt');
const app = express();
const UserModel = require('./models/userModels');
const port = process.env.PORT || 3000;
const db = require('./database/database');
const bodyParser=require('body-parser');
  app.use(cors())
  app.use(bodyParser.urlencoded({
  extended: true
}));


// InitiateMongoServer();

app.use(bodyParser.json());
// const server = http.createServer(app);
app.post("/signup", async (request, response) => {
  db();
  try {
    console.log('test', request);
      request.body.password = bcrypt.hashSync(request.body.password, 10);
      var user = new UserModel(request.body);
      var result = await user.save();
      response.send(result);
  } catch (error) {
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