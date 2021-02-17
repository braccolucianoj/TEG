import { Popover } from 'antd';
import React, { useState } from 'react';

export interface ICountryInfo {
  name: string;
  alpha2: string;
  id: string;
  continent: string;
}

export interface ICountryProps {
  countryInfo: ICountryInfo;
  countryIndex: number;
  svgDInfo: string;
  color: string;
  onClick: () => void;
  selected: boolean;
  selectedNeighbour: boolean;
}

export const Country = ({
  countryIndex,
  onClick,
  svgDInfo,
  color,
  countryInfo,
  selected,
  selectedNeighbour,
}: ICountryProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const countryColor = (() => {
    if (isHovered) return 'red';
    if (selected) return 'blue';
    if (selectedNeighbour) return 'yellow';
    return color;
  })();

  return (
    <Popover placement="top" title={countryInfo.name} content={<div>Amount Armies: X</div>} visible={isHovered}>
      <path
        width="100%"
        height="100%"
        key={`path-${countryIndex}`}
        d={svgDInfo}
        className="country"
        fill={countryColor}
        stroke="#FFFFFF"
        strokeWidth={0.5}
        onClick={onClick}
        tabIndex={0}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </Popover>
  );
};
