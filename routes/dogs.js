var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Dog = require('../models/dog');

/* GET dogs */
router.get('/', (req, res) => {
  Dog.find({})
    .then(result => {
      if (result.length) {
          res.status(200).send(result);
      }else {
          res.status(404).send('Who let the dogs out?!');
      }
    })
    .catch(error =>{
      res.status(500).send('Cant fetch dogs');
    })
});

/* POST dogs */
router.post('/', (req, res) => {
  let body = req.body;
  let newDog = new Dog({
    _id: mongoose.Types.ObjectId(),
    ...body
  });

  newDog.save()
      .then(result => {
        res.status(201).send(result);
      })
      .catch(error => {
        res.status(500).send('Cant create dog');
      });
})

/* GET dogs:id */
router.get('/:id', (req, res) =>{
  let id = req.params.id;
  Dog.findById(id).exec()
      .then(result => {
        if(result){
          res.status(200).send(result);
        }
        else{
          res.status(404).send('Dog not found');
        }
      })
      .catch(error =>{
        res.status(500).send('Cant fetch dog')
      });
})

/* GET dogs:id */
router.put('/:id', (req, res) =>{
    let id = req.params.id;
    let body = req.body;

    Dog.findByIdAndUpdate(id, body, {new: true})
          .then(result => {
            if(result){
              res.status(200).send(result);
            }
            else{
              res.status(404).send('Cant update, missing dog');
            }
          })
          .catch(error => {
            res.status(500).send(error);
          })
})

/* DELETE dogs:id */
router.delete('/:id', (req, res) =>{
    let id = req.params.id;

    Dog.findByIdAndRemove(id)
        .then(() => {
          res.status(204).send();
        })
        .catch(error => {
          res.status(500).send(error);
        })
})

module.exports = router;
