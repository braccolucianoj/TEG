import React, { useState, useEffect, useRef, useContext } from 'react';
import { io } from 'socket.io-client';

import SocketIOContext, { ISocketIOContext } from './context.socketIO';
import { HEADERS } from '../../constants';
import { socketEmitEventsFunctions, socketOnEventFunctions, IEmitEvents, OnEventsCallbacks } from './events';

export const socket = io(`ws://${HEADERS.BASE_URL}`, {
  transports: ['websocket'],
  autoConnect: true,
  jsonp: false,
});

export const useSocketContext = (): ISocketIOContext => {
  const value = useContext(SocketIOContext);
  return value;
};

interface ISocketProviderProps {
  onEvents: Partial<OnEventsCallbacks>;
  children: any;
}

const SocketProvider = ({ children, onEvents }: ISocketProviderProps): JSX.Element => {
  const [value, setValue] = useState<Partial<ISocketIOContext>>({
    queueLength: 0,
    positionInLine: 0,
    connected: false,
  });
  const events = useRef<IEmitEvents>(socketEmitEventsFunctions(socket));

  useEffect(() => {
    socketOnEventFunctions({ setValue, socket }, onEvents);
  }, []);

  return (
    <SocketIOContext.Provider value={{ ...value, emitEvents: events.current } as ISocketIOContext}>
      {children}
    </SocketIOContext.Provider>
  );
};

export default SocketProvider;
export const SocketContext = SocketIOContext;
