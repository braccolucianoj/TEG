import './customInput.style.scss';
import styled from '@emotion/styled';
import { Input, Row, Col } from 'antd';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import { inputClassName, labelClassName } from './helpers';
import CustomError from '../CustomError';

export const RenderIcon = ({ touched, error }: { touched: boolean; error: boolean }): JSX.Element => {
  if (!touched) return null;
  if (error) return <CloseOutlined />;
  return <CheckOutlined />;
};

interface ICustomInputProps {
  name: string;
  InputComponent: any;
  label: string;
  error?: string;
  onBlur?: (...params: any) => void;
  placeholder: string;
  containerStyle: any;
  [key: string]: any;
}

const LABEL_COLUMN_SPAN = 4;

const InputContainer = styled(Row)`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-flow: row wrap;
  margin: 0.3rem 0.25rem 0;

  align-items: center;
  label {
    clear: both;
    display: block;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const CustomInputBare = (
  { error, label, name, InputComponent, onBlur, placeholder, ...props }: ICustomInputProps,
  ref: any
): JSX.Element => {
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);

  const RenderComponent = useMemo(() => InputComponent || Input, []);

  const onBlurHandler = useCallback((...params: any) => {
    setTouched(true);
    onBlur && onBlur(...params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <InputContainer className="input-group customInputContainer">
        <Col span={LABEL_COLUMN_SPAN}>
          {focused && (
            <label htmlFor={name} className={`${labelClassName(touched, !!error)}`}>
              {label}
            </label>
          )}
        </Col>
        <Col span={24 - LABEL_COLUMN_SPAN}>
          <RenderComponent
            {...props}
            ref={ref}
            name={name}
            onBlur={onBlurHandler}
            className={`${inputClassName(touched, !!error)} normalInput`}
            placeholder={focused ? placeholder : label}
            aria-invalid={error ? 'true' : 'false'}
          />
        </Col>
        {/* <Col span={1}>
            <RenderIcon touched={touched} error={!!error} />
          </Col> */}
      </InputContainer>
      <Col offset={LABEL_COLUMN_SPAN}>
        <CustomError show={touched && !!error} message={error} />
      </Col>
    </Row>
  );
};

const CustomInputRawBare = (
  { error, label, name, InputComponent = Input, placeholder, containerStyle = {}, ...props }: ICustomInputProps,
  ref: any
): JSX.Element => (
  <InputContainer className="input-group customInputContainer" style={containerStyle}>
    <InputComponent
      className="normalInput"
      {...props}
      ref={ref}
      name={name}
      placeholder={label || placeholder}
      aria-invalid={error ? 'true' : 'false'}
    />
  </InputContainer>
);

export default forwardRef(CustomInputBare);
export const CustomInputRaw = forwardRef(CustomInputRawBare);
