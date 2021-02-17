import React from 'react';
import LanguageButton from '../atoms/LanguageButton';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withLanguageChange = (Component: any): any => (props: any) => {
  return (
    <>
      <Component {...props} />
      <LanguageButton />
    </>
  );
};
