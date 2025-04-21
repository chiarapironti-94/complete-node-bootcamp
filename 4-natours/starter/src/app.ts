import express from 'express';
import { SERVER_PORT } from './utils';
import tourRouter from './routes/tourRoutes';

const app = express();
app.use(express.json()).use('/api/v1/tours', tourRouter);

app.get('/', (_, response) => {
  response.status(200).send('Hello from the server!');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}...`);
});
