import * as config from 'config';
import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';

import { IConfig } from '../../config/types.config';

export const createSocketIOServer = (server: HTTPServer) => {
  const { webSocketServer } = config as IConfig;
  const socketServer = new Server(server, {
    ...webSocketServer,
    transports: ['websocket'],
    maxHttpBufferSize: 1024,
    serveClient: false,
    cookie: false,
    pingInterval: 10000,
    pingTimeout: 5000,
  });
  socketServer.on('connect', onConnection);
  return socketServer;
};

const onConnection = (socket: Server) => {
  console.log(socket);
  console.log('connected', (socket as any).handshake.headers.cookie);
  console.log('connected', (socket as any).request.headers.cookie);
};
