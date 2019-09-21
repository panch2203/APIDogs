const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose  = require('mongoose');

const indexRouter = require('./routes/index');
const dogsRouter = require('./routes/dogs');
const usersRouter = require('./routes/users');

mongoose.connect('mongodb://127.0.0.1:27017/petsDB',
  { useNewUrlParser: true, useUnifiedTopology: true}
);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dogs', dogsRouter);
app.use('/users', usersRouter)
app.use((error, req, res, next) => {
  if(error) {
    res.status(500).json({
      messsage: error.messsage,
      type: error.name
    })
  }
})

app.get('*', (req, res) => {
  res.status(404).send('Route not found');
})

module.exports = app;
