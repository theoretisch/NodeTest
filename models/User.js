const Sequelize = require('sequelize');

module.exports = () => {
  const UserObject = {
    name: 'user',
    fields: {
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      loginName: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          is: ["(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]", "i"],
          min: 8
        }
      }
    }
  };

  return {
    install: (app) => {
      const definedUser = app.db.define(UserObject.name, UserObject.fields);
      definedUser.sync({
        force: true
      });
    }
  }
}
