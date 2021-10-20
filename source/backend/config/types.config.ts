import { CorsOptions } from 'cors';
import { FastifyLoggerOptions } from 'fastify';

export interface IDatabaseConfig {
  autoConnect: boolean;
  logging: boolean | any;
  dialect: string;
  host: string;
  port: number;
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
  username: string;
  password: string;
  database: string;
}

export interface WebSocketServerConfig {
  cors: CorsOptions;
}

export interface IJWTConfig {
  expiresIn: number;
  passphrase: string;
  privateKeyPath: string;
  publicKeyPath: string;
}

export interface IServerConfig {
  address: string;
  appName: string;
  isHTTPS: boolean;
  port: number;
  hostname: string;
}

export interface ICORSConfig {
  addresses: string[];
  methods: string[];
}

export interface ISendgridConfig {
  apiKey: string;
  senderEmail: string;
  verificationEmailTemplateID: string;
  sandboxMode: boolean;
}

export interface IRegistrationConfig {
  needsVerification: boolean;
}

export interface ILoggerConfig extends FastifyLoggerOptions {
  logsPath: string;
}

export interface IConfig {
  production: boolean;
  database: IDatabaseConfig;
  webSocketServer: WebSocketServerConfig;
  jwt: IJWTConfig;
  server: IServerConfig;
  cors: ICORSConfig;
  logger: ILoggerConfig;
  sendgrid: ISendgridConfig;
  registration: IRegistrationConfig;
}
