const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Créer un message
router.post('/', messageController.createMessage);

// Récupérer tous les messages
router.get('/', messageController.getAllMessages);

// Récupérer les messages d'un utilisateur par ID
router.get('/user/:userId', messageController.getMessagesByUser);

// Récupérer un message par ID
router.get('/:id', messageController.getMessageById);

// Supprimer un message
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
