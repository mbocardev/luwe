const db = require('../config/db');

const UserModel = {
  async getAllUsers() {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  },

  async createUser(name, email) {
    const result = await db.query(
      'INSERT INTO users(name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return result.rows[0];
  }
};

module.exports = UserModel;
