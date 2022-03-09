const db = require("../models");
const Post = db.post;
const User = db.user;
let user = null;
//const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require('path');


//Créer un nouveau 'post' et l'enregistrer dans la base de données :
exports.createPost = (req, res, next) => {
  //trouver l'utilisateur
  User.findOne({ where: { userId: req.body.userId } }).then((response) => {
    if (!response){
      res.status(403).json({ message: 'Vous ne pouvez pas de creer un post' })
    } else {
      user = response.dataValues;
    //créer un nouveau post et enregistrer dans la DB
    console.log("body est: ", req.body);
    Post.create({
      userId: user.userId,
      postTitle: req.body.postTitle,
      postMessage: req.body.postMessage,
      postImage: (req.file)? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null
    })
    .then(() => res.status(201).json({ message: 'Post créé !' }))
    .catch(error => res.status(400).json({ error }));
      }
  })
};



/*// Modifier un Post par l'id :
exports.modifyPost = (req, res, next) => {

};



//Supprimer un Post avec l'id spécifié :
exports.deletePost = (req, res, next) => {

};
*/