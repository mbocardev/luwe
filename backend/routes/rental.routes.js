const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

// Créer une location
router.post('/', rentalController.createRental);

// Récupérer toutes les locations
router.get('/', rentalController.getAllRentals);

// Récupérer une location par ID
router.get('/:id', rentalController.getRentalById);

// Mettre à jour une location
router.put('/:id', rentalController.updateRental);

// Supprimer une location
router.delete('/:id', rentalController.deleteRental);

module.exports = router;