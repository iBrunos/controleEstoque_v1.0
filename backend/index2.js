const express = require('express');
const cors = require('cors');
const connection = require("./connection/connection");
const session = require('express-session');
const Tabelas = require("./sql/table");

const app = express();
const PORT = process.env.PORT || 3000;

Tabelas.init(connection);
console.log("tables created successfully!");

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Marque como true se estiver usando HTTPS
}));

app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(express.json());
// CRUD DO PRODUCT
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

// CRUD DO USER

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

app.post('/user', (req, res) => {
  const { user, password, level } = req.body;
  const sql = 'INSERT INTO users (user, password, level) VALUES (?, ?, ?)';
  connection.query(sql, [user, password, level], (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      return res.status(500).json({ error: 'Error inserting into database' });
    }
    res.json({ id: result.insertId, user, password, level });
  });
});
app.put('/user/:id', (req, res) => {
  const id = req.params.id;
  const { user, password, level } = req.body;
  const sql = `UPDATE users SET user = ?, password = ?, level = ? WHERE id = ?`;

  connection.query(sql, [user, password, level, id], (error, results, fields) => {
    if (error) throw error;
    res.send(`Item with ID ${id} has been updated`);
  });
});

//CRUD LOGIN

// Verifica se o usuário e a senha são válidos
app.post('/login', (req, res) => {
  const { user, password } = req.body;

  // Verifica se o usuário e a senha foram informados
  if (!user || !password) {
    return res.status(400).json({
      error: true,
      message: 'Usuário e senha são obrigatórios'
    });
  }

  const query = 'SELECT id, user, password FROM users WHERE user = ? AND password = ?';

  connection.query(query, [user, password], (error, results) => {
    if (error) {
      console.error(error);
      return res.json({
        error: true,
        message: 'Erro ao buscar usuário/senha'
      });
    }

    if (results.length === 0) {
      return res.json({
        error: true,
        message: 'Usuário ou senha incorreto'
      });
    }

    const usuario = results[0];

    return res.json({
      error: false,
      message: 'Login realizado com sucesso',
      id: usuario.id
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
