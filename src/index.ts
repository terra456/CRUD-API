/* eslint-disable @typescript-eslint/no-inferrable-types */
import { createServer } from 'http';
import userController from './controllers/UserController';
import 'dotenv/config';

const hostname: string = process.env.HOST || '127.0.0.1';
const PORT: number = Number(process.env.PORT) || 4000;

const server = createServer((req, res) => {
  
  const data: Array<Uint8Array> = [];

  req.on('data', (dataChunk) => {
    data.push(dataChunk);
  });

  req.on('end', () => {
    if (!req.url?.startsWith('/api/users')) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify('Url is invalid'));
      res.end();
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

    case 'PUT':
      userController.update(req, res, id, data.toString());
      break;

    case 'DELETE':
      userController.delete(req, res, id, data.toString());
      break;
      
    default:
      break;
    }
  });
});

server.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});

export default server;