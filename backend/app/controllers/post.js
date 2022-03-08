const db = require("../models");
const Post = db.post;
const User = db.user;
//const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require('path');


//Créer un nouveau 'post' et l'enregistrer dans la base de données :
exports.createPost = (req, res, next) => {
  //vérifier que le poste n'existe pas déjà
  /*Post.findOne({
    where: { postId: 'postId' }
  }).then((post) => {
    if (post) return res.status(401).json({ message: 'Ce post existe déjà' })
  })*/
//  const user = User.findOne({where: {"userId": user.userId} });
  //créer un nouveau post et enregistrer dans la DB
  Post.create({
//    userId: User.userId,
    postTitle: req.body.postTitle,
    postMessage: req.body.postMessage,
//    postImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  }, {
    include: [{
      association: Post.User,
    }]}
  )
//  Post.setUser(User)
  .then(() => res.status(201).json({ message: 'Post créé !' }))
  .catch(error => res.status(400).json({ error }));
};



/*// Modifier un Post par l'id :
exports.modifyPost = (req, res, next) => {

};



//Supprimer un Post avec l'id spécifié :
exports.deletePost = (req, res, next) => {

};
*/