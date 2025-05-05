const Issue = require('../models/issueModel');
const Property = require('../models/propertyModel');
const User = require('../models/userModel');

const createIssue = async (req, res) => {
  try {
    const { property_id, reported_by, description, photo } = req.body;

    const property = await Property.findByPk(property_id);
    const user = await User.findByPk(reported_by);
    if (!property || !user) return res.status(404).json({ error: 'Propriété ou utilisateur non trouvé' });

    const issue = await Issue.create({ property_id, reported_by, description, photo });
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du problème' });
  }
};

const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.findAll({
      include: [
        { model: Property, attributes: ['title', 'location'] },
        { model: User, attributes: ['name', 'email'] }
      ]
    });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des problèmes' });
  }
};

const getIssuesByProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const issues = await Issue.findAll({
      where: { property_id: propertyId },
      include: [
        { model: Property, attributes: ['title', 'location'] },
        { model: User, attributes: ['name', 'email'] }
      ]
    });

    if (!issues) return res.status(404).json({ error: 'Aucun problème trouvé pour cette propriété' });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des problèmes' });
  }
};

const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findByPk(req.params.id, {
      include: [
        { model: Property, attributes: ['title', 'location'] },
        { model: User, attributes: ['name', 'email'] }
      ]
    });

    if (!issue) return res.status(404).json({ error: 'Problème non trouvé' });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const issue = await Issue.findByPk(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Problème non trouvé' });

    issue.status = status;
    await issue.save();

    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du statut' });
  }
};

const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findByPk(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Problème non trouvé' });

    await issue.destroy();
    res.json({ message: 'Problème supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du problème' });
  }
};

module.exports = {
  createIssue,
  getAllIssues,
  getIssuesByProperty,
  getIssueById,
  updateIssueStatus,
  deleteIssue
};