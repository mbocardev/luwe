// backend/routes/test.route.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
