import http from 'http';
import url from 'url';

class Application {
  handle = (req, res) => {
    const { query } = url.parse(req.url, true);
    const request = { query };
    const response = { body: '' };
    const context = { request, response };
    this.middleware(context);
    res.write(response.body);
    res.end();
  };

  constructor() {
    this.server = http.createServer(this.handle);
  }

  listen({ port }, callback) {
    this.server.listen({ port }, callback);
  }

  use(middleware) {
    this.middleware = middleware;
  }
}

export default Application;
