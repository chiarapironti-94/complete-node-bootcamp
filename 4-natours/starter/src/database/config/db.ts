import mongoose from 'mongoose';

const DB = process.env.DATABASE?.replace(
  '<DB_PASSWORD>',
  process.env.DATABASE_PASSWORD as string
) as string;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection with the DB established!');
  });
