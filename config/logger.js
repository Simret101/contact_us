const winston = require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "logs.log" })],
});

module.exports = logger;
