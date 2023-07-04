import request from 'supertest';
import server from '../index';

const mockUsers = {
  valid: {
    username: 'Kate',
    age: 12,
    hobbies: ['skating', 'rafting'],
  },
};

describe('GET api/users', () => {
  it('GET all users', async () => {
    const users = await request(server)
      .get('/api/users')
      .set('Accept', 'application/json');
    expect(users.body.length).toBe(1);
  });

  it('POST valid user data', async () => {
    const response = await request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(mockUsers.valid));
    expect(response.body.username).toEqual(mockUsers.valid.username);
  });

  it('GET all users after addition', async () => {
    const users = await request(server)
      .get('/api/users')
      .set('Accept', 'application/json');
    expect(users.body.length).toBe(2);
  });

  it('Delete invalid id user', (done) => {
    request(server)
      .delete('/api/users/heurf')
      .set('Accept', 'application/json')
      .expect(400, '"UserId is invalid"', done);
  });

  it('Delete user', (done) => {
    request(server)
      .delete('/api/users/1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c')
      .set('Accept', 'application/json')
      .expect(204, done);
  });

  it('GET all users after deletion', async () => {
    const users = await request(server)
      .get('/api/users')
      .set('Accept', 'application/json');
    expect(users.body.length).toBe(1);
  });
  
  
  it('Delete user second time', (done) => {
    request(server)
      .delete('/api/users/1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c')
      .set('Accept', 'application/json')
      .expect(404, '"User with id 1ddfc16e-e1f7-4f6d-98f6-dcbe5519123c not found"', done);
  });
});