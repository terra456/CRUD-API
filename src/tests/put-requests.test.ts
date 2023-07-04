import request from 'supertest';
import server from '../index';

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
    hobbies: 'str'
  },
};

describe('PUT and DELETE api/users', () => {
  it('PUT valid user data', (done) => {
    request(server)
      .put('/api/users/1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c')
      .set('Accept', 'application/json')
      .send(JSON.stringify(mockUsers.valid))
      .expect(200, {id: '1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c', ...mockUsers.valid}, done);
  });

  it('GET updated users', (done) => {
    request(server)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect(200, [{id: '1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c', ...mockUsers.valid}], done);
  });

  it('PUT user data with invalid name', (done) => {
    request(server)
      .put('/api/users/1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c')
      .set('Accept', 'application/json')
      .send(JSON.stringify(mockUsers.invalidName))
      .expect(400, '"Invalid User Name"', done);
  });

  it('PUT user data with invalid hobbies', (done) => {
    request(server)
      .put('/api/users/1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c')
      .set('Accept', 'application/json')
      .send(JSON.stringify(mockUsers.invalidHobbies))
      .expect(400, '"Invalid data in Hobbies"', done);
  });

  it('PUT user data with invalid id', (done) => {
    request(server)
      .put('/api/users/1ddfc16e-e1f7-4f6d-98f6-dcbe551912')
      .set('Accept', 'application/json')
      .send(JSON.stringify(mockUsers.valid))
      .expect(400, '"UserId is invalid"', done);
  });

  it('PUT user data with out id', (done) => {
    request(server)
      .put('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(mockUsers.valid))
      .expect(400, '"No data recieved"', done);
  });

  it('PUT user data without age', (done) => {
    request(server)
      .put('/api/users/1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c')
      .set('Accept', 'application/json')
      .send(JSON.stringify(mockUsers.invalidAge))
      .expect(200, {id: '1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c', age: 12, ...mockUsers.invalidAge}, done);
  });

});