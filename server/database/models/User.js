const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true
    },
    firstName: {
      name: 'Vorname',
      allowNull: true,
      defaultValue: null,
      type: Sequelize.STRING
    },
    lastName: {
      name: 'Nachname',
      allowNull: true,
      defaultValue: null,
      type: Sequelize.STRING
    },
    loginName: {
      name: 'Login-Name',
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
      min: {
        args: 4,
        msg: 'Der Login-Name muss aus mindestens vier Zeichen bestehen'
      }
    },
    password: {
      name: 'Passwort',
      type: Sequelize.STRING,
      validate: {
        is: {
          args: [
            "(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]", "i"
          ],
          msg: 'Das Passwort muss Groß- und Kleinbuchstaben sowie Sonderzeichen beinhalten'
        },
        min: {
          args: 8,
          msg: 'Das Passwort muss aus mindestens acht Zeichen bestehen'
        }
      }
    }
  });

  User.associate = function(models) {
    //models.User.hasMany(models.Task);
  };

  return User;
}
