const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Property = require('./propertyModel');
const User = require('./userModel');

const Issue = sequelize.define('Issue', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  property_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Property,
      key: 'id'
    }
  },
  reported_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,  // URL de la photo
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'open'  // 'open', 'in_progress', 'resolved'
  },
  reported_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Issue.belongsTo(Property, { foreignKey: 'property_id' });
Issue.belongsTo(User, { foreignKey: 'reported_by' });

module.exports = Issue;