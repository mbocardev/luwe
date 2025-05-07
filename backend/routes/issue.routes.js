const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Créer un problème
router.post('/', issueController.createIssue);

// Récupérer tous les problèmes
router.get('/', issueController.getAllIssues);

// Récupérer les problèmes par propriété
router.get('/property/:propertyId', issueController.getIssuesByProperty);

// Récupérer un problème par ID
router.get('/:id', issueController.getIssueById);

// Mettre à jour le statut d'un problème
router.put('/:id/status', issueController.updateIssueStatus);

// Supprimer un problème
router.delete('/:id', issueController.deleteIssue);

module.exports = router;