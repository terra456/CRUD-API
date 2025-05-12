import { User, UserDto } from "../types/userType.ts";
import { v4 as uuidv4 } from 'uuid';
import ApiError from "../utils/ApiError.ts";


class UserModel {
  users: User[] = [];

  getAllUsers = () => {
    return this.users;
  }

  getUser = async (id: string) => {
    const user = this.users.find((el) => el.id === id);
    if (!user) {
      throw new ApiError(404, `User with id ${id} doesn't exist`);
    }
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateUser = (data: any): UserDto => {
    const {username, age, hobbies} = data;
    if (!username || typeof username !== 'string') {
      throw new ApiError(400, 'invalid username');
    }
    if (!age || typeof age !== 'number') {
      throw new ApiError(400, 'invalid age');
    }
    if (!hobbies || !Array.isArray(hobbies)) {
      throw new ApiError(400, 'invalid hobbies');
    }
    return {username, age, hobbies};
  }

  addUser = async (str: string) => {
    const userData = this.validateUser(JSON.parse(str));
    const user = {
      id: uuidv4(),
      ...userData };
    this.users.push(user);
    return user;
  }

  changeUser = async (id: string, str: string) => {
    const userIndex = this.users.findIndex((el) => el.id === id);
    if (userIndex < 0) {
      throw new ApiError(404, `User with id ${id} doesn't exist`);
    }
    const userData = this.validateUser(JSON.parse(str));
    this.users.splice(userIndex, 1, { id, ...userData });
    return this.users[userIndex];
  }

  deliteUser = async (id: string) => {
    const userIndex = this.users.findIndex((el) => el.id === id);
    if (userIndex < 0) {
      throw new ApiError(404, `User with id ${id} doesn't exist`);
    }
    this.users.splice(userIndex, 1);
    return;
  }
}

export default new UserModel();