import {describe, expect, test} from '@jest/globals';
import app from "../app.ts";
import request from 'supertest';
import { User } from "../types/userType.ts";

const userMock = {
  username: 'My Name',
  age: 666,
  hobbies: ['first hobby', 'anouther']
}

const userMockUpdate = {
  username: 'New data',
  age: 777,
  hobbies: ['first hobby', 'anouther']
}

let createdUser = {} as User;

describe('server is run', () => {
  test('base test', async () => {
    const response = await request(app).get('/');
    expect(response.body).toContain('World');
  })
})

describe('create and delite user', () => {
  test(' get users responds with json and empty array', async () => {
    const response = await request(app)
      .get('/api/users');
    
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
  test('create user, 201', async () => {
    const response = await request(app)
      .post('/api/users')
      .send(JSON.stringify(userMock))
      .set('Accept', 'application/json');
    
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual(userMock.username);

    if (response.body) {
      createdUser = response.body;
    }
  })

  test('get user, 200', async () => {
    const response = await request(app)
      .get(`/api/users/${createdUser.id}`)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual(createdUser.username);
  })

  test('update user', async () => {
    const response = await request(app)
      .put(`/api/users/${createdUser.id}`)
      .send(JSON.stringify(userMockUpdate))
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body.username).not.toEqual(createdUser.username);
    expect(response.body.id).toEqual(createdUser.id);
    expect(response.body.username).toEqual(userMockUpdate.username);

    if (response.body) {
      createdUser = response.body;
    }
  })
  test('get users with updated user', async () => {
    const response = await request(app)
      .get(`/api/users`)
      .set('Accept', 'application/json');
    expect(response.body).toHaveLength(1);
    expect(response.body).not.toContainEqual({id: createdUser.id, ...userMock});
    expect(response.body).toContainEqual({id: createdUser.id, ...userMockUpdate});
  })

  test('delete user', async () => {
    const response = await request(app)
      .delete(`/api/users/${createdUser.id}`)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(204);
    expect(response.body).toBeFalsy();
  })

  test('get deleted user', async () => {
    const response = await request(app)
      .get(`/api/users/${createdUser.id}`)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(404);
  })

  test('users array become empty', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Accept', 'application/json');
    
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
})