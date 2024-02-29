const sequelize = require("sequelize");
const config = require("./db.config.json");

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment].database;

DB_NAME = dbConfig.db_name;
USER_NAME = dbConfig.username;
PASSWORD = dbConfig.password;
HOST = dbConfig.host;
DIALECT = dbConfig.dialect;
LOGGING = dbConfig.logging;

const db = new sequelize(DB_NAME, USER_NAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  logging: LOGGING
});

module.exports = db;