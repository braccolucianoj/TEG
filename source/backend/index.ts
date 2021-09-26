require('dotenv').config({ path: `${__dirname}/env/${process.env.NODE_ENV}.env` });

import * as config from 'config';
import Fastify, { FastifyInstance, FastifyLoggerOptions } from 'fastify';

import { initModels } from './models';
import { IConfig } from './config/types.config';
import SequelizeInstance from './services/database';
import { createSocketIOServer } from './services/socket';
import authenticationService from './services/authentication';
import RegisterRoutes from './routes';
import {
  ContextPlugin,
  IFastifyContext,
  ErrorPlugin,
  AuthenticationPlugin,
  CookiePlugin,
  CORSPlugin,
  JWTPlugin,
} from './plugins';

const {
  server: { port, hostname },
  logger: { logsPath, ...restLoggerProps },
  production,
} = config as IConfig;

const main = () => {
  const app: FastifyInstance = Fastify({
    ajv: {
      customOptions: {
        jsonPointers: true,
        removeAdditional: true,
        useDefaults: true,
        coerceTypes: true,
        allErrors: true,
        nullable: true,
      },
      // plugins: [ajvErrors],
    },
    logger: {
      level: 'info',
      file: production ? logsPath : undefined,
      redact: ['req.headers.cookies'],
      prettyPrint: true,
      ...restLoggerProps,
    } as FastifyLoggerOptions,
    bodyLimit: 1024 * 1024, // 1Mb
  });
  // Socket IO
  const io = createSocketIOServer(app.server);
  // Fastify Context
  const context: IFastifyContext = {
    databaseInstance: SequelizeInstance,
    models: initModels(SequelizeInstance),
    socketIOInstance: io,
  };
  // Setting plugins
  app.register(ErrorPlugin);
  app.register(CookiePlugin);
  app.register(ContextPlugin, { context });
  app.register(JWTPlugin, { authenticationService });
  app.register(CORSPlugin.plugin, CORSPlugin.config);
  // Unscoped plugins
  AuthenticationPlugin(app, { authenticationService });
  // Routes
  RegisterRoutes(app as any);
  // Finale
  app.listen(port, hostname, (err, address) => {
    if (err) {
      console.log('ERROR', err);
    } else {
      console.log(`Listening on address ${address}`);
    }
  });
};

main();
