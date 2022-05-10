const db = require("../models");
const Post = db.post;
const User = db.user;
const Comment = db.comment;
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
    console.log('l image est: ', req.file);
    console.log("body est: ", req.body);
    Post.create({
      userId: user.userId,
      postTitle: req.body.postTitle,
      postMessage: req.body.postMessage,
      postImage: (req.file)? `${req.protocol}://${req.get('host')}/app/images/${req.file.filename}`: null
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
  Post.findAll({ include: [User, Comment ]
  })
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



// Modifier un Post par l'id :
exports.modifyPost = (req, res, next) => {
  //vérifier que le post existe 
  Post.findByPk( req.params.postId )
  .then((post) => {
      if (!post) {
        return res.status(404).json({ error: 'Post non trouvé !' })
      }else{
        //vérifier l'utilisateur
        if(post.userId !== req.auth.userId){
          return res.status(400).json({ error: new Error( 'La requête non autorisée' )}) }
          else{
            //supprimer l'ancienne image du fichier si postImage s'il n'est pas null, puis après, mettez à jour le post;
            if(post.postImage !== null) {
              const filename = post.postImage.split('/app/images/')[1];
              fs.unlink(`app/images/${filename}`, () => {
                //modifier le post
                Post.update({
                  postTitle: req.body.postTitle,
                  postMessage: req.body.postMessage,
                  postImage: (req.file)? `${req.protocol}://${req.get('host')}/app/images/${req.file.filename}`: null,
                  },
                  {
                    where: {
                      postId: req.params.postId,
                      userId: req.body.userId,
                    },
                  }        
                )
                .then( () =>res.status(200).json({ message: 'Post modifié !'}))
                .catch(error => res.status(400).json({ error }))
              })
            }else{
              //modifier le post, si postImage est null
              Post.update({
                postTitle: req.body.postTitle,
                postMessage: req.body.postMessage,
                postImage: (req.file)? `${req.protocol}://${req.get('host')}/app/images/${req.file.filename}`: null,
                },
                {
                  where: {
                    postId: req.params.postId,
                    userId: req.body.userId,
                  },
                }        
              )
              .then( () =>res.status(200).json({ message: 'Post modifié !'}))
              .catch(error => res.status(400).json({ error }))
            } 
          }
      } 
  })
  .catch(error => res.status(500).json({ error })); 
};



//Supprimer un Post avec l'id spécifié :
exports.deletePost = (req, res, next) => {
  //vérifier que le post existe
  console.log("postId est supprimé : ", req.params.postId)
  Post.findByPk( req.params.postId )
  .then((post) => {
    if (!post) {
      return res.status(404).json({ error: 'Post non trouvé !' })
    }
    console.log("le post supprimé est : ", post)
    if(post.userId !== req.auth.userId){
      return res.status(400).json({ error: new Error( 'La requête non autorisée' )}) 
    }else{
      //supprimer l'ancienne image du fichier si postImage s'il n'est pas null
      if(post.postImage !== null) {
        const filename = post.postImage.split('/app/images/')[1];
        fs.unlink(`app/images/${filename}`, () => {
          //supprimer le post, par postId
          Post.destroy({
            where: { postId: req.params.postId }
          })
          .then(() => res.status(200).json({ message: 'Un post supprimé avec succès !'}))
          .catch(error => res.status(400).json({ error }))
        });
      }else{
        Post.destroy({
          where: { postId: req.params.postId }
        })
        .then(() => res.status(200).json({ message: 'Un post supprimé avec succès !'}))
        .catch(error => res.status(400).json({ error }))
      }
    }
  })
  .catch(error => res.status(500).json({ error }))
};
