const Payment = require('../models/paymentModel');
const Rental = require('../models/rentalModel');

const createPayment = async (req, res) => {
  try {
    const { rental_id, amount, status, payment_date, method } = req.body;

    const rental = await Rental.findByPk(rental_id);
    if (!rental) return res.status(404).json({ error: 'Location non trouvée' });

    const payment = await Payment.create({ rental_id, amount, status, payment_date, method });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du paiement' });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [ { model: Rental, attributes: ['property_id', 'tenant_id', 'start_date', 'end_date'] } ]
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des paiements' });
  }
};

const getPaymentsByRental = async (req, res) => {
  try {
    const { rentalId } = req.params;

    const payments = await Payment.findAll({
      where: { rental_id: rentalId }
    });

    if (!payments) return res.status(404).json({ error: 'Aucun paiement trouvé pour cette location' });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des paiements' });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: [ { model: Rental, attributes: ['property_id', 'tenant_id', 'start_date', 'end_date'] } ]
    });

    if (!payment) return res.status(404).json({ error: 'Paiement non trouvé' });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Paiement non trouvé' });

    payment.status = status;
    await payment.save();

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du statut' });
  }
};

const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Paiement non trouvé' });

    await payment.destroy();
    res.json({ message: 'Paiement supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du paiement' });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentsByRental,
  getPaymentById,
  updatePaymentStatus,
  deletePayment
};