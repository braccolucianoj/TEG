import { SignupAPICall, LoginAPICall } from '../types';
import { AxiosInstance, createQueryStringParams } from '../utils';
import { axiosDefaultTransformers } from '../utils/adapters';

export const signup: SignupAPICall = async ({ queryStringRecord, queryString, headers, data }) =>
  AxiosInstance.post('/signup', data, {
    params: createQueryStringParams({ queryStringRecord, queryString }),
    headers,
    transformResponse: [...axiosDefaultTransformers],
  });

export const login: LoginAPICall = async ({ queryStringRecord, queryString, headers, data }) =>
  AxiosInstance.post('/login', data, {
    params: createQueryStringParams({ queryStringRecord, queryString }),
    headers,
    transformResponse: [...axiosDefaultTransformers],
  });
