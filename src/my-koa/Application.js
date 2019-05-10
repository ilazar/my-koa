import http from 'http';
import url from 'url';

class Application {
  httpServerCallback = (req, res) => {
    const { query } = url.parse(req.url, true);
    const request = { query };
    const response = { };
    const context = { request, response };
    this.middleware(context);
    res.write(response.body || '');
    res.end();
  };

  constructor() {
  }

  listen({ port }, callback) {
    const server = http.createServer(this.httpServerCallback);
    server.listen({ port }, callback);
  }

  use(fn) {
    this.middleware = fn;
  }
}

export default Application;
