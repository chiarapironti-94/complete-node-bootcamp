import app from './app';
import { SERVER_PORT } from './utils';

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}...`);
});
