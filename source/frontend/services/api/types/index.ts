import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { APIError } from '../utils/APIError.api';

// API Internal Types
export interface IAppSpaceRequestParams {
  start?: number;
  limit?: number;
}

// API Types
export interface IAPIResponse<T> extends AxiosResponse<T> {
  error?: APIError<T>;
}

export interface IAPIConfig extends AxiosRequestConfig {
  mockedResult?: any;
}

export interface IAPIBaseRequest {
  headers?: Record<string, string>;
  extraConfig?: IAPIConfig;
  queryString?: string;
  queryStringRecord?: Record<string, any>;
}

export interface IAPIGetByIdRequest extends IAPIBaseRequest {
  id: string;
}

export interface IAPIPostRequest<T> extends IAPIBaseRequest {
  data: T;
}

// API Call Definitions
export type APIGetFunction<R> = (params: IAPIBaseRequest) => Promise<IAPIResponse<R>>;
export type APIGetByIdFunction<R> = (params: IAPIGetByIdRequest) => Promise<IAPIResponse<R>>;
export type APIPostFunction<P, R> = (params: IAPIPostRequest<P>) => Promise<IAPIResponse<R>>;

export type SignupAPICall = APIPostFunction<any, void>;
export type LoginAPICall = APIPostFunction<any, void>;

export interface IAPIService {
  signup: SignupAPICall;
  login: LoginAPICall;
}
