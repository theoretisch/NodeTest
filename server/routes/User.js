module.exports = (Server) => {
  const User = Server.db.models.user;
  Server.express.get('/user/:id?', function(req, res) {
    let where = {};
    if (req.params.id !== undefined) {
      where = {
        id: req.params.id
      }
    }

    User.findAndCountAll({where}).then((result) => {
      Server.log.info('get user', result);
      if (result.count > 0) {
        res.send('get user');
      } else {
        res.sendStatus(404);
      }
    }).catch((err) => {
      Server.log.error(err);
      res.sendStatus(404);
    });
  });

  Server.express.post('/user', function(req, res) {
    User.create({firstName: req.params.firstName, lastName: req.params.lastName, loginName: req.params.loginName, password: req.params.password});

    Server.log.info('post user', req.params);
    res.send('post user');
  });

  Server.express.put('/user/:id', function(req, res) {
    Server.log.info('put user', req.params);
    res.send('put user');
  });

  Server.express.delete('/user/:id', function(req, res) {
    Server.log.info('delete user', req.params);
    res.send('put user');
  });
};
