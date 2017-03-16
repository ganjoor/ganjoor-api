import * as jwt from 'express-jwt';

let middleware;

if (process.env.NODE_ENV === 'development' || process.env.BYPASS_AUTH === 'yes') {
  middleware = (req: any, res: any, next: any) => next();
} else {
  middleware = jwt({
    secret: process.env.AUTH0_CLIENT_SECRET,
    audience: process.env.AUTH0_CLIENT_ID,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['HS256']
  });
}

export default middleware;
