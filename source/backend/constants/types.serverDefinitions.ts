import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Roles } from 'services/authorization';
import { IFastifyContext } from '../plugins';
import { IAuthenticatedUserData, ISignUserInformation } from '../services/authentication';

export interface ISignedData {
  token: string;
  expiresAt: number;
}

export interface ICookieResult {
  HeaderName: string;
  HeaderValue: string;
  CookieBody: {
    domain: string;
    path: string;
    expires: Date;
    httpOnly: boolean;
    secure: boolean;
  };
}

export interface IExtendedFastifyRequest extends FastifyRequest {
  address: string;
  jsonWebToken: string;
  platformContext: IFastifyContext;
  authentication: IAuthenticatedUserData;
  sign: (value: ISignUserInformation) => ISignedData;
  createAuthenticationCookie: (cookieName: string, token: string, expiration: Date, path?: string) => ICookieResult;
}

export type CustomRouteHandler = (request: IExtendedFastifyRequest, response: FastifyReply) => Promise<void>;

const AVAILABLE_METHODS = ['post', 'put', 'get', 'patch', 'delete', 'options', 'head', 'all'] as const;
type IRouteMethod = typeof AVAILABLE_METHODS[number];

export interface ICustomRoute {
  method: IRouteMethod;
  path: string;
  handler: CustomRouteHandler;
  authenticated: boolean;
  authorizedRoles?: Roles[];
}

export interface IExtendedFastifyInstance extends FastifyInstance {
  authenticate: CustomRouteHandler;
}
