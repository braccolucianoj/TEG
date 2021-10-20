const serverURI = process.env.SERVER_URI;

module.exports = {
  production: false,
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
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  webSocketServer: {
    cors: {
      origin: [serverURI, 'http://localhost.com:3000', '*'],
    },
  },
  jwt: {
    expiresIn: 3600 * 1000 * 1000,
    privateKeyPath: 'secrets/authentication/teg.com.key',
    publicKeyPath: 'secrets/authentication/teg.com.pub.key',
    passprhase: process.env.JWT_PASSPHRASE,
    passprhase: process.env.JWT_EXPIRATION,
  },
  server: {
    address: serverURI,
    appName: '',
    isHTTPS: false,
    port: 4000,
    hostname: '0.0.0.0',
  },
  cors: {
    addresses: [serverURI, 'http://localhost.com:3000', '*'],
    methods: ['PUT', 'POST', 'GET', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  },
  logger: {
    prettyPrint: true,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    senderEmail: process.env.SENDGRID_SENDER,
    verificationEmailTemplateID: 'd-c9c2d208484b47e6a85414314a415dff',
    sandboxMode: true,
  },
  registration: {
    needsVerification: false,
  },
};
