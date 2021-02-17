import { Sequelize } from 'sequelize/types';
import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { Server } from 'socket.io';

import { Models } from '../models';

export interface IFastifyContext {
  models: Models;
  databaseInstance: Sequelize;
  socketIOInstance: Server;
}

const pluginFunction = (fastify: FastifyInstance, opts, next) => {
  const { context } = opts;
  fastify.decorateRequest('platformContext', context as IFastifyContext);
  next();
};

export const FASTIFY_CONTEXT_PLGUIN_NAME = 'fastify-context';

export const ContextPlugin = fastifyPlugin(pluginFunction, {
  fastify: '3.x',
  name: FASTIFY_CONTEXT_PLGUIN_NAME,
});
