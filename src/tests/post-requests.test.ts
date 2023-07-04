import request from 'supertest';
import server from '../index';
import { validate as uuidValidate } from 'uuid';

const mockUsers = {
  valid: {
    username: 'Kate',
    age: 12,
    hobbies: ['skating', 'rafting'],
  },
  invalidAge: {
    username: 'Jane',
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

describe('POST api/users', () => {
  it('POST valid user data', async () => {
    const response = await request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(mockUsers.valid));
    
    expect(response.body.username).toEqual(mockUsers.valid.username);
    expect(response.status).toBe(201);
  });

  it('POST user data with invalid age', (done) => {
    request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(mockUsers.invalidAge))
      .expect(400, '"Invalid Age"', done);
  });

  it('POST user data with invalid name', (done) => {
    request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(mockUsers.invalidName))
      .expect(400, '"Invalid User Name"', done);
  });

  it('POST user data with invalid hobbies', (done) => {
    request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(mockUsers.invalidHobbies))
      .expect(400, '"Invalid data in Hobbies"', done);
  });

});