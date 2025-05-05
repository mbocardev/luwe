const Property = require('../models/propertyModel');

const createProperty = async (req, res) => {
  try {
    const { owner_id, title, description, type, rental_type, location, price, available, photos, features } = req.body;
    const property = await Property.create({ owner_id, title, description, type, rental_type, location, price, available, photos, features });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la propriété' });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des propriétés' });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ error: 'Propriété non trouvée' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { title, description, type, rental_type, location, price, available, photos, features } = req.body;
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ error: 'Propriété non trouvée' });

    property.title = title ?? property.title;
    property.description = description ?? property.description;
    property.type = type ?? property.type;
    property.rental_type = rental_type ?? property.rental_type;
    property.location = location ?? property.location;
    property.price = price ?? property.price;
    property.available = available ?? property.available;
    property.photos = photos ?? property.photos;
    property.features = features ?? property.features;

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la propriété' });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ error: 'Propriété non trouvée' });

    await property.destroy();
    res.json({ message: 'Propriété supprimée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur suppression' });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
};
