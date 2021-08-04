import { useEffect } from 'react';
import Router from 'next/router';

export default (): any => {
  useEffect(() => {
    Router.push('/login');
  }, []);
  return null;
};
