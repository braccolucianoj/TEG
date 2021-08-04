import qs from 'qs';
import Axios from 'axios';
import * as _ from 'lodash';

import { wrapError } from './APIError.api';

const baseURL = 'http://localhost.com:4000/v1';

export const AxiosInstance = (() =>
  Axios.create({
    baseURL,
    withCredentials: true,
  }))();

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(wrapError(error))
);

interface ICreateQueryStringParams {
  queryStringRecord?: Record<string, any>;
  queryString?: string;
}

export const createQueryStringParams = ({
  queryStringRecord,
  queryString,
}: ICreateQueryStringParams): URLSearchParams => {
  const params = new URLSearchParams(queryString || '');
  if (queryStringRecord) {
    Object.keys(queryStringRecord).forEach((key: string) => {
      const value = queryStringRecord[key];
      if (value != null && typeof value !== 'function') {
        const newValue = typeof value === 'object' ? qs.stringify(value) : `${value}`;
        params.append(key, newValue);
      }
    });
  }
  return params;
};
