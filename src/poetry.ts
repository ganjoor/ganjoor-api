import * as express from 'express';
import { Category, Poet, Poem } from './entities';

export const router = express.Router();

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
router.get('/poets', (req, res) => {
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
router.get('/poets/:id', (req, res) => {
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
router.get('/categories/:categoryId', (req, res) => {
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
router.get('/categories/byPoet/:id', (req, res) => {
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
router.get('/poems/:id', (req, res) => {
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
router.get('/poems/byCategory/:id', (req, res) => {
  Poem.findAllByCategoryId(req.params.id)
    .then(result => res.json(result));
});
