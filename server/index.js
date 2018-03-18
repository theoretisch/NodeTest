console.log('starting server, loading modules');

const fs = require('fs');
const path = require('path');
const loggerModule = require('./modules/logger');
const express = require('express');
const Sequelize = require('sequelize');

console.log(' - modules finished');

let Server = {
  config: {
    logger: {
      logLevel: "debug",
      logPath: "./logs/"
    },
    express: {
      port: 3000
    }
  },
  log: undefined,
  express: undefined,
  db: undefined
}

Server.db = require('./database');
console.log(Server.db.model);

try {
  const configFile = fs.readFileSync(path.resolve(__dirname, 'config/logger.json'), {'encoding': 'UTF-8'});
  const configJson = JSON.parse(configFile);
  console.log("logger config loaded");

  Server.config.logger.logLevel = configJson.logLevel;
  Server.config.logger.logPath = configJson.logPath;
} catch (e) {
  console.log("config cannot be loaded or parsing failure :", e);
}

Server.log = loggerModule(Server.config.logger.logLevel, Server.config.logger.logPath);

try {
  const configFile = fs.readFileSync(path.resolve(__dirname, 'config/express.json'), {'encoding': 'UTF-8'});
  const configJson = JSON.parse(configFile);
  Server.log.info("express config loaded");

  Server.config.express.port = configJson.port;
} catch (e) {
  Server.log.error("config cannot be loaded or parsing failure :", e);
}

Server.express = express();

require('./routes')(Server);

Server.express.get('/install', (req, res) => {
  res.sendStatus(200);
});

Server.express.get('/admin/login', (req, res) => {});

Server.express.get('/', (req, res) => {
  res.send('Hallo');
});

Server.db.sequelize.sync().then(() => {
  Server.express.listen(Server.config.express.port, (a) => {
    Server.log.info("Server started", {port: Server.config.express.port});
  });
});
