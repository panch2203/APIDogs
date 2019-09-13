const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose  = require('mongoose');

const indexRouter = require('./routes/index');
const dogsRouter = require('./routes/dogs');

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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dogs', dogsRouter);

app.get('*', (req, res) => {
  res.status(404).send('Route not found');
})

module.exports = app;
