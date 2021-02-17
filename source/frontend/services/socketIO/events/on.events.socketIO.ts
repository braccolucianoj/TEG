import _ from 'lodash';
import { Socket } from 'socket.io-client';
import { Dispatch, SetStateAction } from 'react';

export interface IInitSocketParams {
  socket: Socket;
  setValue: Dispatch<SetStateAction<any>>;
}

export interface OnEventsCallbacks {
  onConnect: () => void;
  onConnectionFail: () => void;
}

// NullObject pattern
const nullFunction = () => {};

export const socketOnEventFunctions = (
  { setValue, socket }: IInitSocketParams,
  onEvents: Partial<OnEventsCallbacks>
): void => {
  socket.on('connect', () => {
    setValue((state) => {
      return { ...state, connected: true };
    });
    const callback = _.get(onEvents, 'onConnect', nullFunction);
    callback();
  });
  socket.on('queueLength', ({ queueLength }) => {
    setValue((state) => {
      return { ...state, queueLength };
    });
  });
  socket.on('positionInLine', ({ positionInLine }) => {
    setValue((state) => {
      return { ...state, positionInLine };
    });
  });
  socket.on('connect_error', () => {
    setValue((state) => {
      return { ...state, connected: false };
    });
    const callback = _.get(onEvents, 'onConnectFail', nullFunction);
    callback();
  });
};
