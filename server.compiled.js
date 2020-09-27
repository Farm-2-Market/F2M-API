const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const InitiateMongoServer = require('./database/database');

InitiateMongoServer();

app.use(bodyParser.json());
// const server = http.createServer(app);

app.get('/', (req, res) => {
  console.log(port);
  res.send('Hello Amazon!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
