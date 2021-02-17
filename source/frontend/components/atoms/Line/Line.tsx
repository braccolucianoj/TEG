import React, { useContext } from 'react';
import { MapContext } from '../../../services/map';

export interface ILineProps {
  from: [];
  to: [];
  coordinates: [];
  stroke: string;
  strokeWidth: number;
  fill: string;
  className: string;
  svgDInfo: string;
}

export const Line = ({
  svgDInfo,
  from = [0, 0],
  to = [0, 0],
  coordinates,
  stroke = 'currentcolor',
  strokeWidth = 3,
  fill = 'transparent',
  className = '',
  ...restProps
}) => {
  const lineData = {
    type: 'LineString',
    coordinates: coordinates || [from, to],
  };

  return (
    <path
      d={svgDInfo}
      className="customLine"
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      {...restProps}
    />
  );
};
