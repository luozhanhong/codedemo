const mongooseMap = new Map();

if (mongooseMap.size === 0 && G.config.mongoose) {
  const logger = getLogger(__filename);
  const mongoose = require('mongoose');
  mongoose.set('debug', G.config.mongoose.debug);

  const createConnection = (mongodb) => {
    const url = `mongodb://${mongodb.user}:${mongodb.password}@${mongodb.host}:27017/${mongodb.database}`;
    const _url = `mongodb://${mongodb.host}:27017/${mongodb.database}`;

    const db = mongoose.createConnection(url, mongodb.options);

    db.on('error', (err) => {
      logger.error(err);
      process.exit(1);
    });

    db.on('disconnected', () => {
      logger.info(`Disconnected ${_url}`);
    });

    db.on('connected', () => {
      logger.info(`Connected ${_url}`);
    });

    db.on('reconnected', () => {
      logger.info(`Reconnected ${_url}`);
    });
  };

  Array.isArray(G.config.mongoose) ? G.config.mongoose.filter((mongodb) => {
    mongooseMap.set(mongodb.database, createConnection(mongodb));
  }) : mongooseMap.set(G.config.mongoose.database, createConnection(G.config.mongoose));
}
module.exports = mongooseMap;