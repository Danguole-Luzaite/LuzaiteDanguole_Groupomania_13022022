const db = require("../models");
const Post = db.post;
const User = db.user;
let user = null;
const Op = db.Sequelize.Op;
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


//Récupérer un seul post :
exports.getOnePost = (req, res, next) => {
  Post.findByPk(req.params.postId)
  .then(data => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Impossible de trouver le post avec id=${req.params.postId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération de Post avec id=" + req.params.postId
      });
  });
};


//Récupérer tous les posts :
exports.getAllPosts = (req, res, next) => {
  //condition pour récupérer les posts
  const postExists = req.query.postId;
  const postCondition = postExists ? { postExists: { [Op.like]: `%${postId}%` } } : null;
  // récupérer tous les posts avec condition appliquée
  Post.findAll({ where: postCondition })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "une erreur s'est produite lors de la récupération des posts!"
    });
  });
};


/*
// Modifier un Post par l'id :
exports.modifyPost = (req, res, next) => {
  //trouver le post
  Post.findOne({ where: { postId: req.body.postId } })
  .then((post) => {
      if (!post) {
        return res.status(401).json({ error: 'Post non trouvé !' })
      }
  })
  //modifier le post
  Post.update({ where: { postId: req.params.postId} })
};*/

/*
//Supprimer un Post avec l'id spécifié :
exports.deletePost = (req, res, next) => {

};
*/