const { DataTypes } = require("sequelize");
const db = require("../../config/db.config");

const Users = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  emp_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "users",
  timestamps: true
});

module.exports = Users;