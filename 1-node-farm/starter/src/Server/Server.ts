import * as http from "http";
import { loadJSONData } from "../Utils/Utils";
import { Product } from "../Utils/Types";

function createRequestHandler(data: Product[]) {
  return (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === "/api/data") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <html>
          <body>
            <h1>Hello from the Node server!</h1>
          </body>
        </html>
      `);
    }
  };
}

class Server {
  private readonly server: http.Server;
  private readonly data: Product[];

  constructor() {
    this.data = loadJSONData();
    this.server = http.createServer(createRequestHandler(this.data));
  }

  public listen(port: number): void {
    this.server.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  }
}

export default Server;
