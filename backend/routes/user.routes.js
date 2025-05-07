const express = require('express');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.use(verifyToken);

router.get('/', isAdmin, userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', isAdmin, userController.deleteUser);

module.exports = router;