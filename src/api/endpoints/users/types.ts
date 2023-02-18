import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  username: string;
  age: number;
  hobbies: string[];
}

export interface IUsers {
  [id: ReturnType<typeof uuidv4>]: IUser;
}

export type IDataUserResponse = IUser | IUser[];

export interface IUsersResponse {
  code: number;
  message?: string;
  data?: IDataUserResponse;
}
