const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Créer une propriété
router.post('/', propertyController.createProperty);

// Récupérer toutes les propriétés
router.get('/', propertyController.getAllProperties);

// Récupérer une propriété par ID
router.get('/:id', propertyController.getPropertyById);

// Mettre à jour une propriété
router.put('/:id', propertyController.updateProperty);

// Supprimer une propriété
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;