const Message = require('../models/messageModel');
const User = require('../models/userModel');

const createMessage = async (req, res) => {
  try {
    const { sender_id, receiver_id, content } = req.body;

    const sender = await User.findByPk(sender_id);
    const receiver = await User.findByPk(receiver_id);

    if (!sender) return res.status(404).json({ error: 'Expéditeur non trouvé' });
    if (!receiver) return res.status(404).json({ error: 'Destinataire non trouvé' });

    const message = await Message.create({ sender_id, receiver_id, content });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: [
        { model: User, as: 'sender', attributes: ['name', 'email'] },
        { model: User, as: 'receiver', attributes: ['name', 'email'] }
      ]
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
  }
};

const getMessagesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: userId },
          { receiver_id: userId }
        ]
      },
      include: [
        { model: User, as: 'sender', attributes: ['name', 'email'] },
        { model: User, as: 'receiver', attributes: ['name', 'email'] }
      ]
    });

    if (!messages) return res.status(404).json({ error: 'Aucun message trouvé' });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const getMessageById = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id, {
      include: [
        { model: User, as: 'sender', attributes: ['name', 'email'] },
        { model: User, as: 'receiver', attributes: ['name', 'email'] }
      ]
    });

    if (!message) return res.status(404).json({ error: 'Message non trouvé' });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message non trouvé' });

    await message.destroy();
    res.json({ message: 'Message supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du message' });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessagesByUser,
  getMessageById,
  deleteMessage
};
