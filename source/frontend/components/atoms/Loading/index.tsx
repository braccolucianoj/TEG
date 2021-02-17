import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './loading.style.scss';

export interface ILoadingProps {
  text: string;
}
export default ({ text }: ILoadingProps): JSX.Element => (
  <div className="LoadingItem">
    <h3>{text}</h3>
    <p>Aguarde un momento por favor</p>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} data-testid="spin-loading" />
  </div>
);
