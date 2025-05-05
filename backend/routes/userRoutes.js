const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Créer un utilisateur
router.post('/', userController.createUser);

// Récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

// Récupérer un utilisateur par ID
router.get('/:id', userController.getUserById);

// Mettre à jour un utilisateur
router.put('/:id', userController.updateUser);

// Supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

module.exports = router;