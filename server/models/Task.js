const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('todolist', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const Task = sequelize.define('Task', {
  task_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('high', 'medium', 'low'),
    allowNull: false,
  },
 
});

module.exports = {
  sequelize,
  Task,
};
