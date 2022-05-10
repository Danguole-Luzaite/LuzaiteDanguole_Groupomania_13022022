'use strict';

//const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);


db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = require('./user')(sequelize, Sequelize);
db.post = require('./post')(sequelize, Sequelize);
db.comment = require('./comment')(sequelize, Sequelize);

db.user.hasMany(db.post, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  }
});
db.post.belongsTo(db.user, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
}); // a partir de utilisateur


db.comment.belongsTo(db.user, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  }
});
db.user.hasMany(db.comment, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  }
});
db.post.hasMany(db.comment, {
  foreignKey: {
    name: 'postId',
    allowNull: false,
  }
});

db.comment.belongsTo(db.post, {
  foreignKey: {
    name: 'postId',
    allowNull: false
  }
});

//onDelete: 'cascade'

module.exports = db;
