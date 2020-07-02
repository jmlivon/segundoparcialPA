var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'SegundoParcialPA';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use((req,res,next) => {
    // Create a new MongoClient
    const client = new MongoClient(url);
    
    // Use connect method to connect to the Server
    client.connect(function(err) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      
      const db = client.db(dbName);
      req.db = db;
  
      next();
  
      //client.close();
    });
  
  })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
