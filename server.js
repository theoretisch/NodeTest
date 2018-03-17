const fs = require('fs');
const path = require('path');
const loggerModule = require('./modules/logger');
const express = require('express');
const Sequelize = require('sequelize');

let Config = {
  logger: {
    logLevel: "debug",
    logPath: "./logs/"
  },
  express: {
    port: 3000
  },
  db: {
    username: "website",
    password: "website",
    host: "127.0.0.1",
    port: 5432,
    database: "website",
    dialect: "postgres",
    connectRetryTimeout: 5000,
    connectRetries: 3
  }
};

try {
  ConfigFile = fs.readFileSync('./config.json', {
    'encoding': 'UTF-8'
  });
  ConfigJson = JSON.parse(ConfigFile);
  console.log("./config.json loaded");

  Config.logger.logLevel = ConfigJson.logger.logLevel;
  Config.logger.logPath = ConfigJson.logger.logPath;

  Config.express.port = ConfigJson.express.port;

  Config.db.database = ConfigJson.db.database;
  Config.db.username = ConfigJson.db.username;
  Config.db.password = ConfigJson.db.password;
  Config.db.host = ConfigJson.db.host;
  Config.db.port = ConfigJson.db.port;
  Config.db.dialect = ConfigJson.db.dialect;
  Config.db.connectRetryTimeout = ConfigJson.db.connectRetryTimeout;
  Config.db.connectRetries = ConfigJson.db.connectRetries;
} catch (e) {
  console.log("./config.json cannot be loaded or parsing failure :", e);
}

const app = {
  log: loggerModule(Config.logger.logLevel, Config.logger.logPath),
  express: express(),
  db: new Sequelize(Config.db.database, Config.db.username, Config.db.password, {
    host: Config.db.host,
    port: Config.db.dbport,
    dialect: Config.db.dialect
  })
}

let connectCounter = 1;
const connectDatabase = ((app) => {
  app.db.authenticate()
    .then(() => {
      app.log.info('Connection has been established successfully.');
    })
    .catch(err => {
      app.log.error('(' + connectCounter + ') Unable to connect to the database:', err);
      if (connectCounter < connectRetries) {
        connectCounter++;
        setTimeout(() => {
          connectDatabase();
        }, connectRetryTimeout);
      } else {
        app.log.error('Cannot establish database connection! End process...');
        process.exit();
      }
    });

})(app);

require('./routes/User')(app);

app.express.get('/install', (req, res) => {
  require('./models/User')().install(app);
  res.sendStatus(200);
});

app.express.get('/admin/login', (req, res) => {

});

app.express.get('/', (req, res) => {
  res.send('Hallo');
});

app.express.listen(Config.express.port, (a) => {
  app.log.info("Server started", {
    a
  });
})
