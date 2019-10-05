var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');


router.get('/', verifyToken, (req, res, next) => {
  console.log("Estoy en la ruta");
  jwt.verify(
    req.token,
    'secretKey',
    (err, authData) => {
      console.log("Error de verify " + err);
      if (err) next(err);
      User.find({})
          .then(result => {
              console.log("Result " + result);
              if (result.length){
                console.log("Si entre al result");
                // res.status(200).json({
                //   result
                // })
                res.send("HOLA");
              }
              else{
                res.status(404).send('Who let the dogs out');
              }
          })
          .catch(next);
    }
  )

  // User.find({})
  //   .then(result => {
  //       if(result.length){
  //         res.status(200).json({ result });
  //       }
  //       else {
  //           res.status(404).send('No Users');
  //       }
  //   })
  //   .catch(next)

});


  // User.find({})
  //   .then(result => {
  //     if (result.length) {
  //         res.status(200).json({
  //           result
  //         });
  //     }else {
  //         res.status(404).send('Who let the dogs out?!');
  //     }
  //   })
  //   .catch(next)



router.post('/', (req, res, next) => {
  //SIGN UP
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

router.post('/login', (req, res, next) => {
  const body = req.body;

  if(!body.username || !body.password) return next({
    message: "Username or password are missing",
    name: "Invalid"
  });

  User.findOne({ username: body.username })
        .then(result => {
          if(result){

            // COMPARAR CONTRASEÑA

            result.comparePass(body.password, function(err, isMatch){
              if(err) throw (err);

              if(isMatch){
                //ANTIGUO CÓDIGO
                // res.status(200).json({
                //   message: "Succesfully logged in",
                //   user: result
                // })

                //NUEVO CÓDIGO CON ACCESSTOKEN
                jwt.sign(
                  { result }, //authData
                  'secretKey', //secret
                  { expiresIn: '500s' },
                  (err, accessToken) => {
                    if(err) next({
                      message: "Invalid operation",
                      name: "Forbidden"
                    });

                    res.status(200).json({accessToken});
                  }
                );
              }
              else {
                res.status(401).json({
                  message: "Username or password are incorrect",
                  name: "Forbidden"
                })
              }
            })
          } else {
            next({
              message: "Username or password are incorrect",
              name: "Forbidden"
            })
          }
        })
        .catch(next);


});

function verifyToken(req, res, next){
  //token es orrecto y válido
  //if true next()
  //if false next(err)
  console.log("EStoy en verifyToken");
  const bearerHeader = req.headers['authorization'];
  let token = bearerHeader.split(' ');
  if(token && token[1]){
    //si llegó un token
    req.token = token[1];
    next();
  } else {
    next({
      message: "Invalid token",
      name: "Forbidden" // 403
    });
  }
  next();
}


module.exports = router;
