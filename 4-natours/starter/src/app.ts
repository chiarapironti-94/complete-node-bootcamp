import * as fs from 'fs';
import express from 'express';
import { TOURS_SIMPLE_PATH, SERVER_PORT, Tour } from './utils';

const tours: Tour[] = JSON.parse(fs.readFileSync(TOURS_SIMPLE_PATH, 'utf-8'));

const app = express();

app.get('/', (_, response) => {
  response.status(200).send('Hello from the server!');
});

app.get('/api/v1/tours', (_, response) => {
  response.status(200).send(tours);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}...`);
});
