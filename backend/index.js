const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const connection = require("./connection/connection");
const Tabelas = require("./sql/table");

const app = express();
const PORT = process.env.PORT || 3000;

Tabelas.init(connection);
console.log("tables created successfully!");

//const connection = mysql.createConnection({
  //host: 'localhost',
  //user: 'root',
  //password: '1234',
  //database: 'controleestoque2'
//});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

app.use(cors());
app.use(express.json());

app.get('/product', (req, res) => {
  const sql = 'SELECT * FROM product';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Error querying database' });
    }
    res.json(results);
  });
});
app.delete('/product/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM product WHERE id = ?`;

  connection.query(sql, [id], (error, results, fields) => {
    if (error) throw error;
    res.send(`Item with ID ${id} has been deleted`);
  });
});

app.post('/product', (req, res) => {
  const { product, price, brand, description, amount } = req.body;
  const sql = 'INSERT INTO product (product, price, brand, description, amount) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [product, price, brand, description, amount], (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      return res.status(500).json({ error: 'Error inserting into database' });
    }
    res.json({ id: result.insertId, product, price, brand, description, amount });
  });
});
app.put('/product/:id', (req, res) => {
  const id = req.params.id;
  const { product, price, brand, description, amount } = req.body;
  const sql = `UPDATE product SET product = ?, price = ?, brand = ?, description = ?, amount = ? WHERE id = ?`;

  connection.query(sql, [product, price, brand, description, amount, id], (error, results, fields) => {
    if (error) throw error;
    res.send(`Item with ID ${id} has been updated`);
  });
});
// Define other CRUD operations here (PUT, DELETE)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
