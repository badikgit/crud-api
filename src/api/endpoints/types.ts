import { IUsersResponse, IUser } from './users';

export type IPostBody = IUser;

export type IResponse = IUsersResponse;

export interface IApiEndpoint {
  getAll: () => Promise<IResponse>;
  post: (body: IPostBody) => Promise<IResponse>;
  get: (id: string) => Promise<IResponse>;
  put: (id: string, user: IPostBody) => Promise<IResponse>;
  delete: (id: string) => Promise<IResponse>;
}
