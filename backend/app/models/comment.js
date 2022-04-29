const db = require(".");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    commentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    commentMessage:{
      type: DataTypes.TEXT,
    },
  },{
    sequelize,
    modelName: "Comment" 
  });
  return Comment;
};