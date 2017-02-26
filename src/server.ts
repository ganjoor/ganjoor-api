import * as express from 'express';
import { category } from './utils/db';

const app = express();
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.json('OK');
});

app.get('/categories/:id', (req, res) => {
  category.find({
    where: { id: req.params.id },
    include:[{
      as: 'descendents',
      hierarchy: true,
      model: category
    }]
  }).then(result => {
    res.json(result);
  });
});

let server: any;

export function start(port: number) {
  return new Promise((resolve) => {
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
