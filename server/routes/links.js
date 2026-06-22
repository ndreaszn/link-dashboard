const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// GET all links
router.get('/', (req, res) => {
  const links = db.prepare('SELECT * FROM links ORDER BY order_index').all();
  res.json(links);
});

// POST a new link
router.post('/', (req, res) => {
  const { title, url, icon, order_index } = req.body;
  const result = db.prepare(
    'INSERT INTO links (title, url, icon, order_index) VALUES (?, ?, ?, ?)'
  ).run(title, url, icon, order_index);
  res.json({ id: result.lastInsertRowid, message: 'Link created' });
});

// PUT (update) a link
router.put('/:id', (req, res) => {
  const { title, url, icon, order_index, active } = req.body;
  db.prepare(
    'UPDATE links SET title = ?, url = ?, icon = ?, order_index = ?, active = ? WHERE id = ?'
  ).run(title, url, icon, order_index, active, req.params.id);
  res.json({ message: 'Link updated' });
});

// DELETE a link
router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM links WHERE id = ?').run(req.params.id);
  res.json({ message: 'Link deleted' });
});

module.exports = router;