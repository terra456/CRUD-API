import { createServer } from 'http';
import userController from './controllers/UserController';

const hostname = '127.0.0.1';
const PORT = 3000;

const server = createServer((req, res) => {
  
  const data: Array<Uint8Array> = [];

  // assemble stream of data from request body
  req.on('data', (dataChunk) => {
    data.push(dataChunk);
  });

  req.on('end', () => {
    if (!req.url?.startsWith('/api/users')) {
      return;
    }

    let id = req.url?.replace('/api/users', '');
    if (id?.startsWith('/') && id.length > 1) {
      id = id.replace('/', '');
    }

    switch (req.method) {
    case 'GET':
      userController.get(req, res, id, data.toString());
      break;

    case 'POST':
      userController.create(req, res, id, data.toString());
      break;

      // case 'PUT':
      //   UserController.get(req, res, id, data.toString());
      //   break;

      // case 'DELETE':
      //   UserController.get(req, res, id, data.toString());
      //   break;
      
    default:
      break;
    }
  });
});

server.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});