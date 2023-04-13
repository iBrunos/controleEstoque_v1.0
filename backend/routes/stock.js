module.exports = (app) => {
  // CRUD DO entry
  const { eAdmin } = require("../middleware/auth");
  const connection = require("../connection/connection");

  app.get('/stock', eAdmin, (req, res) => {
    const sql = 'SELECT * FROM stock';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Error querying database' });
      }
      res.json(results);
    });
  });

  app.get('/stock/:id', eAdmin, (req, res) => {
    const productId = req.params.id;
    const sql = `SELECT * FROM stock WHERE id = ${productId}`;
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Error querying database' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(results[0]);
    });
  });

}