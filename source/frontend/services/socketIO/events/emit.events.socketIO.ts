import { Socket } from 'socket.io-client';

export interface IEmitEvents {
  addClientToQueue: () => void;
  getQueueLength: () => void;
  removeUserFromQueue: () => void;
}

export const socketEmitEventsFunctions = (socket: Socket) =>
  ({
    addClientToQueue: () => {
      socket.emit('addClientIdToQueue');
    },
    getQueueLength: () => {
      socket.emit('queueLengthToSocket');
    },
    removeUserFromQueue: () => {
      socket.emit('removeUserFromQueue');
    },
  } as IEmitEvents);
