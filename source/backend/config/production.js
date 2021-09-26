const serverURI = process.env.SERVER_URI;

module.exports = {
  production: true,
  webSocketServer: {
    cors: {
      origin: [serverURI],
    },
  },
  database: {
    autoConnect: true,
    dialect: 'postgres',
    logging: false,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.PORT,
    pool: {
      max: 10,
      min: 3,
      acquire: 15000,
      idle: 5000,
    },
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  cors: {
    addresses: [serverURI],
    methods: ['PUT', 'POST', 'GET', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  },
  jwt: {
    expiresIn: 3600,
    privateKeyPath: 'secrets/authentication/teg.com.key',
    publicKeyPath: 'secrets/authentication/teg.com.pub.key',
  },
  sendgrid: {
    sandboxMode: false,
  },
  logger: {
    logsPath: 'logs/log.txt',
  },
  registration: {
    needsVerification: false,
  },
};
