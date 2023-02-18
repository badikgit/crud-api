import { IApiEndpoint } from 'api';
import { v4 as uuidv4, validate } from 'uuid';
import { IUsers, IUsersResponse, IUser } from './types';

export class Users implements IApiEndpoint {
  private users: IUsers = {};

  static #getErrorFieldMessages(username: string, age: number, hobbies: string[]) {
    const errorFields: string[] = [];
    if (username === undefined) errorFields.push('missing required field username');
    if (typeof username !== 'string') errorFields.push('username should be string');
    if (age === undefined) errorFields.push('missing required field age');
    if (typeof age !== 'number') errorFields.push('age should be number');
    if (hobbies === undefined) errorFields.push('missing required field hobbies');
    if (!Array.isArray(hobbies) || !hobbies.every((hobbie) => typeof hobbie === 'string')) {
      errorFields.push('hobbies should be string[]');
    }
    return errorFields;
  }

  async getAll(method: string = 'GET') {
    let res: IUsersResponse;
    if (method !== 'GET') {
      res = { code: 405, message: 'Wrong method.' };
    } else {
      res = { code: 200, data: Object.values(this.users) };
    }
    return res;
  }

  async post(user: IUser) {
    let res: IUsersResponse;
    if (!user) {
      res = { code: 400, message: 'Invalid JSON format.' };
    } else {
      try {
        const { username, age, hobbies } = user;
        let id: ReturnType<typeof uuidv4> = uuidv4();
        while (this.users[id]) {
          id = uuidv4();
        }
        const errorFields: string[] = Users.#getErrorFieldMessages(username, age, hobbies);
        if (errorFields.length) {
          res = { code: 400, message: `Request data fields error: ${errorFields.join(', ')}.` };
        } else {
          const data = {
            id,
            username,
            age,
            hobbies,
          };
          this.users[id] = data;
          res = { code: 201, data };
        }
      } catch (err) {
        res = {
          code: 500,
          message: err instanceof Error ? err.message : `${err}`,
        };
      }
    }
    return res;
  }

  async put(id: string, user: IUser) {
    let res: IUsersResponse;
    if (!user) {
      res = { code: 400, message: 'Invalid JSON format' };
    } else {
      try {
        if (!validate(id)) {
          res = { code: 400, message: 'Invalid id (not uuid)' };
        } else if (!this.users[id]) {
          res = { code: 404, message: "Record doesn't exist" };
        } else {
          const { username, age, hobbies } = user;
          const errorFields: string[] = Users.#getErrorFieldMessages(username, age, hobbies);
          if (errorFields.length) {
            res = { code: 400, message: `Request data fields error: ${errorFields.join(', ')}.` };
          } else {
            const data = {
              id,
              username,
              age,
              hobbies,
            };
            this.users[id] = data;
            res = { code: 200, data };
          }
        }
      } catch (err) {
        res = {
          code: 500,
          message: err instanceof Error ? err.message : `${err}`,
        };
      }
    }
    return res;
  }

  async get(id: ReturnType<typeof uuidv4>) {
    let res: IUsersResponse;
    try {
      if (!validate(id)) {
        res = { code: 400, message: 'Invalid id (not uuid)' };
      } else if (!this.users[id]) {
        res = { code: 404, message: "Record doesn't exist" };
      } else {
        res = { code: 200, data: this.users[id] };
      }
    } catch (err) {
      res = {
        code: 500,
        message: err instanceof Error ? err.message : `${err}`,
      };
    }
    return res;
  }

  async delete(id: ReturnType<typeof uuidv4>) {
    let res: IUsersResponse;
    try {
      if (!validate(id)) {
        res = { code: 400, message: 'Invalid id (not uuid)' };
      } else if (!this.users[id]) {
        res = { code: 404, message: "Record doesn't exist." };
      } else {
        delete this.users[id];
        res = { code: 204, message: 'Record successfully deleted.' };
      }
    } catch (err) {
      res = {
        code: 500,
        message: err instanceof Error ? err.message : `${err}`,
      };
    }
    return res;
  }
}
