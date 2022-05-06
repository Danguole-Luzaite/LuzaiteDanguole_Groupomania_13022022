const db = require("../models");
const Post = db.post;
const User = db.user;
const Comment = db.comment;



// créer un commentaire :
exports.createComment = (req, res, next) => {
  //trouver l'utilisateur
  User.findOne({ where: { userId: req.body.userId } })
  .then((response) => {
    if (!response){
      res.status(403).json({ message: 'Vous ne pouvez pas de creer un commentaire' })
    }else{
      //trouver le post
      Post.findOne({ where: {postId: req.body.postId} })
      .then((response) => {
        if (!response){
          res.status(403).json({ message: 'Vous ne pouvez pas de trouver le commentaire' })
        }else{
          Comment.create({
            userId: req.body.userId,
            postId: req.body.postId,
            commentMessage: req.body.commentMessage
          })
          .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
          .catch(error => res.status(400).json({ error }));
        }
      })
    }
  })
  .catch(error => res.status(500).json({ error }))
};


//Récupérer tous les commentaires :
exports.getCommentsByPostId = (req, res, next) => {
  Comment.findAll({ where: {
    postId: req.params.postId
  },
  include: [User]
  })
  .then((data) => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({ message:
      err.message || "une erreur s'est produite lors de la récupération des commentaires!" });
  })
};


// Supprimer un commentaire avec l'id spécifié :
exports.deleteComment = (req, res, next) => {
  //vérifier que le commentaire existe
  Comment.findOne({ where: {
    commentId: req.params.commentId
  }
  })
  .then((comment) => {
    if (!comment){
      return res.status(404).json({ error: 'Commentaire non trouvé !' })
    }else{
      if (comment.userId == req.params.userId){
        Comment.destroy({
          where: { commentId: req.params.commentId }
        })
        .then(() => res.status(200).json({ message: 'Le commentaire est supprimé !'}))
        .catch(error => res.status(400).json({ error }))
      }else{
        return res.status(403).json({ error: 'Vous ne pas autorise supprimer ce commentaire'})
      } 
      //supprimer commentaire, par commentId
    
    }
  })
  .catch(error => res.status(500).json({ error }))
};