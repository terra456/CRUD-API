import { v4 as uuidv4 } from 'uuid';
import ErrorHandler from '../utils/ErrorHandler';
import { RavUser, UserData, UserWithoutId } from 'utils/types';

class Users {
  users: Array<UserData> = [
    {
      id: '1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c',
      username: 'John Smith',
      age: 35,
      hobbies: ['one', 'two'],
    }
  ];

  async create (data: UserWithoutId) {
    const newUser: UserData = {
      id: uuidv4(),
      ...data
    };
    return new Promise<UserData>((res, rej) => {
      this.users.push(newUser);
      if (this.users.length > 0) {
        res(newUser);
      } else {
        rej(new ErrorHandler(400, 'Error to write in database'));
      }
    });
  };

  async getAll () {
    return new Promise<UserData[]>((res, rej) => {
      if (this.users.length > 0) {
        res(this.users);
      } else {
        rej(new ErrorHandler(404, 'No users in database'));
      }
    });
  };

  async getById (id: string) {
    return new Promise<UserData>((res, rej) => {
      const index = this.findById(id);
      if (index >= 0) {
        res(this.users[index]);
      } else {
        rej(new ErrorHandler(404, `User with id ${id} not found`));
      }
    });
  };

  findById (id: string) {
    return this.users.findIndex((el) => el.id === id);
  };

  async update (data: RavUser) {
    console.log(data);
    return new Promise<UserData>((res, rej) => {
      const index = this.findById(data.id);
      if (index >= 0) {
        this.users[index] = {...this.users[index], ...data};
        res(this.users[index]);
      } else {
        rej(new ErrorHandler(404, `User with id ${data.id} not found`));
      }
    });
  };

  async delite (id: string) {
    return new Promise<void>((res, rej) => {
      const index = this.findById(id);
      if (index >= 0) {
        this.users.splice(index, 1);
        res();
      } else {
        rej(new ErrorHandler(404, `User with id ${id} not found`));
      }
    });
  };

}

export default new Users();