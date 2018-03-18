const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true
      },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      loginName: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          is: [
            "(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]", "i"
          ],
          min: 8
        }
      }
    }
  );

  User.associate = function(models) {
    //models.User.hasMany(models.Task);
  };

  return User;
}
