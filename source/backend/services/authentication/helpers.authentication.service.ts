import Ajv from 'ajv';
import * as config from 'config';
import { readFileSync } from 'fs';
import S from 'fluent-json-schema';
import addFormats from 'ajv-formats';

import { IConfig } from '../../config/types.config';
import { RolesNames } from '../authorization';
import { ISignedData } from '../../constants';

const {
  jwt: { passphrase: passphraseConfig, privateKeyPath, publicKeyPath, expiresIn: expiresInParam },
} = config as IConfig;
export const privateKey = readFileSync(privateKeyPath);
export const publicKey = readFileSync(publicKeyPath);
export const passphrase = passphraseConfig;
export const expiresIn = expiresInParam;

export class AuthenticationError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, AuthenticationError);
  }
}

export class TokenError extends Error {}
export const ALGORITHM = 'RS256';

export interface IAuthenticationService {
  authenticateCookie: (cookie: string) => IAuthenticatedUserData;
  authenticate: (token: string) => any;
  sign: (object: any) => ISignedData;
}

export interface ISignUserInformation {
  id: number;
  email: string;
  roleName: string;
}

export interface IAuthenticatedUserData extends ISignUserInformation {
  issuedAt: number;
  expiresAt: number;
}

const ajv = new Ajv({ allErrors: true, removeAdditional: true });
addFormats(ajv);

export const tokenSchemaDef = S.object()
  .id('token')
  .title('Token body definition')
  .prop('i', S.number().minimum(1).required())
  .prop('exp', S.number().minimum(1).required())
  .prop('iat', S.number().minimum(1).required())
  .prop('e', S.string().format(S.FORMATS.EMAIL).required())
  .prop('r', S.string().enum(Object.values(RolesNames)).default(RolesNames.player).required())
  .valueOf();

const tokenSchema = ajv.compile(tokenSchemaDef);
export const validateToken = (data: any) => {
  tokenSchema(data);
  if (tokenSchema.errors) {
    throw new Error();
  }
};

export const schemaDef = S.object()
  .id('tokenData')
  .title('Token info to sign definition')
  .prop('id', S.number().minimum(1).required())
  .prop('email', S.string().format(S.FORMATS.EMAIL).required())
  .prop('roleName', S.string().enum(Object.values(RolesNames)).default(RolesNames.player).required())
  .valueOf();

const dataSchema = ajv.compile(schemaDef);
export const validateTokenData = (data: any) => {
  dataSchema(data);
  if (dataSchema.errors) {
    throw new Error();
  }
};
