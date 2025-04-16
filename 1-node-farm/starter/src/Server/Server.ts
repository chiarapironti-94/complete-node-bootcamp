import * as http from "http";
import { serveHtml } from '../Utils/Functions';
import { StaticFiles } from '../Utils/Types';

function createRequestHandler({ data, css }: StaticFiles) {
  return (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === '/api/data') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } else if (req.url === '/styles.css') {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(css);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(serveHtml());
    }
  };
}

class Server {
  private readonly server: http.Server;
  private readonly staticFiles: StaticFiles;

  constructor(staticFiles: StaticFiles) {
    this.staticFiles = staticFiles;
    this.server = http.createServer(createRequestHandler(this.staticFiles));
  }

  public listen(port: number): void {
    this.server.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  }
}

export default Server;