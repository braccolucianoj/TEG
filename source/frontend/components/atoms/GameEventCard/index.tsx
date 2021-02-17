import './gameEventCard.style.scss';
import React from 'react';
import { Card } from 'antd';
import { IGameEvent } from '../../../constants/modelTypes.constants';

export interface IGameEventCard {
  event: IGameEvent;
  className?: string;
  onClick?: () => void;
  disabled: boolean;
}

export default ({ event, className = '', onClick, disabled }: IGameEventCard): JSX.Element => {
  return (
    <Card onClick={!disabled && onClick} className={`gameEventCard ${className}`}>
      {event.player.firstName}
    </Card>
  );
};
