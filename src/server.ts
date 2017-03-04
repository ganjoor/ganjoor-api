import * as express from 'express';
import * as jwt from 'express-jwt';
import * as finalhandler from 'finalhandler';
import * as cors from 'cors';
import { logger } from './utils/logger';
import { router as swaggerRouter } from './swagger';
import { router as poetryRouter } from './poetry';

let startTime: number;

const app = express();

app.use(cors());
app.disable('x-powered-by');

const authenticate = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['HS256']
});

app.get('/', (req, res) => {
  res.json({
    health: 'OK',
    uptime: `${Date.now() - startTime} ms`
  });
});

app.use('/v1', authenticate, poetryRouter);
app.use(swaggerRouter);

app.use((err: any, req: any, res: any, next: any) => {
  finalhandler(req, res, {
    onerror: (loggedErr: any) => logger.error(loggedErr)
  })(err);
});

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
