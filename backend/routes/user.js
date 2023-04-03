module.exports = (app) => {
  const bcrypt = require('bcrypt');
  const connection = require("../connection/connection");

    app.get('/user', (req, res) => {
        const sql = 'SELECT * FROM users';
        connection.query(sql, (err, results) => {
          if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Error querying database' });
          }
          res.json(results);
        });
      });
      app.delete('/user/:id', (req, res) => {
        const id = req.params.id;
        const sql = `DELETE FROM users WHERE id = ?`;
      
        connection.query(sql, [id], (error, results, fields) => {
          if (error) throw error;
          res.send(`Item with ID ${id} has been deleted`);
        });
      });
      
      app.post('/user', async (req, res) => {
        const { user, password, level, email, phone } = req.body;
        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 8);
        const sql = 'INSERT INTO users (user, password, level, email, phone) VALUES (?, ?, ?, ?, ?)';
        connection.query(sql, [user, hashedPassword, level, email, phone], (err, result) => {
          if (err) {
            console.error('Error inserting into database:', err);
            return res.status(500).json({ error: 'Error inserting into database' });
          }
          res.json({ id: result.insertId, user, password, level, email, phone });
        });
      });


      app.put('/user/:id', (req, res) => {
        const id = req.params.id;
        const { user, password, level, email, phone} = req.body;
        const sql = `UPDATE users SET user = ?, password = ?, level = ?, email = ?, phone = ? WHERE id = ?`;
      
        connection.query(sql, [user, password, level, email, phone, id], (error, results, fields) => {
          if (error) throw error;
          res.send(`Item with ID ${id} has been updated`);
        });
      });
}