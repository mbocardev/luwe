const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Créer un paiement
router.post('/', paymentController.createPayment);

// Récupérer tous les paiements
router.get('/', paymentController.getAllPayments);

// Récupérer les paiements par ID de location
router.get('/rental/:rentalId', paymentController.getPaymentsByRental);

// Récupérer un paiement par ID
router.get('/:id', paymentController.getPaymentById);

// Mettre à jour le statut d'un paiement
router.put('/:id/status', paymentController.updatePaymentStatus);

// Supprimer un paiement
router.delete('/:id', paymentController.deletePayment);

module.exports = router;