import { UUID, randomUUID } from 'crypto';
import { UserData, UserWithoutId } from 'utils/types';

class Users {
  users: Array<UserData> = [
    {
      id: 'UNIQ',
      username: 'string',
      age: 5,
      hobbies: ['one', 'two'],
    }
  ];

  async create (data: UserWithoutId) {
    const newUser: UserData = {
      id: randomUUID(),
      ...data
    };
    return new Promise<UserData>((res, rej) => {
      this.users.push(newUser);
      if (this.users.length > 0) {
        res(newUser);
      } else {
        rej();
      }
    });
  };

  async getAll () {
    return new Promise<UserData[]>((res, rej) => {
      if (this.users.length > 0) {
        res(this.users);
      } else {
        rej();
      }
    });
  };

  async getById (id: UUID | string) {
    return new Promise<UserData>((res, rej) => {
      const index = this.findById(id);
      if (index >= 0) {
        res(this.users[index]);
      } else {
        rej('');
      }
    });
  };

  findById (id: UUID | string) {
    return this.users.findIndex((el) => el.id === id);
  };

  async update (data: UserData) {
    return new Promise((res, rej) => {
      const index = this.findById(data.id);
      if (index >= 0) {
        Object.assign(this.users[index], data);
        res(this.users[index]);
      } else {
        rej();
      }
    });
  };

  async delite (id: UUID) {
    return new Promise<void>((res, rej) => {
      const index = this.findById(id);
      if (index >= 0) {
        this.users.splice(index, 1);
        res();
      } else {
        rej();
      }
    });
  };

}

export default new Users();