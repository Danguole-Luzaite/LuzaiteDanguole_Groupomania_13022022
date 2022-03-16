const db = require("../models");
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const passwordValidator = require('password-validator');
//const passwordvalidatorSchema = new passwordValidator();
//const emailValidator = require("email-validator");
const Op = db.Sequelize.Op;
require('dotenv').config();



//Créer un nouvel utilisateur :
exports.create = (req, res, next) => {
/*// se rassurer que le mot de pass est valide
  if(passwordvalidatorSchema.validate(req.body.password)){
    next();
  }else{
    console.log(passwordvalidatorSchema.validate('req.body.password', { details: true }))
    return res.status(400).json({error: 'besoin de créer un mot de passe plus fort'})
  }
// se rassurer que l'email est valide
  if(emailValidator.validate(req.body.email)){
    next();
  }else{
    return res.status(400).json({error: "la structure de l'e-mail n'est pas correcte ! "})
  }*/
// vérifier que le compte n'existe pas déjà
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
    if (user) return res.status(401).json({ message: 'utilisateur existe déjà' })
  })
// créer le compte si tous sont correct  
  bcrypt.hash(req.body.password, 10)
  .then(hash => {      
      User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
      })
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};


//Se connecter au compte utilisateur existant :
exports.login = (req, res, next) => {
  //vérifier que l'utilisateur existe
  User.findOne({ where: {email: req.body.email} })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé !' })
      }
      //valider que le mot de passe est correct
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Le mot de passe est invalide !' });
          }
          console.log('userId:' , user.userId); //test on console.log print userID
          res.status(200).json ({
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: jwt.sign(
              { "userId": user.userId },
              process.env.SECRET_TOKEN,
              { expiresIn: '24h'} // expire dans 24 heures
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); 
};



//Obtenir tous les utilisateurs:
exports.getAllUsers = (req, res, next) => {
  // définir la condition pour obtenir les utilisateurs existants par leur Id
  const userExists = req.query.userId;
  const userCondition = userExists ? { userExists: { [Op.like]: `%${userId}%` } } : null;
  // obtenir tous les utilisateurs avec condition appliquée
  User.findAll({ where: userCondition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "une erreur s'est produite lors de la récupération des utilisateurs!"
      });
    });
};
