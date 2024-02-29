const { DataTypes } = require("sequelize");
const db = require("../../config/db.config");

const Todo = db.define("todo", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("ToBeStarted", "Pending", "Complete"),
    allowNull: false,
    defaultValue: "ToBeStarted"
  }
}, {
  tableName: "todo",
  timestamps: true
});


module.exports = Todo;