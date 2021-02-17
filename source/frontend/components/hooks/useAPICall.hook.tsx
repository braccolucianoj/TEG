import { message } from 'antd';
import { useState, useCallback } from 'react';
import { IAPIBaseRequest, IAPIGetByIdRequest, IAPIPostRequest, IAPIResponse } from '../../services/api/types';
import { APIError } from '../../services/api/utils/APIError.api';

type ParamsType<P> = IAPIBaseRequest | IAPIGetByIdRequest | IAPIPostRequest<P>;
type ExecuteFunctionType<P> = (param: ParamsType<P>) => void;
type EventFunctionType = (e: any) => void;
type APICallHookType<T, P> = [IAPIResponse<T>, boolean, APIError<T>, ExecuteFunctionType<P>];

interface IUseAPICallParams {
  onError?: EventFunctionType;
  onSuccess?: () => void;
}

const defaultError = (content: string) => message.error(content);

export const useAPICall = <T, P>(
  APICallFunction: (params: ParamsType<P>) => Promise<IAPIResponse<T>>,
  { onError, onSuccess }: IUseAPICallParams = {}
): APICallHookType<T, P> => {
  const [response, setResponse] = useState<IAPIResponse<T>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<APIError<T>>();
  const execute = useCallback<ExecuteFunctionType<P>>(
    async (data: any) => {
      try {
        setLoading(true);
        const fullResponse = await APICallFunction(data);
        setResponse(fullResponse);
        onSuccess && onSuccess();
      } catch (err: any) {
        setError(err);
        onError ? onError(err) : defaultError(err.name);
      } finally {
        setLoading(false);
      }
    },
    [onError]
  );

  return [response, loading, error, execute];
};
