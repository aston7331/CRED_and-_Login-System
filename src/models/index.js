const db = require("../config/db.config");

const usersModel = require("../modules/User-Module/user.model");
const todoModel = require("../modules/Todo-Module/todo.model")

db.sync().then(()=> {
  console.log('db connected')
}).catch((error)=> {
  console.error('Unable to connect db :- ', error);
});

module.exports = db;