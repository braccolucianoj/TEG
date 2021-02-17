import { createContext } from 'react';
import { IEmitEvents } from './events';

export interface ISocketIOContext {
  emitEvents: IEmitEvents;
  queueLength: number;
  positionInLine: number;
  connected: boolean;
}

const SocketContext = createContext<ISocketIOContext>({
  queueLength: 0,
  positionInLine: 0,
  emitEvents: {} as IEmitEvents,
  connected: false,
});

export default SocketContext;
