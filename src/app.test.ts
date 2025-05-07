import { describe } from "node:test";
import app from "./app";
import request from 'supertest';

describe('server is run', async () => {
  test('base test', async () => {
    const responce = await request(app).get('/');
    expect(responce).toContain('World');
  })
})