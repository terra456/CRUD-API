import request from 'supertest';
import server from '../index';

describe('base api tests', () => {
  it('responds with json', (done) => {
    request(server)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('responds with array of users', (done) => {
    request(server)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect((res) => {
        Array.isArray(res.body) === true;
      })
      .expect(200, done);
  });

  it('responds with error if non-existing endpoint', (done) => {
    request(server)
      .get('/api/waewa')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, '"Url is invalid"', done);
  });
});