import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes';
import userRouter from './routes/userRoutes';
import { PUBLIC_FOLDER_PATH } from './utils/utils';

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app
  .use(express.json())
  .use(express.static(PUBLIC_FOLDER_PATH))
  .use('/api/v1/tours', tourRouter)
  .use('/api/v1/users', userRouter);

app.get('/', (_, response) => {
  response.status(200).json('Hello from the server!');
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

export default app;
