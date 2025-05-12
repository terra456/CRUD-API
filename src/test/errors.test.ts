import {describe, expect, test} from '@jest/globals';
import app from "../app.ts";
import request from 'supertest';
import { User } from '../types/userType.ts';

const userMock = {
  username: 'My Name',
  age: 666,
  hobbies: ['first hobby', 'anouther']
}

const incorrectUser = {
  username: 'My Name',
  age: '666',
  hobbies: 'first hobby'
}

const lessUser = {
  username: 'My Name',
  hobbies: ['first hobby', 'anouther']
}

const incorrectUuid = 'rriwoaw';
const correctUuid = '1abb50d0-426d-42a8-a745-4bbffdd0650f';

let createdUser = {} as User;

describe('create user', () => {
  test('incorrect body, 400', async () => {
    const response = await request(app)
      .post('/api/users')
      .send(JSON.stringify(incorrectUser))
      .set('Accept', 'application/json');
    
    expect(response.status).toEqual(400);
    expect(response.body).toMatch('invalid');
  })
  
  test('not all fields in body, 400', async () => {
    const response = await request(app)
      .post('/api/users')
      .send(JSON.stringify(lessUser))
      .set('Accept', 'application/json');
    
    expect(response.status).toEqual(400);
    expect(response.body).toMatch('invalid');
  })
  
  test('sucsessfully create user, 201', async () => {
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
})

describe('update user data', () => {

  // test('correct update, 200', async () => {
    
  // })
  test('incorrect id, 400', async () => {
    const response = await request(app)
      .put(`/api/users/${incorrectUuid}`)
      .send(JSON.stringify(lessUser))
      .set('Accept', 'application/json');
    
    expect(response.status).toEqual(400);
    expect(response.body).toMatch('userId is invalid');
  })

  test('no id, 400', async () => {
    const response = await request(app)
      .put(`/api/users`)
      .send(JSON.stringify(userMock))
      .set('Accept', 'application/json');
    
    expect(response.status).toEqual(400);
    expect(response.body).toMatch('userId is invalid');
  })

  test('not found user, 404', async () => {
    const response = await request(app)
      .put(`/api/users/${correctUuid}`)
      .send(JSON.stringify(userMock))
      .set('Accept', 'application/json');
    
    expect(response.status).toEqual(404);
    expect(response.body).toMatch(`doesn't exist`);
  })

  test('incorrect body, 400', async () => {
    const response = await request(app)
      .put(`/api/users/${createdUser.id}`)
      .send(JSON.stringify(incorrectUser))
      .set('Accept', 'application/json');
    expect(response.status).toEqual(400);
    expect(response.body.username).not.toEqual(createdUser.username);
    expect(response.body.id).not.toEqual(createdUser.id);
    expect(response.body).toMatch('invalid');
  })

  test('missed fields in body, 400', async () => {
    const response = await request(app)
      .put(`/api/users/${createdUser.id}`)
      .send(JSON.stringify(lessUser))
      .set('Accept', 'application/json');
    expect(response.status).toEqual(400);
    expect(response.body.username).not.toEqual(createdUser.username);
    expect(response.body.id).not.toEqual(createdUser.id);
    expect(response.body).toMatch('invalid');
  })

})

describe('delete user', () => {
  test('no id, 400', async () => {
    const response = await request(app)
      .delete(`/api/users`)
      .set('Accept', 'application/json');
    
    expect(response.status).toEqual(400);
    expect(response.body).toMatch('userId is invalid');
  })

  test('incorrect id, 400', async () => {
    const response = await request(app)
      .delete(`/api/users/${incorrectUuid}`)
      .set('Accept', 'application/json');
    
    expect(response.status).toEqual(400);
    expect(response.body).toMatch('userId is invalid');
  })
  test('not found user, 404', async () => {
    const response = await request(app)
      .delete(`/api/users/${correctUuid}`)
      .set('Accept', 'application/json');
    
    expect(response.status).toEqual(404);
    expect(response.body).toMatch('exist');
  })
  test('correct delete, 204', async () => {
    const response = await request(app)
      .delete(`/api/users/${createdUser.id}`)
      .set('Accept', 'application/json');
    
    expect(response.status).toEqual(204);
    expect(response.body).not.toMatch('userId is invalid');
    expect(response.body).toBeFalsy();
  })

})