import * as _ from 'lodash';
import { verify, sign, TokenExpiredError, JsonWebTokenError, SignOptions } from 'jsonwebtoken';

import { ISignedData, MediaTypes } from '../../constants';

import {
  privateKey,
  publicKey,
  passphrase,
  expiresIn,
  AuthenticationError,
  TokenError,
  ALGORITHM,
  validateToken,
  ISignUserInformation,
  validateTokenData,
  IAuthenticatedUserData,
} from './helpers.authentication.service';

export const decodeWithPublicKey = (token: string) => {
  try {
    return verify(token, publicKey, { algorithms: [ALGORITHM] });
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new TokenError('Token expired');
    }
    if (err instanceof JsonWebTokenError) {
      throw new TokenError(`Token is invalid: ${err.message}`);
    }
  }
};

export const signWithPrivateKey = (object: any): ISignedData => {
  const options = { algorithm: ALGORITHM } as SignOptions;
  const exp = Math.floor(Date.now() / 1000) + expiresIn;
  const token = sign({ exp, ...object }, { key: privateKey, passphrase: passphrase }, { ...options });
  return { token, expiresAt: exp };
};

export const authenticateUserToken = (decodeFunction: any, encodedToken: string): IAuthenticatedUserData => {
  const object = decodeFunction(encodedToken);
  try {
    validateToken(object);
  } catch (error) {
    throw new AuthenticationError('Token tampered');
  }
  const { i, e, r, iat, exp } = object;
  return { email: e, id: i, roleName: r, expiresAt: exp, issuedAt: iat };
};

export const signUserInfo = (encodeFunction: any, object: ISignUserInformation): ISignedData => {
  try {
    validateTokenData(object);
  } catch (error) {
    throw new AuthenticationError('Invalid token data');
  }
  return encodeFunction({
    i: object.id,
    e: object.email,
    r: object.roleName,
  });
};

export const authenticateCookie = (decodeWithPublicKey: any, cookies: string): IAuthenticatedUserData => {
  const tokenCookie = _.get(cookies, 'MediaTypes.AUTHORIZATION', undefined);
  if (!tokenCookie) {
    throw new AuthenticationError('No cookie found.');
  }
  const [bearer, token, ...rest] = tokenCookie.split(' ');
  if (rest.length > 0 || !bearer || !token || bearer !== MediaTypes.BEARER) {
    throw new Error('Invalid cookie.');
  }
  return authenticateUserToken(decodeWithPublicKey, token);
};

export default {
  authenticateCookie: (cookies: string) => authenticateCookie(decodeWithPublicKey, cookies),
  authenticate: (encodedToken: string) => authenticateUserToken(decodeWithPublicKey, encodedToken),
  sign: (object: ISignUserInformation) => signUserInfo(signWithPrivateKey, object),
};
