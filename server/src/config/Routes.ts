import authRouter from '@src/routes/authRoute';

module.exports = (app: any) => {
  app.use('/api/v1/auth', authRouter);
};
