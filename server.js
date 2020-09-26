const http = require('http')
const app = require('./database/database')
const port = process.env.PORT || 3000;

// const server = http.createServer(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})