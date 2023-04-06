module.exports = (app) => {
  // CRUD DO PRODUCT
  const { eAdmin } = require("../middleware/auth");
  const connection = require("../connection/connection");
  app.get('/product', eAdmin, (req, res) => {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Error querying database' });
      }
      res.json(results);
    });
  });
  app.get('/product/:id', eAdmin, (req, res) => {
    const productId = req.params.id;
    const sql = `SELECT * FROM products WHERE id = ${productId}`;
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
  app.delete('/product/:id', eAdmin, (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM products WHERE id = ?`;

    connection.query(sql, [id], (error, results, fields) => {
      if (error) throw error;
      res.send(`Item with ID ${id} has been deleted`);
    });
  });

  app.post('/product', eAdmin, (req, res) => {
    const { product, price, brand, description, inserted_by } = req.body;
    const sql = 'INSERT INTO products (product, price, brand, description, inserted_by) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [product, price, brand, description, inserted_by], (err, result) => {
      if (err) {
        console.error('Error inserting into database:', err);
        return res.status(500).json({ error: 'Error inserting into database' });
      }
      res.json({ id: result.insertId, product, price, brand, description, inserted_by });
    });
  });
  app.put('/product/:id', eAdmin, (req, res) => {
    const id = req.params.id;
    const { product, price, brand, description, inserted_by } = req.body;
    const sql = `UPDATE products SET product = ?, price = ?, brand = ?, description = ?, inserted_by = ? WHERE id = ?`;

    connection.query(sql, [product, price, brand, description, inserted_by, id], (error, results, fields) => {
      if (error) throw error;
      res.send(`Item with ID ${id} has been updated`);
    });
  });
}