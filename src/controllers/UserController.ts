import { IncomingMessage, ServerResponse } from 'node:http';
import UserService from '../services/UserService';
import IErrorHandler from '../utils/ErrorHandler';
import { UserData } from '../utils/types';

class UserController {

  async get(req: IncomingMessage, res: ServerResponse, id: string | undefined, data: string | undefined) {
    data;
    let result;
    if (id) {
      result = UserService.getOne(id);
    } else {
      result = UserService.getAll();
    }
    result
      .then((user: UserData | UserData[]) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(user));
        res.end();
      })
      .catch((e: IErrorHandler) => {
        res.writeHead(e.code, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(e.message));
        res.end();
      });
  }
  
  async create(req: IncomingMessage, res: ServerResponse, id: string | undefined, data: string | undefined) {
    if (data) {
      UserService.create(data)
        .then((user: UserData) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(user));
          res.end();
        })
        .catch((e: IErrorHandler) => {
          res.writeHead(e.code || 400, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(e.message));
          res.end();
        });
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify('No data recieved'));
      res.end();
    }
  }

  async update(req: IncomingMessage, res: ServerResponse, id: string | undefined, data: string | undefined) {
    if (id && data) {
      UserService.update(id, data)
        .then((user: UserData) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(user));
          res.end();
        })
        .catch((e: IErrorHandler) => {
          res.writeHead(e.code, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(e.message));
          res.end();
        });
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify('No data recieved'));
      res.end();
    }
  }

  async delete(req: IncomingMessage, res: ServerResponse, id: string | undefined, data: string | undefined) {
    data;
    if (id) {
      UserService.delete(id)
        .then((data: string) => {
          res.writeHead(204, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(data));
          res.end();
        })
        .catch((e: IErrorHandler) => {
          res.writeHead(e.code, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(e.message));
          res.end();
        });
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify('No id recieved'));
      res.end();
    }
  }

  
}


export default new UserController();