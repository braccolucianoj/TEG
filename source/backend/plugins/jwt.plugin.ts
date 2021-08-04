import * as _ from 'lodash';
import * as config from 'config';
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import { MediaTypes, ICookieResult } from '../constants';
import { IAuthenticationService } from '../services/authentication';
import { IConfig } from '../config/types.config';

interface Options {
  authenticationService: IAuthenticationService;
}

const pluginFunction = (fastify: FastifyInstance, { authenticationService }: Options, next: () => void) => {
  fastify.decorateRequest('sign', function sign(userData) {
    return authenticationService.sign(userData);
  });

  fastify.decorateRequest('address', (config as IConfig).server.address);

  fastify.decorateRequest(
    'createAuthenticationCookie',
    function (cookieName: string, token: string, expiration: Date, path: string = '/'): ICookieResult {
      const typedConfig = config as IConfig;
      return {
        HeaderName: cookieName,
        HeaderValue: `${MediaTypes.BEARER} ${token}`,
        CookieBody: {
          domain: typedConfig.server.address,
          path: `${typedConfig.server.appName}${path}`,
          expires: expiration,
          httpOnly: true,
          secure: typedConfig.server.isHTTPS,
        },
      };
    }
  );

  next();
};

export const AUTHENTICATION_PLUGIN_NAME = 'fastify-authentication';

export const JWTPlugin = fastifyPlugin(pluginFunction, {
  fastify: '3.x',
  name: AUTHENTICATION_PLUGIN_NAME,
});
