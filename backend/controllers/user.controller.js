const UserModel = require('../models/user.model');

const UserController = {
  async getUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  async createUser(req, res) {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Champs requis' });
    }

    try {
      const newUser = await UserModel.createUser(name, email);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la création' });
    }
  }
};

module.exports = UserController;