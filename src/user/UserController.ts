import { ServerResponse, IncomingMessage } from "node:http";
import { validate } from 'uuid';
import userModel from "./UserModel.ts";
import ApiError from "../utils/ApiError.ts";

class UserController {
  getAllUsers = (_request: IncomingMessage, response: ServerResponse) => {
    const users = userModel.getAllUsers();
    if (users) {
      response.writeHead(200, { 'Content-Type': 'application/json'});
      response.write(JSON.stringify(users));
      response.end();
    } else {
      response.end();
    }
  }

  getUser = async (request: IncomingMessage, response: ServerResponse) => {
    const userId = request.url?.replace('/api/users/', '');
    if (!userId || !validate(userId)) {
      response.writeHead(400, { 'Content-Type': 'application/json'});
      response.write(JSON.stringify('invalid ID'));
      response.end();
    } else {
      try {
        const user = await userModel.getUser(userId);
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.write(JSON.stringify(user));
        response.end();
        
      } catch (e) {
        if (e instanceof ApiError) {
          response.writeHead(e.status, { 'Content-Type': 'application/json'});
          response.write(JSON.stringify(e.message));
          response.end();
        } else {
          response.writeHead(500, { 'Content-Type': 'application/json'});
          response.write(JSON.stringify(`something wrong`));
          response.end();
        }      
      }
    }
  }

  addUser = async (request: IncomingMessage, response: ServerResponse) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', async () => {
      try {
        const user = await userModel.addUser(body);
        response.writeHead(201, { 'Content-Type': 'application/json'});
        response.write(JSON.stringify(user));
        response.end();
      } catch (e) {
        if (e instanceof ApiError) {
          response.writeHead(e.status, { 'Content-Type': 'application/json'});
          response.write(JSON.stringify(e.message));
          response.end();
        } else {
          console.log(e.status, e.message);
          response.writeHead(500, { 'Content-Type': 'application/json'});
          response.write(JSON.stringify(`something wrong`));
          response.end();
        }
      }
    });
  }

  changeUser = async (request: IncomingMessage, response: ServerResponse) => {
    const userId = request.url?.replace('/api/users/', '');
    if (!userId || !validate(userId) ) {
      response.writeHead(400, { 'Content-Type': 'application/json'});
      response.write(JSON.stringify(`userId is invalid`));
      response.end();
      return;
    }
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', async () => {
      try {
        const user = await userModel.changeUser(userId, body);
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.write(JSON.stringify(user));
        response.end();
      } catch (e) {
        if (e instanceof ApiError) {
          response.writeHead(e.status, { 'Content-Type': 'application/json'});
          response.write(JSON.stringify(e.message));
          response.end();
        } else {
          console.log(e.status, e.message);
          response.writeHead(500, { 'Content-Type': 'application/json'});
          response.write(JSON.stringify(`something wrong`));
          response.end();
        }
      }
    });
  }

  deleteUser = async (request: IncomingMessage, response: ServerResponse) => {
    const userId = request.url?.replace('/api/users/', '');
    if (!userId || !validate(userId) ) {
      response.writeHead(400, { 'Content-Type': 'application/json'});
      response.write(JSON.stringify(`userId is invalid`));
      response.end();
      return;
    }

    try {
      await userModel.deliteUser(userId);
      response.writeHead(204, { 'Content-Type': 'application/json'});
      response.end();
    } catch (e) {
      if (e instanceof ApiError) {
          response.writeHead(e.status, { 'Content-Type': 'application/json'});
          response.write(JSON.stringify(e.message));
          response.end();
        } else {
          console.log(e.status, e.message);
          response.writeHead(500, { 'Content-Type': 'application/json'});
          response.write(JSON.stringify(`something wrong`));
          response.end();
        }
    }
    return;
  }
}

export default new UserController();
