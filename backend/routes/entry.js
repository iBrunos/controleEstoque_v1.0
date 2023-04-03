module.exports = (app) => {
    // CRUD DO entry
const connection = require("../connection/connection");
app.get('/entry', (req, res) => {
    const sql = 'SELECT * FROM entrys';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Error querying database' });
      }
      res.json(results);
    });
  });
  app.delete('/entry/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM entrys WHERE id = ?`;
  
    connection.query(sql, [id], (error, results, fields) => {
      if (error) throw error;
      res.send(`Item with ID ${id} has been deleted`);
    });
  });
  
  app.post('/entry', (req, res) => {
    const { product, price, brand, description, amount, inserted_by } = req.body;
    const sql = 'INSERT INTO entrys (product, price, brand, description, amount, inserted_by) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [product, price, brand, description, amount, inserted_by], (err, result) => {
      if (err) {
        console.error('Error inserting into database:', err);
        return res.status(500).json({ error: 'Error inserting into database' });
      }
      res.json({ id: result.insertId, product, price, brand, description, amount });
    });
  });
  app.put('/entry/:id', (req, res) => {
    const id = req.params.id;
    const { product, price, brand, description, amount, inserted_by } = req.body;
    const sql = `UPDATE entry SET product = ?, price = ?, brand = ?, description = ?, amount = ?, inserted_by = ? WHERE id = ?`;
  
    connection.query(sql, [product, price, brand, description, amount, inserted_by, id], (error, results, fields) => {
      if (error) throw error;
      res.send(`Item with ID ${id} has been updated`);
    });
  });
}