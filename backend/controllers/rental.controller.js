const Rental = require('../models/rental.model');
const Property = require('../models/property.model');
const User = require('../models/user.model');

const createRental = async (req, res) => {
  try {
    const { property_id, tenant_id, start_date, end_date, status } = req.body;

    const property = await Property.findByPk(property_id);
    const tenant = await User.findByPk(tenant_id);

    if (!property) return res.status(404).json({ error: 'Propriété non trouvée' });
    if (!tenant) return res.status(404).json({ error: 'Locataire non trouvé' });

    const rental = await Rental.create({ property_id, tenant_id, start_date, end_date, status });
    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la location' });
  }
};

const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.findAll({
      include: [
        { model: Property, attributes: ['title', 'location', 'price'] },
        { model: User, attributes: ['name', 'email'] }
      ]
    });
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des locations' });
  }
};

const getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id, {
      include: [
        { model: Property, attributes: ['title', 'location', 'price'] },
        { model: User, attributes: ['name', 'email'] }
      ]
    });
    if (!rental) return res.status(404).json({ error: 'Location non trouvée' });
    res.json(rental);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const updateRental = async (req, res) => {
  try {
    const { start_date, end_date, status } = req.body;
    const rental = await Rental.findByPk(req.params.id);

    if (!rental) return res.status(404).json({ error: 'Location non trouvée' });

    rental.start_date = start_date ?? rental.start_date;
    rental.end_date = end_date ?? rental.end_date;
    rental.status = status ?? rental.status;

    await rental.save();

    res.json(rental);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la location' });
  }
};

const deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (!rental) return res.status(404).json({ error: 'Location non trouvée' });

    await rental.destroy();
    res.json({ message: 'Location supprimée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur suppression' });
  }
};

module.exports = {
  createRental,
  getAllRentals,
  getRentalById,
  updateRental,
  deleteRental
};