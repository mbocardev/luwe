const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

const Company = sequelize.define('Company', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  registration_number: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'companies',
  timestamps: false
});

User.hasOne(Company, { foreignKey: 'user_id' });
Company.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Company;