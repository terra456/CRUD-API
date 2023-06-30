import Users from '../data/Users';
import { UserData, UserWithoutId } from '../utils/types';
import ErrorHandler from '../utils/ErrorHandler';
import { UUID } from 'crypto';
import { rejects } from 'assert';

class UserService {

  async create(userData: string) {
    const { username, age, hobbies } = JSON.parse(userData);
    return new Promise<UserData>((resolve, reject) => {
      if (!username || typeof username !== 'string') {
        reject(new ErrorHandler(400, 'Invalid User Name'));
      }
      if (!age || typeof Number(age) !== 'number') {
        reject(new ErrorHandler(400, 'Invalid Age'));
      }
      if (!hobbies || Array.isArray(hobbies)) {
        reject(new ErrorHandler(400, 'Invalid data in Hobbies'));
      }
      const newUser: UserWithoutId = {
        username,
        age: Number(age),
        hobbies,
      };
      Users.create(newUser)
        .then((user: UserData) => {
          resolve(user);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getAll() {
    const users = await Users.getAll();
    return users;
  }

  async getOne(id: unknown) {
    return new Promise<UserData>((resolve, reject) => {
      if (!id || typeof id !== 'string') {
        reject(new ErrorHandler(400, 'UserId is invalid'));
      } else {
        Users.getById(id)
          .then((user) => resolve(user))
          .catch(() => reject(new ErrorHandler(400, `User with id ${id} not found`)));
      }
    });
  }

}


export default new UserService();