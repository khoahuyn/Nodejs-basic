'use strict';

const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');
// const process = require('process');
const config = require('../config/config');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
const db = {};

const sequelizeMySQL = new Sequelize(config.development.mysql)
const sequelizeSQLServer = new Sequelize(config.development.sqlserver)


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelizeMySQL, Sequelize.DataTypes);
    db[model.name] = model;
  });
 

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelizeMySQL = sequelizeMySQL;
db.sequelizeSQLServer = sequelizeSQLServer;
db.Sequelize = Sequelize;

module.exports = db;


