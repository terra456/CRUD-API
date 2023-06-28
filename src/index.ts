import { createServer as createServerHttp } from 'http';

const PORT = 3000;

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted')
});

myServer.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
console.log('To terminate it, use Ctrl+C combination');
});
