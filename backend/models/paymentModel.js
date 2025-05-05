const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Rental = require('./rentalModel');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rental_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Rental,
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending' // 'pending', 'paid', 'failed'
  },
  payment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Payment.belongsTo(Rental, { foreignKey: 'rental_id' });

module.exports = Payment;