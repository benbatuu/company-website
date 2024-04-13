import { env } from 'bun';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { verify as jwtverify } from 'hono/jwt';
import { cors } from 'hono/cors';
import { etag } from 'hono/etag';
import { secureHeaders } from 'hono/secure-headers';
import { HTTPException } from 'hono/http-exception';
// Controllers
import authController from 'controllers/auth.controller';
import usersController from 'controllers/users.controller';
import contactController from 'controllers/contact.controller';
import metaTagsController from 'controllers/metatags.controller';
import offersController from 'controllers/offers.controller';
import pagesController from 'controllers/pages.controller';
import serviceCategoryController from 'controllers/service.category.controller';
import servicesController from 'controllers/services.controller';
import blogsController from 'controllers/blogs.controller';
// Enums
import HttpStatusCode from './types/enums/httpstatuses';
import blogCommentController from 'controllers/blogcomment.controller';
import newsletterController from 'controllers/newsletter.controller';

const app = new Hono();

app.use('*', cors());
app.use('*', etag());
app.use('*', secureHeaders());

// JWT verify middleware
// app.use('*', async (c, next) => {
//   if (c.req.path !== '/auth/authorize' && c.req.path !== '/' && c.req.path !== '/auth/refreshtoken') {
//     if (!c.req.header(env.JWT_HEADER_NAME!)) throw new HTTPException(400, { message: env.INVALID_AUTH_MESSAGE });

//     const header = c.req.header(env.JWT_HEADER_NAME!)!;

//     if (!header.startsWith(`${env.JWT_TOKEN_TYPE} `)) throw new HTTPException(400, { message: env.INVALID_AUTH_MESSAGE });

//     const token = await jwtverify(header.split(' ')[1], env.JWT_SECRET!);

//     if ((c.req.path === '/auth/login' && token.tokentype !== env.AUTH_TOKEN_TYPE) || (c.req.path !== '/auth/login' && token.tokentype !== env.LOGIN_TOKEN_TYPE)) {
//       throw new HTTPException(400, { message: env.INVALID_AUTH_MESSAGE });
//     }
//   }
//   await next();
// });

app.use('*', async (c, next) => {
  logger();
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
  c.header('X-Powered-By', 'bennbatuu');
});

app.notFound((c) => {
  return new Response(JSON.stringify({ error: { message: 'Not Found', route: c.req.path } }), {
    status: HttpStatusCode.NOT_FOUND,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

app.onError((err, c) => {
  if (err instanceof HTTPException)
    return new Response(JSON.stringify({ error: { message: err.message } }), {
      status: HttpStatusCode.BAD_REQUEST,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  console.log(err.message);
  return new Response(JSON.stringify({ error: { message: 'Internal Server Error' } }), {
    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

// Routes
app.get('/', async (c) => c.json({ data: 'OK' }));

app.route('/auth', authController);
app.route('/users', usersController);

app.route('/blogs', blogsController);
app.route('/categories', blogsController);
app.route('/comments', blogCommentController);

app.route('/metatags', metaTagsController);
app.route('/pages', pagesController);
app.route('/offers', offersController);
app.route('/contact', contactController);
app.route('/newsletter', newsletterController);

app.route('/services', servicesController);
app.route('/servicecategories', serviceCategoryController);

export default app;
