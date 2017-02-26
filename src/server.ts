import * as express from 'express';
import { Category, Poet, Poem } from './entities';
import { router as swaggerRouter } from './swagger';

let startTime: number;

const app = express();
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.json({
    health: 'OK',
    uptime: `${Date.now() - startTime} ms`
  });
});

/**
 * @swagger
 * /poets:
 *   get:
 *     summary: List all poets
 *     produces:
 *       - application/json
 *     tags:
 *       - poets
 *     responses:
 *       200:
 *         description: Poet List
 *         schema:
 *           $ref: '#/definitions/PoetList'
 */
app.get('/poets', (req, res) => {
  Poet.findAll()
    .then(result => res.json(result));
});

/**
 * @swagger
 * /poets/{poetId}:
 *   get:
 *     summary: Show a poet and it's categories
 *     produces:
 *       - application/json
 *     tags:
 *       - poets
 *     parameters:
 *       - name: poetId
 *         description: Poet ID, for example "71678".
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Single Poet
 *         schema:
 *           $ref: '#/definitions/SinglePoet'
 */
app.get('/poets/:id', (req, res) => {
  Poet.findById(req.params.id)
    .then(result => res.json(result));
});

/**
 * @swagger
 * /categories/{categoryId}:
 *   get:
 *     summary: Show a category
 *     produces:
 *       - application/json
 *     tags:
 *       - categories
 *     parameters:
 *       - name: categoryId
 *         description: Category ID, for example "2030".
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Single Category
 *         schema:
 *           $ref: '#/definitions/Category'
 */
app.get('/categories/:categoryId', (req, res) => {
  Category.findById(req.params.categoryId)
    .then(result => res.json(result));
});

/**
 * @swagger
 * /categories/byPoet/{poetId}:
 *   get:
 *     summary: List a poet's categories
 *     produces:
 *       - application/json
 *     tags:
 *       - categories
 *     parameters:
 *       - name: poetId
 *         description: Poet ID, for example "71678".
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Category List by Poet
 *         schema:
 *           $ref: '#/definitions/CategoryList'
 */
app.get('/categories/byPoet/:id', (req, res) => {
  Category.findByPoetId(req.params.id)
    .then(result => res.json(result));
});

/**
 * @swagger
 * /poems/{poemId}:
 *   get:
 *     summary: Show a poem and it's verses
 *     produces:
 *       - application/json
 *     tags:
 *       - poems
 *     parameters:
 *       - name: poemId
 *         description: Poem ID, for example "9827".
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Single Poem and Verses
 *         schema:
 *           $ref: '#/definitions/SinglePoem'
 */
app.get('/poems/:id', (req, res) => {
  Poem.findById(req.params.id)
    .then(result => res.json(result));
});

/**
 * @swagger
 * /poems/byCategory/{categoryId}:
 *   get:
 *     summary: Show poems inside a category
 *     produces:
 *       - application/json
 *     tags:
 *       - poems
 *     parameters:
 *       - name: categoryId
 *         description: Category ID, for example "10".
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Poems of a Category
 *         schema:
 *           $ref: '#/definitions/Poem'
 */
app.get('/poems/byCategory/:id', (req, res) => {
  Poem.findAllByCategoryId(req.params.id)
    .then(result => res.json(result));
});

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
