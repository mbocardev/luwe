const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Property = require('./propertyModel');
const User = require('./userModel');

const Rental = sequelize.define('Rental', {
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
  tenant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'active', 'completed', 'cancelled']]
    }
  }
});

Rental.belongsTo(Property, { foreignKey: 'property_id' });
Rental.belongsTo(User, { foreignKey: 'tenant_id' });

module.exports = Rental;