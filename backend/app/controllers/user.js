const db = require("../models");
const User = db.user;
//const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//créer un nouvel utilisateur
exports.create = (req, res, next) => {
// se rassurer que le mode pass est valide

// se rassurer que l'email est valide

// verifier que le compte n'existe pas deja
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
    if (user) return res.status(401).json({ message: 'utilisateur existe deja' })
  })
// creer le compte si tous sont correct  
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
