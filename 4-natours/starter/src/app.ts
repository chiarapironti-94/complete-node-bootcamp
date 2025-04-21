import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes';
import userRouter from './routes/userRoutes';

const app = express();
app
  .use(morgan('dev'))
  .use(express.json())
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
