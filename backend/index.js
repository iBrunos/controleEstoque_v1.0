const express = require('express');
const cors = require('cors');
const session = require('express-session');
const Tabelas = require("./sql/table");
const connection = require("./connection/connection");
const consign = require('consign');

const app = express();
const PORT = process.env.PORT || 3000;

//Conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

consign()
  .include('routes')
  .include('config.js')
  .into(app);
  
// Criando as tabelas do banco
Tabelas.init(connection);
console.log("Tables created successfully!");

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Marque como true se estiver usando HTTPS
}));



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
