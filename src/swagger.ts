import * as express from 'express';
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiDistDir = require('swagger-ui/index').dist;

export const router = express.Router();

const options = {
  swaggerDefinition: {
    info: {
      title: 'Ganjoor API',
      version: '0.0.1'
    }
  },
  apis: ['./dist/models/*.js', './dist/*.js'],
  tags: [
    { name: 'poets', description: 'Poets' },
    { name: 'categories', description: 'Poet\'s Work Categories' },
    { name: 'poems', description: 'Poems' }
  ]
};

const swaggerDocument = swaggerJSDoc(options);

router.get('/api-docs.json', (req, res) => {
  res.json(swaggerDocument);
});

router.get('/api-docs', (req, res, next) => {
  if (req.query.url)
    next();
  else
    res.redirect('/api-docs?url=/api-docs.json');
});

router.use('/api-docs', express.static(swaggerUiDistDir));
