import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import process from 'node:process';
import app from './app.ts';

const numCPUs = availableParallelism();
const host = '127.0.0.1';
const port = 4000;
  
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, _code, _signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });

} else {
    if (cluster.worker?.id) {
      const clusterPort = port + cluster.worker.id;
      
      app.listen(port, host, () =>
        console.log(`Worker ${cluster.worker?.id} launched at http://${host}:${clusterPort}/`)
      );
    }
}

