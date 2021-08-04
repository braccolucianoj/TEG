/* eslint-disable func-names */
import React, { useState, useRef } from 'react';

/**
 * This hook combines useState and useRef into one, just for convenience.
 * It is used when a state value needs to be used in code that is outside
 * of the main render code, such as a timeout. It keeps the current state
 * value synchronized with the ref's current value
 */
const useStateRef = function <T>(initialValue?: T): [React.MutableRefObject<T>, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue as any);
  const ref = useRef<T | null>();
  ref.current = value;
  const wrappedSetValue = (newValue: T) => {
    ref.current = newValue;
    setValue(newValue);
  };
  return [ref as any, wrappedSetValue];
};
export default useStateRef;
