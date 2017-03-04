import * as express from 'express';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
const swaggerUiDistDir = require('swagger-ui/index').dist;

export const router = express.Router();
const jsonDoc = yaml.safeLoad(
  fs.readFileSync(path.join(__dirname, '../swagger.yaml')).toString('utf8')
);

router.get('/api-docs.json', (req, res) => {
  res.json(jsonDoc);
});

router.get('/api-docs', (req, res, next) => {
  if (req.query.url)
    next();
  else
    res.redirect('/api-docs?url=/api-docs.json');
});

router.use('/api-docs', express.static(swaggerUiDistDir));
