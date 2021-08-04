import * as _ from 'lodash';
import { Socket } from 'socket.io';

import authenticationService from '../authentication/authentication.service';

export const authenticateConnection = (socket: Socket, next: (value: any) => void) => {
  const cookie = _.get(socket, 'handshake.headers.cookie', undefined);
  try {
    const userData = authenticationService.authenticateCookie(cookie);
    next({ id: userData.id, roleName: userData.roleName, email: userData.email });
  } catch (err) {
    err.data = { unauthenticated: true };
    next(err);
  }
};
