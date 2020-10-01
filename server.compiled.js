const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
// const InitiateMongoServer = require('./database/database');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

// InitiateMongoServer();

app.use(bodyParser.json());
// const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send(`Hello Amazon! ${port}`);
});
// app.get('/things', (req, res) => {
//   console.log('server')
//   res.send(['hello from the farm to market api'])
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
