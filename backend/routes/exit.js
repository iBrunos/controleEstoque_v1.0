module.exports = (app) => {
  const { eAdmin } = require("../middleware/auth"); // CRUD DO exits
  const connection = require("../connection/connection");
  
  app.get('/exit', eAdmin, (req, res) => {
    const sql = 'SELECT * FROM exits';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Error querying database' });
      }
      res.json(results);
    });
  });
  
  app.get('/exit/:id', eAdmin, (req, res) => {
    const productId = req.params.id;
    const sql = `SELECT * FROM exits WHERE id = ${productId}`;
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
  
  app.delete('/exit/:id', eAdmin, (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM exits WHERE id = ?';

    connection.query(sql, [id], (error, results, fields) => {
      if (error) throw error;
      res.send(`Item with ID ${id} has been deleted`);
    });
  });

  app.post('/exit', eAdmin, (req, res) => {
    const { product, amount, observation, inserted_by } = req.body;
    const exitSql = 'INSERT INTO exits (product, amount, observation, inserted_by) VALUES (?, ?, ?, ?)';
    const stockSql = 'SELECT quantity FROM stock WHERE product = ?';
    const updateStockSql = 'UPDATE stock SET quantity = ? WHERE product = ?';
  
    // 1. Adicionar saída na tabela exits
    connection.query(exitSql, [product, amount, observation, inserted_by], (err, exitResult) => {
      if (err) {
        console.error('Error inserting exit:', err);
        return res.status(500).json({ error: 'Error inserting exit' });
      }
  
      // 2. Atualizar quantidade na tabela stock
      connection.query(stockSql, [product], (err, stockResult) => {
        if (err) {
          console.error('Error getting stock quantity:', err);
          return res.status(500).json({ error: 'Error getting stock quantity' });
        }
  
        const currentQuantity = stockResult[0].quantity || 0;
        const newQuantity = currentQuantity - amount;
  
        connection.query(updateStockSql, [newQuantity, product], (err, updateResult) => {
          if (err) {
            console.error('Error updating stock quantity:', err);
            return res.status(500).json({ error: 'Error updating stock quantity' });
          }
  
          res.json({
            id: exitResult.insertId,
            product,
            amount,
            observation,
            inserted_by,
            newStockQuantity: newQuantity
          });
        });
      });
    });
  });
  
  
  app.put('/exit/:id', eAdmin, (req, res) => {
    const id = req.params.id;
    const { product, observation, amount, inserted_by } = req.body;
    const sql = 'UPDATE exits SET product = ?, observation = ?, amount = ?, inserted_by = ? WHERE id = ?';

    connection.query(sql, [product, observation, amount, inserted_by, id], (error, results, fields) => {
      if (error) throw error;
      res.send(`Item with ID ${id} has been updated`);
    });
  });
}
