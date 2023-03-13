const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'controleestoque2'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

app.use(cors());
app.use(express.json());

app.get('/items', (req, res) => {
  const sql = 'SELECT * FROM items';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Error querying database' });
    }
    res.json(results);
  });
});
app.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM items WHERE id = ?`;

  connection.query(sql, [id], (error, results, fields) => {
    if (error) throw error;
    res.send(`Item with ID ${id} has been deleted`);
  });
});

app.post('/items', (req, res) => {
  const { name, description } = req.body;
  const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
  connection.query(sql, [name, description], (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      return res.status(500).json({ error: 'Error inserting into database' });
    }
    res.json({ id: result.insertId, name, description });
  });
});
app.put('/items/:id', (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  const sql = `UPDATE items SET name = ?, description = ? WHERE id = ?`;

  connection.query(sql, [name, description, id], (error, results, fields) => {
    if (error) throw error;
    res.send(`Item with ID ${id} has been updated`);
  });
});
// Define other CRUD operations here (PUT, DELETE)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
