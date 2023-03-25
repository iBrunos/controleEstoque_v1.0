const express = require('express');
const cors = require('cors');
module.exports = function(app) {
    app.use(express.json());
    app.use(cors({
      origin: 'http://localhost:3001'
    }));
  }
  