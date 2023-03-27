import express from 'express';
import morgan from 'morgan';
import userRouter from '@routes/userRoutes';
import AppError from './errors/apiError';
import globalErrorHandler from './errors/errorController';

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

// ROUTE MOUNTING
app.use('/api/v1/testing', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: `You've successfully hit the /api/v1/testing endpoint!`,
    },
  });
});

app.use('/api/v1/users', userRouter);

// ERROR HANDLING
app.all('*', (req, _, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

export default app;
