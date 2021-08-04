import { ICustomRoute, CustomRouteHandler, MediaTypes } from '../../constants';
import { RolesNames } from '../../services/authorization';

export const signup: CustomRouteHandler = async (request, response) => {};
export const login: CustomRouteHandler = async (request, response) => {
  const { createAuthenticationCookie, sign } = request;
  const { token, expiresAt } = sign({ id: 1, email: 'testing@gmail.com', roleName: RolesNames.player });
  const expiresAtDate = new Date(expiresAt * 1000);
  console.log(token);

  const refreshExpiresAtDate = new Date((expiresAt + 10) * 1000);
  const refreshToken = 'refreshToken';

  const responseBody = response.serialize({
    [MediaTypes.AUTHORIZATION_EXPIRATION]: expiresAtDate,
    [MediaTypes.REFRESH_TOKEN_EXPIRATION]: refreshExpiresAtDate,
  });
  const cookie = createAuthenticationCookie(MediaTypes.AUTHORIZATION, token, expiresAtDate);
  const refreshCookie = createAuthenticationCookie(
    MediaTypes.REFRESH_TOKEN,
    refreshToken,
    refreshExpiresAtDate,
    '/token-refresh'
  );
  response
    .setCookie(cookie.HeaderName, cookie.HeaderValue, cookie.CookieBody)
    .setCookie(refreshCookie.HeaderName, refreshCookie.HeaderValue, refreshCookie.CookieBody)
    .status(200)
    .header(MediaTypes.CONTENT_TYPE, MediaTypes.v1.JSON)
    .send(responseBody);
};
export const logout: CustomRouteHandler = async (request, response) => {};

export const changePassword: CustomRouteHandler = async (request, response) => {};
export const forgotPassword: CustomRouteHandler = async (request, response) => {};
export const recoverAccount: CustomRouteHandler = async (request, response) => {};
export const restorePassword: CustomRouteHandler = async (request, response) => {};
export const tokenRefresh: CustomRouteHandler = async (request, response) => {};

export default {
  // signup: {
  //   method: 'post',
  //   path: '/signup',
  //   handler: signup,
  //   authenticated: false,
  // },
  login: {
    method: 'post',
    path: '/login',
    handler: login,
    authenticated: false,
  },
  // logout: {
  //   method: 'post',
  //   path: '/logout',
  //   handler: logout,
  //   authenticated: true,
  //   authorizedRoles: [RolesNames.admin, RolesNames.player, RolesNames.service],
  // },
  // tokenRefresh: {
  //   method: 'post',
  //   path: '/token-refresh',
  //   handler: tokenRefresh,
  //   authenticated: false,
  //   authorizedRoles: [RolesNames.admin, RolesNames.player, RolesNames.service],
  // },
  // recoverAccount: {
  //   method: 'post',
  //   path: '/recoverAccount',
  //   handler: recoverAccount,
  //   authenticated: false,
  //   authorizedRoles: [],
  // },
  // restorePassword: {
  //   method: 'patch',
  //   path: '/restorePassword',
  //   handler: restorePassword,
  //   authenticated: false,
  //   authorizedRoles: [],
  // },
} as { [key: string]: ICustomRoute };
