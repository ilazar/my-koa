import App from './my-koa';
import bodyParser from './my-koa';

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

const sayHello = ctx => {
  const { query } = ctx.request;
  const name = query.name || 'World';
  ctx.response.body = `Hello ${name}!`;
};

app.use(exceptionHandler);
app.use(timingLogger);
app.use(bodyParser());
app.use(sayHello);

const port = 3000;

app.listen({ port }, () => {
  console.log(`App listening on port ${port}`);
});
