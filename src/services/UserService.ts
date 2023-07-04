import Users from '../data/Users';
import { RavUser, UserData, UserWithoutId } from '../utils/types';
import ErrorHandler from '../utils/ErrorHandler';
import { validate as uuidValidate } from 'uuid';

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
      if (!Array.isArray(hobbies)) {
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

  async update(id: string, data: string) {
    const { username, age, hobbies } = JSON.parse(data);
    return new Promise<UserData>((resolve, reject) => {
      const newUser: RavUser = {
        id,
      };
      if (!id || uuidValidate(id)) {
        reject(new ErrorHandler(400, 'UserId is invalid'));
      }
      if (typeof username !== 'string') {
        reject(new ErrorHandler(400, 'Invalid User Name'));
      } else {
        newUser.username = username;
      }
      if (typeof Number(age) !== 'number') {
        reject(new ErrorHandler(400, 'Invalid Age'));
      } else {
        newUser.age = age;
      }
      if (!Array.isArray(hobbies)) {
        reject(new ErrorHandler(400, 'Invalid data in Hobbies'));
      } else {
        newUser.hobbies = hobbies;
      }
      
      Users.update(newUser)
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

  async getOne(id: string) {
    return new Promise<UserData>((resolve, reject) => {
      if (!id || uuidValidate(id)) {
        reject(new ErrorHandler(400, 'UserId is invalid'));
      } else {
        Users.getById(id)
          .then((user) => resolve(user))
          .catch((e) => reject(e));
      }
    });
  }

  async delete(id: string) {
    return new Promise<string>((resolve, reject) => {
      if (!id || uuidValidate(id)) {
        reject(new ErrorHandler(400, 'UserId is invalid'));
      } else {
        Users.delite(id)
          .then(() => resolve(`User ${id} removed`))
          .catch((e) => reject(e));
      }
    });
  }

}


export default new UserService();