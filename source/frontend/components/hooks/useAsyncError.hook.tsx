import { useState, useCallback } from 'react';

/**
 * Rethrows an exception within react's setState code, which moves
 * the exception into the main render loop and allows it to be
 * caught by enclosing error boundaries.
 */
export const useAsyncError = (): any => {
  const [, setError] = useState();
  return useCallback(
    (e: any) => {
      setError((prevError: Error) => {
        throw e;
      });
    },
    [setError]
  );
};
