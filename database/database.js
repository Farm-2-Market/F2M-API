const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const userModel = require('../models/userModels');
const db = ()=>{
  mongoose.connect(
    `mongodb+srv://FarmdDev:${config.password}@farm2market.lkakx.mongodb.net/${config.dbName}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(()=>{
    console.log("connected to MONGO!!")
  })
}



  module.exports = db;

// const express = require("express");
// // const mongoose = require("mongoose");
// // const config = require('./config.js')
// const userRoutes = require('../routes/user.js');
// // const assert = require('assert');
// const app = express();


// // const userColl = config.userCollName

// // const mongoose = require("mongoose");
// // const MongoClient = require('mongodb').MongoClient;
// // const assert = require('assert');

// // const { ObjectID } = require('mongodb').ObjectID;
// // const uri = config.uri;
// // const dbName = config.dbName;


// // const client = new MongoClient(uri, { useUnifiedTopology: true });



mongoose.connect(
  `mongodb+srv://FarmdDev:${config.password}@farm2market.lkakx.mongodb.net/${config.dbName}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }
).then(()=>{
  console.log("connected to MONGO!!")
})

// // mongoose.Promise = global.Promise;
// // app.use((req, res, next) => {
// //   res.header("Access-Control-Allow-Origin", "*");
// //   res.header(
// //     "Access-Control-Allow-Headers",
// //     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
// //   );
// //   if (req.method === "OPTIONS") {
// //     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
// //     return res.status(200).json({});
// //   }
// //   next();
// // });

// // // Routes which should handle requests
// // app.use("/user", userRoutes);

// // app.use((req, res, next) => {
// //   const error = new Error("Not found");
// //   error.status = 404;
// //   next(error);
// // });

// // app.use((error, req, res, next) => {
// //   res.status(error.status || 500);
// //   res.json({
// //     error: {
// //       'ln 57 message' : error.message
// //     }
// //   });
// // });

// // module.exports = app;
