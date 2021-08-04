import * as APIService from './endpoints';
import * as APIServiceMock from './mock';
import { IAPIService } from './types';

export default (process.env.MODE === 'standalone' ? APIServiceMock : APIService) as IAPIService;
