const connection = require("../connection/connection");

module.exports = (app) => {
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
}