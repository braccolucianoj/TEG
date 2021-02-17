import React, { useEffect, useRef } from 'react';
import { Statistic, Row, message } from 'antd';

import Planisphere from '../components/molecules/Planisphere';
import { topology } from '../services/topology';
import SocketProvider, { useSocketContext } from '../services/socketIO';

import './styles/game.scss';

const { Countdown } = Statistic;

const Game = (): JSX.Element => {
  const value = useSocketContext();
  // const deadline = Date.now() + 1000 * 60 * 5;
  const deadline = Date.now() + 1000 * 60 * 1;

  useEffect(() => {}, [value]);

  return (
    <div
    // className={!value.connected && 'gameContainerDisabled'}
    >
      <Row>
        <Planisphere topology={topology} />
      </Row>
      {value.connected && (
        <Row>
          <Countdown
            title="Countdown"
            value={deadline}
            onFinish={() => message.error("Your turn's time has finished")}
          />
        </Row>
      )}
    </div>
  );
};

const GameContainer = (): JSX.Element => {
  const onConnect = () => {
    message.success('Socket Server connected');
  };

  const onConnectionFail = () => {
    message.error('Socket Connection failed ');
  };

  return (
    <SocketProvider onEvents={{ onConnect, onConnectionFail }}>
      <Game />
    </SocketProvider>
  );
};

export default GameContainer;
