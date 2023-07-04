import request from 'supertest';
import server from '../index';

describe('GET api/users', () => {
  it('GET all users', (done) => {
    request(server)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect((res) => {
        Array.isArray(res.body) === true;
        res.body.length === 1;
      })
      .expect(200, done);
  });

  it('GET one user', (done) => {
    request(server)
      .get('/api/users/1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c')
      .set('Accept', 'application/json')
      .expect(200, {
        id: '1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c',
        username: 'John Smith',
        age: 35,
        hobbies: ['one', 'two'],
      }, done);
  });

  it('responds with error if id is invalid uuid', (done) => {
    request(server)
      .get('/api/users/1ddfc16e-e1f7-4f6d-98f6-dcbe5519123')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, '"UserId is invalid"', done);
  });

  it('responds with error if no user in database', (done) => {
    request(server)
      .get('/api/users/b9b582c6-fe4e-43c7-8fb2-53f374a06dec')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, '"User with id b9b582c6-fe4e-43c7-8fb2-53f374a06dec not found"', done);
  });
});