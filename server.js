const express = require('express');
const app = express();
const InitiateMongoServer = require('./database/database');
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
const port = process.env.PORT || 3000;


InitiateMongoServer();

app.use(bodyParser.json());
// const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send(`Hello Amazon! ${port}`)
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})