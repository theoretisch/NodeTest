module.exports = (Server) => {
  const User = Server.db.models.user;
  const Op = Server.db.Sequelize.Op;

  Server.express.get('/user(/:loginName)?', function(req, res) {
    const filter = req.params.loginName;
    let where = {};
    if (filter !== undefined) {
      where = {
        loginName: filter
      }
    }

    User.findAndCountAll({where}).then((result) => {
      if (result.count > 0) {
        res.status(200).send(result);
      } else {
        res.sendStatus(404);
      }
    }).catch((err) => {
      Server.log.error(err);
      res.sendStatus(404);
    });
  });

  Server.express.post('/user', function(req, res) {
    const buildUser = User.build({firstName: req.body.firstName, lastName: req.body.lastName, loginName: req.body.loginName, password: req.body.password});
    buildUser.validate().then((validatedUser) => {
      validatedUser.save().then((savedUser) => {
        res.status(201).send(savedUser.toJSON());
      }).catch((error) => {
        console.log(error.message);
        res.sendStatus(500);
      });
    }).catch((error) => {
      let messages = [];
      Server.log.error(error);
      error.errors.forEach((error) => {
        messages[error.instance.rawAttributes[error.path].name] = error.message;
      });
      res.status(400).send(messages);
    });
  });

  Server.express.patch('/user/:id', function(req, res) {
    Server.log.info('put user', req.params);
    res.send('put user');
  });

  Server.express.delete('/user/:id', function(req, res) {
    Server.log.info('delete user', req.params);
    res.send('put user');
  });
};
