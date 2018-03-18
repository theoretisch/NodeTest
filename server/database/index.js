const fs = require('fs');
const path = require('path');
const modulePath  = path.resolve(__dirname, 'models');
const Sequelize = require('sequelize');
const db = {
  models: {}
};

let config = {
  username: "website",
  password: "website",
  host: "127.0.0.1",
  port: 5432,
  database: "website",
  dialect: "postgres",
  connectRetryTimeout: 5000,
  connectRetries: 3
};

try {
  const configFile = fs.readFileSync(path.resolve(__dirname, '../config/database.json'), {'encoding': 'UTF-8'});
  const configJson = JSON.parse(configFile);
  console.log("database config loaded");

  config.database = configJson.database;
  config.username = configJson.username;
  config.password = configJson.password;
  config.host = configJson.host;
  config.port = configJson.port;
  config.dialect = configJson.dialect;
  config.connectRetryTimeout = configJson.connectRetryTimeout;
  config.connectRetries = configJson.connectRetries;
} catch (e) {
  console.log("config cannot be loaded or parsing failure :", e);
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.dbport,
  dialect: config.dialect
})

fs.readdirSync(modulePath).filter(file => {
  return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
}).forEach(file => {
  var model = sequelize.import(path.join(modulePath, file));
  db.models[model.name] = model;
});

Object.keys(db.models).forEach(modelName => {
  if (db.models[modelName].associate) {
    db.models[modelName].associate(db);
  }
});
sequelize.sync({sync: true})
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
