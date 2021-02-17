import './gameEventStrip.style.scss';
import React from 'react';
import moment from 'moment';
import GameEventCard from '../../atoms/GameEventCard';
import { AttackGameEventName, IGameEvent } from '../../../constants/modelTypes.constants';

export interface IEventStrip {
  events?: IGameEvent[];
  animated?: boolean;
}

const events: IGameEvent[] = new Array(15).fill(null).map((v, index) => ({
  id: index,
  info: {},
  player: {
    id: 0,
    username: 'test',
    imageURL: 'd',
    birthDate: moment(),
    email: 'braccolucianoj@gmail.com',
    firstName: `Luciano Joaquín${index}`,
    lastName: 'Bracco',
  },
  type: AttackGameEventName,
  createdAt: moment(),
}));

export default ({ animated = false }: IEventStrip) => {
  return (
    <div className="gameEventsStripContainer">
      <div className="gameEventsStrip">
        {events.map((event) => (
          <GameEventCard key={event.id} event={event} disabled />
        ))}
      </div>
    </div>
  );
};
