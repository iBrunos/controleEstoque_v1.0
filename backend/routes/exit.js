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
    const exitId = req.params.id;
    const exitSql = 'DELETE FROM exits WHERE id = ?';
    const stockSql = 'SELECT product, amount FROM exits WHERE id = ?';
    const updateStockSql = 'UPDATE stock SET quantity = CASE WHEN quantity - ? < 0 THEN 0 ELSE quantity - ? END WHERE product = ?';
    
    // 1. Obter o produto e a quantidade da saída que está sendo excluída
    connection.query(stockSql, [exitId], (err, result) => {
      if (err) {
        console.error('Erro ao obter dados da saída:', err);
        return res.status(500).json({ error: 'Erro ao obter dados da saída' });
      }
    
      const { product, amount } = result[0];
    
      // 2. Excluir a saída da tabela exits
      connection.query(exitSql, [exitId], (err, result) => {
        if (err) {
          console.error('Erro ao excluir saída:', err);
          return res.status(500).json({ error: 'Erro ao excluir saída' });
        }
    
        // 3. Atualizar a quantidade na tabela stock
        connection.query(updateStockSql, [amount, amount, product], (err, result) => {
          if (err) {
            console.error('Erro ao atualizar quantidade em estoque:', err);
            return res.status(500).json({ error: 'Erro ao atualizar quantidade em estoque' });
          }
    
          res.json({ message: 'Saída excluída com sucesso' });
        });
      });
    });
  });
  
  app.post('/exit', eAdmin, (req, res) => {
    const { product, observation, amount, exitPrice, inserted_by, type } = req.body;
    const exitSql = 'INSERT INTO exits (product, observation, amount, exit_price, inserted_by, type) VALUES (?, ?, ?, ?, ?, ?)';
    const stockSql = 'SELECT quantity FROM stock WHERE product = ?';
    const updateStockSql = 'UPDATE stock SET quantity = quantity - ? WHERE product = ?';
  
    // 1. Adicionar saída na tabela exits
    connection.query(exitSql, [product, observation, amount, exitPrice, inserted_by, type], (err, exitResult) => {
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
  
        connection.query(updateStockSql, [amount, product], (err, updateResult) => {
          if (err) {
            console.error('Error updating stock quantity:', err);
            return res.status(500).json({ error: 'Error updating stock quantity' });
          }
  
          res.json({
            id: exitResult.insertId,
            product,
            amount,
            observation,
            exitPrice,
            inserted_by,
            newStockQuantity: newQuantity
          });
        });
      });
    });
  });
  
  app.put('/exit/:id', eAdmin, (req, res) => {
    const id = req.params.id;
    const { product, observation, amount, exitPrice, inserted_by, type } = req.body;
    const getExitSql = 'SELECT * FROM exits WHERE id = ?';
    const updateExitSql = 'UPDATE exits SET product = ?, observation = ?, amount = ?, exit_price = ?, inserted_by = ?, type = ? WHERE id = ?';
    const getStockSql = 'SELECT quantity FROM stock WHERE product = ?';
    const updateStockSql = 'UPDATE stock SET quantity = ? WHERE product = ?';
  
    connection.beginTransaction(err => {
      if (err) {
        console.error('Error starting transaction:', err);
        return res.status(500).json({ error: 'Error starting transaction' });
      }
  
      // 1. Buscar a saída que será atualizada
      connection.query(getExitSql, [id], (err, exitResult) => {
        if (err) {
          console.error('Error getting exit:', err);
          connection.rollback(() => {
            res.status(500).json({ error: 'Error getting exit' });
          });
          return;
        }
  
        const oldAmount = exitResult[0].amount;
        const product = exitResult[0].product;
  
        // 2. Atualizar saída
        connection.query(updateExitSql, [product, observation, amount, exitPrice, inserted_by, type, id], (err, updateResult) => {
          if (err) {
            console.error('Error updating exit:', err);
            connection.rollback(() => {
              res.status(500).json({ error: 'Error updating exit' });
            });
            return;
          }
  
          // 3. Calcular a diferença entre a quantidade antiga e a nova quantidade
          const diff = amount - oldAmount;
  
          // 4. Atualizar quantidade em stock
          connection.query(getStockSql, [product], (err, stockResult) => {
            if (err) {
              console.error('Error getting stock quantity:', err);
              connection.rollback(() => {
                res.status(500).json({ error: 'Error getting stock quantity' });
              });
              return;
            }
  
            const currentQuantity = stockResult[0].quantity || 0;
            const newQuantity = Math.max(0, currentQuantity - diff);
  
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
  
                res.send(`Item with ID ${id} has been updated`);
              });
            });
          });
        });
      });
    });
  });
  
}
