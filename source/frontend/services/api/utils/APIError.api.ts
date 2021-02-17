import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const wrapError = (error: AxiosError): Error => {
  const { response } = error;
  switch (response?.status) {
    case 500:
      throw new APIError('Something went wrong', response.statusText, error);
    default:
      throw new APIError('Something went wrong', response ? response.statusText : '', error);
  }
};

export class APIError<T> extends Error implements AxiosError<T> {
  name: string;

  description: string;

  originalError: AxiosError;

  createdAt: number;

  constructor(name: string, description: string, error: AxiosError<T>) {
    super(name);
    Object.assign(this, error);
    this.name = name;
    this.description = description;
    this.originalError = error;
    this.createdAt = Date.now();
  }

  config: AxiosRequestConfig;

  code?: string;

  request?: any;

  response?: AxiosResponse<any>;

  isAxiosError: boolean;

  toJSON: () => any;
}
