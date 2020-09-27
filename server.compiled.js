const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// const server = http.createServer(app);
app.get('/', (req, res) => {
  res.send('Hello Amazon!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
