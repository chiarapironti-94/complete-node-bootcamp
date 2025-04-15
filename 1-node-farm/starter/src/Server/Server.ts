import * as http from 'http';

class Server {
  private readonly server: http.Server;

  constructor() {
    this.server = http.createServer(this.requestHandler);
  }

  private requestHandler(
    req: http.IncomingMessage,
    res: http.ServerResponse
  ): void {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hello</title>
      </head>
      <body>
        <h1>Hello from the <u>Node server</u>!</h1>
      </body>
    </html>
  `);
  }

  public listen(port: number): void {
    this.server.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  }
}

export default Server;
