  var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Dog = require('../models/dog');

/* GET dogs */
router.get('/', (req, res, next) => {
  Dog.find({})
    .then(result => {
      if (result.length) {
          res.status(200).json({
            dog:result
          });
      }else {
          res.status(404).send('Who let the dogs out?!');
      }
    })
    .catch(next)
});

/* POST dogs */
router.post('/', (req, res, next) => {
  let body = req.body;
  Dog.create(body)
  .then(result => {
    res.status(201).json({
      dog:result
    });
  })
  .catch(next);
})

/* GET dogs:id */
router.get('/:id', (req, res, next) =>{
  let id = req.params.id;
  Dog.findById(id).exec()
      .then(result => {
        if(result){
          res.status(200).json({
            dog: result
          });
        }
        else{
          res.status(404).send('Dog not found');
        }
      })
      .catch(next);
})

/* GET dogs:id */
router.put('/:id', (req, res, next) =>{
    let id = req.params.id;
    let body = req.body;

    Dog.findByIdAndUpdate(id, body, {new: true})
          .then(result => {
            if(result){
              res.status(200).json({
                dog: result
              });
            }
            else{
              res.status(404).send('Cant update, missing dog');
            }
          })
          .catch(next)
})

/* DELETE dogs:id */
router.delete('/:id', (req, res) =>{
    let id = req.params.id;

    Dog.findByIdAndRemove(id)
        .then(() => {
          res.status(204).json({});
        })
        .catch(next)
})

module.exports = router;
