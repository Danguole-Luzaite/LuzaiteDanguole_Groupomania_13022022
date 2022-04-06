const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    postId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    postTitle:{
      type: DataTypes.STRING,
    },
    postMessage:{
      type: DataTypes.TEXT,
    },
    postImage:{
      type: DataTypes.STRING,
    },
  },{
    sequelize,
    modelName: "Post"
  });
  return Post;
};