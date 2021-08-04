import { CustomRouteHandler } from '../../constants';
import { RolesNames } from '../../services/authorization';

export const signup: CustomRouteHandler = async (request, response) => {
  console.log(request.body);
  response.status(201).send();
};
export const getUsers: CustomRouteHandler = async (request, response) => {};
export const getUser: CustomRouteHandler = async (request, response) => {
  // get own user info (extract id from cookie)
  // get other user info (extract id from param)
};

export const getProfileInfo: CustomRouteHandler = async (request, response) => {};
export const getUserStats: CustomRouteHandler = async (request, response) => {};
export const updatePassword: CustomRouteHandler = async (request, response) => {};
export const changeProfile: CustomRouteHandler = async (request, response) => {};

export default {
  signup: {
    method: 'post',
    path: '/signup',
    handler: signup,
    needsAuthentication: false,
  },
  getUsers: {
    method: 'get',
    path: '/users',
    handler: getUsers,
    needsAuthentication: true,
    authorizedRoles: [RolesNames.player],
  },
  getProfile: {
    method: 'get',
    path: '/user',
    handler: getUser,
    needsAuthentication: true,
    authorizedRoles: [RolesNames.admin, RolesNames.player],
  },
  getUserById: {
    method: 'get',
    path: '/users/:userId',
    handler: getUser,
    needsAuthentication: true,
    authorizedRoles: [RolesNames.admin],
  },

  changeProfile: {
    method: 'patch',
    path: '/profile',
    handler: changeProfile,
    needsAuthentication: true,
    authorizedRoles: [RolesNames.admin, RolesNames.player],
  },
  updatePassword: {
    method: 'patch',
    path: '/password',
    handler: updatePassword,
    authenticated: true,
    authorizedRoles: [RolesNames.admin, RolesNames.player],
  },
};
