import { IncomingMessage, ServerResponse } from 'node:http';
import UserService from '../services/UserService';
import IErrorHandler from '../utils/ErrorHandler';
import { UserData } from '../utils/types';

class UserController {
  
  async create(req: IncomingMessage, res: ServerResponse, id: string | undefined, data: string | undefined) {
    if (data) {
      UserService.create(data)
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
    }
  }

  async get(req: IncomingMessage, res: ServerResponse, id: string | undefined, data: string | undefined) {
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
  
}


export default new UserController();