import dotenv from 'dotenv';
import mongoose from 'mongoose';

// HANDLE UNCAUGHT EXCEPTIONS
process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1); // 1 stands for 'uncaught exception';
});

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else {
  dotenv.config({ path: '.env' });
}

import app from './app';

const DB = process.env.DB_URI.replace(
  '<PASSWORD>',
  process.env.DB_PASS
).replace(
  '<DB_TYPE>',
  process.env.NODE_ENV === 'test'
    ? process.env.DB_TYPE_TEST
    : process.env.DB_TYPE
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('server started at http://localhost:' + process.env.PORT);
  console.log('Press CTRL + C to quit....');
});

// HANDLE UNHANDLED REJECTIONS
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // 1 stands for 'uncaught exception';
  });
});
