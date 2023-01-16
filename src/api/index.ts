import { Users } from './endpoints';

export * from './endpoints';

export const api: {
  users: Users;
} = {
  users: new Users(),
};
