import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import app from './app';

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}...`);
});
