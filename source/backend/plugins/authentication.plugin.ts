import * as _ from 'lodash';
import { FastifyInstance } from 'fastify';

import { MediaTypes } from '../constants';
import { IAuthenticationService } from '../services/authentication';

interface Options {
  authenticationService: IAuthenticationService;
}

const unscopedPluginFunction = (fastify: FastifyInstance, { authenticationService }: Options) => {
  fastify.decorate('authenticate', function authenticate(request, reply) {
    try {
      const authentication = authenticationService.authenticateCookie(request.cookies);
      Object.assign(request, { authentication });
    } catch (error) {
      reply
        .code(401)
        .header(MediaTypes.CONTENT_TYPE, MediaTypes.v1.JSON)
        .send(reply.serialize({ error: error.message }));
    }
  });
};

export const AuthenticationPlugin = unscopedPluginFunction;
