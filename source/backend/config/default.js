const { database, jwt } = require('./secrets/secrets.default');

module.exports = {
  production: false,
  database: {
    autoConnect: true,
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    ...database,
  },
  webSocketServer: {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost.com:3000', '*'],
    },
  },
  jwt: {
    expiresIn: 3600 * 1000 * 1000,
    ...jwt,
  },
  server: {
    address: 'localhost.com',
    appName: '',
    isHTTPS: false,
    port: 4000,
    hostname: '0.0.0.0',
  },
  cors: {
    addresses: ['http://localhost:3000', 'http://localhost.com:3000', '*'],
    methods: ['PUT', 'POST', 'GET', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  },
  logger: {
    prettyPrint: true,
  },
};
