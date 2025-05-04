// backend/db/index.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.connect()
  .then(() => console.log('🟢 Connected to PostgreSQL'))
  .catch(err => console.error('🔴 PostgreSQL connection error', err));

module.exports = pool;
