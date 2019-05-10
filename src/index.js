import App from './my-koa';
import Router from './my-router';
import bodyParser from './my-bodyparser';

const app = new App();

const exceptionHandler = async (ctx, next) => {
  try {
    return await next();
  } catch (err) {
    ctx.body = { message: err.message || 'Unexpected error.' };
    ctx.status = err.status || 500;
  }
};

const timingLogger = async (ctx, next) => {
  const start = Date.now();
  await next();
  console.log(`${ctx.request.method} ${ctx.request.url} => ${ctx.response.status}, ${Date.now() - start}ms`);
};

const router = new Router();

const items = [];

router
  .get('/item', ctx => {
    ctx.response.body = items;
    ctx.response.status = 200;
  })
  .post('/item', ctx => {
    const item = ctx.request.body;
    items.push(item);
    ctx.response.body = item;
    ctx.response.status = 200;
  });

app.use(exceptionHandler);
app.use(timingLogger);
app.use(bodyParser());

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = 3000;

app.listen({ port }, () => {
  console.log(`App listening on port ${port}`);
});
