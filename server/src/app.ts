import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import userRouter from '@routes/userRoutes';
import AppError from './errors/apiError';
import globalErrorHandler from './errors/errorController';

const app = express();

// MIDDLEWARES
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(
  '/api',
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour.',
  })
);
app.use(express.json({ limit: '10kb' }));

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
