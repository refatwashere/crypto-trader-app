const db = require('../config/db');

exports.findById = async (id) => {
  const res = await db.query('SELECT id, username, email, created_at FROM users WHERE id=$1', [id]);
  return res.rows[0];
};

exports.create = async ({ username, email, password_hash }) => {
  const res = await db.query(
    'INSERT INTO users (username, email, password_hash) VALUES ($1,$2,$3) RETURNING id, username, email',
    [username, email, password_hash]
  );
  return res.rows[0];
};
