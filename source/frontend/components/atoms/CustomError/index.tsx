import './customError.style.scss';
import React from 'react';

interface ICustomErrorProps {
  message: string;
  show: boolean;
  textClassName?: string;
}

const CustomError = ({ message, show, textClassName }: ICustomErrorProps): JSX.Element => {
  return (
    <p role="alert" className={`customErrorTextStyle ${textClassName}`}>
      {show ? message : ''}
    </p>
  );
};

export default CustomError;
