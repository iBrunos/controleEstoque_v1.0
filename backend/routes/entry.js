module.exports = (app) => {
  // CRUD DO entry
  const { eAdmin } = require("../middleware/auth");
  const connection = require("../connection/connection");

  app.get('/entry', eAdmin, (req, res) => {
    const sql = 'SELECT * FROM entrys';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Error querying database' });
      }
      res.json(results);
    });
  });

  app.get('/entry/:id', eAdmin, (req, res) => {
    const productId = req.params.id;
    const sql = `SELECT * FROM entrys WHERE id = ${productId}`;
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

  app.delete('/entry/:id', eAdmin, (req, res) => {
    const id = req.params.id;
    const getEntrySql = 'SELECT product, amount FROM entrys WHERE id = ?';
    const deleteEntrySql = 'DELETE FROM entrys WHERE id = ?';
    const getStockSql = 'SELECT quantity FROM stock WHERE product = ?';
    const updateStockSql = 'UPDATE stock SET quantity = ? WHERE product = ?';
  
    connection.beginTransaction(err => {
      if (err) {
        console.error('Error starting transaction:', err);
        return res.status(500).json({ error: 'Error starting transaction' });
      }
  
      // 1. Buscar product e amount da entrada que será excluída
      connection.query(getEntrySql, [id], (err, entryResult) => {
        if (err) {
          console.error('Error getting entry:', err);
          connection.rollback(() => {
            res.status(500).json({ error: 'Error getting entry' });
          });
          return;
        }
         
      // 2. Excluir entrada
      connection.query(deleteEntrySql, [id], (err, deleteResult) => {
        if (err) {
          console.error('Error deleting entry:', err);
          connection.rollback(() => {
            res.status(500).json({ error: 'Error deleting entry' });
          });
          return;
        }

        const product = entryResult[0].product;
        const amount = entryResult[0].amount;
  
        // 2. Subtrair amount da quantidade atual em stock
        connection.query(getStockSql, [product], (err, stockResult) => {
          if (err) {
            console.error('Error getting stock quantity:', err);
            connection.rollback(() => {
              res.status(500).json({ error: 'Error getting stock quantity' });
            });
            return;
          }
          
          const currentQuantity = stockResult[0].quantity || 0;
          const newQuantity = Math.max(0, currentQuantity - amount);
  
          // 3. Atualizar quantidade em stock
          connection.query(updateStockSql, [newQuantity, product], (err, updateResult) => {
            if (err) {
              console.error('Error updating stock quantity:', err);
              connection.rollback(() => {
                res.status(500).json({ error: 'Error updating stock quantity' });
              });
              return;
            }
  

  
              connection.commit(err => {
                if (err) {
                  console.error('Error committing transaction:', err);
                  connection.rollback(() => {
                    res.status(500).json({ error: 'Error committing transaction' });
                  });
                  return;
                }
  
                res.send(`Item with ID ${id} has been deleted`);
              });
            });
          });
        });
      });
    });
  });
  
  app.post('/entry', eAdmin, (req, res) => {
    const { product, observation, amount, entryPrice, inserted_by } = req.body;
    const entrySql = 'INSERT INTO entrys (product, observation, amount, entry_price, inserted_by) VALUES (?, ?, ?, ?, ?)';
    const stockSql = 'SELECT SUM(amount) AS quantity FROM entrys JOIN products ON entrys.product = products.product WHERE entrys.product = ?';
    const updateStockSql = 'UPDATE stock SET quantity = ? WHERE product = ?';
  
    // 1. Adicionar entrada na tabela entries
    connection.query(entrySql, [product, observation,amount, entryPrice, inserted_by], (err, entryResult) => {
      if (err) {
        console.error('Error inserting entry:', err);
        return res.status(500).json({ error: 'Error inserting entry' });
      }
  
      // 2. Atualizar quantidade na tabela stock
      connection.query(stockSql, [product], (err, stockResult) => {
        if (err) {
          console.error('Error getting stock quantity:', err);
          return res.status(500).json({ error: 'Error getting stock quantity' });
        }
  
        const newQuantity = stockResult[0].quantity || 0;
  
        connection.query(updateStockSql, [newQuantity, product], (err, updateResult) => {
          if (err) {
            console.error('Error updating stock quantity:', err);
            return res.status(500).json({ error: 'Error updating stock quantity' });
          }
  
          res.json({
            id: entryResult.insertId,
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
  
  app.put('/entry/:id', eAdmin, (req, res) => {
    const id = req.params.id;
    const { product, observation, amount, entryPrice, inserted_by  } = req.body;
    const entrySql = 'UPDATE entrys SET product = ?, observation = ?, amount = ?, entry_price = ?, inserted_by = ? WHERE id = ?';
    const stockSql = 'SELECT SUM(amount) AS quantity FROM entrys WHERE product = ?';
    const updateStockSql = 'UPDATE stock SET quantity = ? WHERE product = ?';
  
    // 1. Atualizar entrada na tabela entries
    connection.query(entrySql, [product, observation, amount, entryPrice, inserted_by, id], (err, entryResult) => {
      if (err) {
        console.error('Error updating entry:', err);
        return res.status(500).json({ error: 'Error updating entry' });
      }
  
      // 2. Atualizar quantidade na tabela stock
      connection.query(stockSql, [product], (err, stockResult) => {
        if (err) {
          console.error('Error getting stock quantity:', err);
          return res.status(500).json({ error: 'Error getting stock quantity' });
        }
  
        const newQuantity = stockResult[0].quantity || 0;
  
        connection.query(updateStockSql, [newQuantity, product], (err, updateResult) => {
          if (err) {
            console.error('Error updating stock quantity:', err);
            return res.status(500).json({ error: 'Error updating stock quantity' });
          }
  
          res.json({
            id,
            product,
            observation,
            amount,
            entryPrice,
            inserted_by,
            newStockQuantity: newQuantity
          });
        });
      });
    });
  });
  ;
}