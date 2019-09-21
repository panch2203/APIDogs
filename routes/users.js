var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.post('/', (req, res, next) => {
  const body = req.body;
  User.create(body)
        .then(result => {
          if(result){
            res.status(201).json({
              message: "Sign up completed",
              user: result
            })
          }else {
            next({
              message: "Cant create user",
              name: "Invalid"
            })
          }
        })
        .catch(next);
});

module.exports = router;
