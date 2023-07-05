import UserService from '../services/UserService';
import 'jest';

const mockUsers = {
  valid: {
    username: 'Kate',
    age: 12,
    hobbies: ['skating', 'rafting'],
  },
  invalidAge: {
    username: 'Jane',
    age: 'smth',
    hobbies: ['chess'],
  },
  invalidName: {
    username: 156,
    age: 12,
    hobbies: ['skating', 'racing'],
  },
  invalidHobbies: {
    username: 'Rick',
    age: 12,
  },
};

describe('users database', () => {

  test('Get user by Id', async () => {
    const id = '1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c';
    const user =  await UserService.getOne(id);
    expect(user.username).toBe('John Smith');
  });

  test('Add new user', async () => {
    const user =  await UserService.create(JSON.stringify(mockUsers.valid));
    expect(user.username).toBe('Kate');
  });

});
