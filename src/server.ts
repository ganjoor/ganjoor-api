import * as express from 'express';
import { router as swaggerRouter } from './swagger';
import { router as poetryRouter } from './poetry';

let startTime: number;

const app = express();
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.json({
    health: 'OK',
    uptime: `${Date.now() - startTime} ms`
  });
});

app.use(poetryRouter);
app.use(swaggerRouter);

let server: any;

export function start(port: number) {
  return new Promise(resolve => {
    startTime = Date.now();
    server = app.listen(port, resolve);
  });
}

export function stop() {
  if (server) {
    try {
      server.close();
    } catch (err) {
      console.log('Error stopping server', err);
    }
  }
}
