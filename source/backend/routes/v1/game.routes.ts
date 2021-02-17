import { CustomRouteHandler } from '../../constants';
import { RolesNames } from '../../services/authorization';

export const createGame: CustomRouteHandler = async (request, response) => {};

export default {
  signup: {
    method: 'post',
    path: '/createGame',
    handler: createGame,
    needsAuthentication: true,
    authorizedRoles: [RolesNames.player],
  },
};
