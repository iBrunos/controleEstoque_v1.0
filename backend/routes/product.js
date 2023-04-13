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
  
      // Exclui o produto da tabela stock também
      const sqlDeleteStock = `DELETE FROM stock WHERE product_id = ?`;
      connection.query(sqlDeleteStock, [id], (error, results, fields) => {
        if (error) throw error;
        res.send(`Item with ID ${id} has been deleted`);
      });
    });
  });
  

  app.post('/product', eAdmin, (req, res) => {
    const { product, price, brand, description, inserted_by } = req.body;
    const productSql = 'INSERT INTO products (product, price, brand, description, inserted_by) VALUES (?, ?, ?, ?, ?)';
    const stockSql = 'INSERT INTO stock (product_id, product, quantity) VALUES (?, ?, ?)';
  
    connection.query(productSql, [product, price, brand, description, inserted_by], (err, result) => {
      if (err) {
        console.error('Error inserting into database:', err);
        return res.status(500).json({ error: 'Error inserting into database' });
      }
  
      const productId = result.insertId;
      const productName = product;
      const initialQuantity = 0; // or any other default value you want
  
      connection.query(stockSql, [productId, productName, initialQuantity], (err, result) => {
        if (err) {
          console.error('Error inserting into stock table:', err);
          return res.status(500).json({ error: 'Error inserting into stock table' });
        }
  
        res.json({ id: productId, product, price, brand, description, inserted_by });
      });
    });
  });
  
  
  
  app.put('/product/:id', eAdmin, (req, res) => {
    const id = req.params.id;
    const { product, price, brand, description, inserted_by } = req.body;
    const updateProductSql = `UPDATE products SET product = ?, price = ?, brand = ?, description = ?, inserted_by = ? WHERE id = ?`;
    const updateStockSql = `UPDATE stock SET product = ? WHERE product_id = ?`;
  
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error beginning transaction:', err);
        return res.status(500).json({ error: 'Error beginning transaction' });
      }
  
      connection.query(updateProductSql, [product, price, brand, description, inserted_by, id], (err, result) => {
        if (err) {
          console.error('Error updating product:', err);
          return connection.rollback(() => {
            res.status(500).json({ error: 'Error updating product' });
          });
        }
  
        connection.query(updateStockSql, [product, id], (err, result) => {
          if (err) {
            console.error('Error updating stock:', err);
            return connection.rollback(() => {
              res.status(500).json({ error: 'Error updating stock' });
            });
          }
  
          connection.commit((err) => {
            if (err) {
              console.error('Error committing transaction:', err);
              return connection.rollback(() => {
                res.status(500).json({ error: 'Error committing transaction' });
              });
            }
  
            res.send(`Item with ID ${id} has been updated`);
          });
        });
      });
    });
  });
  
}