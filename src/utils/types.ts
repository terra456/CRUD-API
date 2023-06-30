import { UUID } from 'node:crypto';

export interface UserData extends UserWithoutId {
  id: string,
}

export interface UserWithoutId {
  username: string,
  age: number,
  hobbies: Array<string>,
}

export interface RavUser {
  id: string,
  username?: string,
  age?: number,
  hobbies?: Array<string>,
}

export const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};