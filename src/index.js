import App from './my-koa';

const app = new App();

const sayHello = ctx => {
  const { query } = ctx.request;
  const name = query.name || 'World';
  ctx.response.body = `Hello ${name}!`;
};

app.use(sayHello);

const port = 3000;

app.listen({ port }, () => {
  console.log(`App listening on port ${port}`);
});
