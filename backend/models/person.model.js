const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const Person = sequelize.define('Person', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'persons',
  timestamps: false
});

User.hasOne(Person, { foreignKey: 'user_id' });
Person.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Person;