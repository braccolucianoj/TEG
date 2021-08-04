/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react';

export interface IGeographyProps {
  geography: any;
  onMouseLeave: (event: any) => void;
  onMouseEnter: (event: any) => void;
  onMouseDown: (event: any) => void;
  onMouseUp: (event: any) => void;
  onFocus: (event: any) => void;
  onBlur: (event: any) => void;
  style: object;
  className: string;
}

export const Geography = ({
  geography,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onFocus,
  onBlur,
  style = {},
  className = '',
  ...restProps
}: IGeographyProps) => {
  const [isPressed, setPressed] = useState(false);
  const [isFocused, setFocus] = useState(false);

  const handleMouseEnter = (evt) => {
    setFocus(true);
    if (onMouseEnter) onMouseEnter(evt);
  };

  const handleMouseLeave = (evt) => {
    setFocus(false);
    if (isPressed) setPressed(false);
    if (onMouseLeave) onMouseLeave(evt);
  };

  const handleFocus = (evt) => {
    setFocus(true);
    if (onFocus) onFocus(evt);
  };

  const handleBlur = (evt) => {
    setFocus(false);
    if (isPressed) setPressed(false);
    if (onBlur) onBlur(evt);
  };

  const handleMouseDown = (evt: any) => {
    setPressed(true);
    if (onMouseDown) onMouseDown(evt);
  };

  const handleMouseUp = (evt: any) => {
    setPressed(false);
    if (onMouseUp) onMouseUp(evt);
  };

  const pressedFocus = isPressed ? 'pressed' : 'hover';

  return (
    <path
      tabIndex={0}
      className={`rsm-geography ${className}`}
      d={geography.svgPath}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={style[isPressed || isFocused ? pressedFocus : 'default']}
      {...restProps}
    />
  );
};
