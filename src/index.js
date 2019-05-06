import http from 'http';
import url from 'url';

const handler = (req, res) => {
  const q = url.parse(req.url, true).query;
  const name = q.name || 'World';
  res.write(`Hello ${name}!`);
  res.end();
};

const server = http.createServer(handler);

const port = 3000;

server.listen({ port }, () => {
  console.log(`Server started on port ${port}`);
});
