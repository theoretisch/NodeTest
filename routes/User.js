const express = require('express');
const router = express.Router();

module.exports = (app) => {
  app.express.get('/user/:id?', function(req, res) {
    console.log('get user', req.params);
    res.send('get user');
  });

  app.express.post('/user', function(req, res) {
    console.log('post user', req.params);
    res.send('post user');
  });

  app.express.put('/user/:id', function(req, res) {
    console.log('put user', req.params);
    res.send('put user');
  });
};
