import Axios, { AxiosTransformer } from 'axios';

export const axiosDefaultTransformers = Axios.defaults.transformResponse as AxiosTransformer[];
