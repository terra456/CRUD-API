import { createServer } from 'node:http';
import UserController from './user/UserController.ts';

const app = createServer((request, response) => {
  if (request.url === '/' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json'});
    response.write(JSON.stringify('Hello World!'));
    response.end();
  } else if(request.url === '/api/users' && request.method === 'GET') {
    UserController.getAllUsers(request, response);
  } else if (request.url?.includes('/api/users')) {
    switch (request.method) {
      case 'GET':
        UserController.getUser(request, response);
        break;
      case 'POST':
        UserController.addUser(request, response);
        break;
      case 'PUT':
        UserController.changeUser(request, response);
        break;
      case 'DELETE':
        UserController.deleteUser(request, response);
        break;
      default:
        break;
    }
  } else {
    response.statusCode = 404;
    response.end('Not found');
  }

});

export default app;