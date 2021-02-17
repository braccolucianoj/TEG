import { IExtendedFastifyInstance } from '../constants';
import AuthenticationRoutes from './v1/authentication.routes';
import AccountRoutes from './v1/account.routes';
import GameRoutes from './v1/game.routes';

const version1Routes = [
  AuthenticationRoutes,
  AccountRoutes,
  // GameRoutes
]
  .map((routeObject) => Object.values(routeObject))
  .reduce((total, objectRoute) => total.concat(objectRoute), []);

const registerRoutes = (fastify: IExtendedFastifyInstance, routes, hooks = {}) => {
  const opts = { hooks, routes };
  const routesToRegister = function register(instance, options, next) {
    Object.keys(options.hooks).forEach((hookName) => {
      options.hooks[hookName].map((hookFunc) => instance.addHook(hookName, hookFunc.bind(instance)));
    });
    options.routes.map((route) => instance[route.method](route.path, route.handler));
    next();
  };
  fastify.register(routesToRegister, { ...opts, prefix: '/v1' });
};

const exportModelRoutes = (fastify: IExtendedFastifyInstance, routes) => {
  const authRoutes = routes.filter((x) => x.needsAuthentication);
  const nonAuthRoutes = routes.filter((x) => !x.needsAuthentication);
  // const authDefinition = fastify.authDefinition(rolesNames, authRoutes);
  registerRoutes(fastify, authRoutes, {
    preHandler: [
      fastify.authenticate,
      // fastify.authorize(authDefinition)
    ],
  });
  registerRoutes(fastify, nonAuthRoutes, {});
};

export default (fastifyInstance: IExtendedFastifyInstance) => exportModelRoutes(fastifyInstance, version1Routes);
