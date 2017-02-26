import * as express from 'express';
import { Category, Poet, Poem } from './entities';

const app = express();
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.json('OK');
});

app.get('/poets', (req, res) => {
  Poet.findAll()
    .then(result => res.json(result));
});

app.get('/poets/:id', (req, res) => {
  Poet.findById(req.params.id)
    .then(result => res.json(result));
});

app.get('/categories/:id', (req, res) => {
  Category.findById(req.params.id)
    .then(result => res.json(result));
});

app.get('/categories/byPoet/:id', (req, res) => {
  Category.findByPoetId(req.params.id)
    .then(result => res.json(result));
});

app.get('/poems/:id', (req, res) => {
  Poem.findById(req.params.id)
    .then(result => res.json(result));
});

app.get('/poems/byCategory/:id', (req, res) => {
  Poem.findAllByCategoryId(req.params.id)
    .then(result => res.json(result));
});

let server: any;

export function start(port: number) {
  return new Promise(resolve => {
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
