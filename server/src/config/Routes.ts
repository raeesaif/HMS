import authRouter from '@src/routes/authRoute';
import departmentRouter from '@src/routes/departmentRoute';
import specialtyRouter from '@src/routes/specialtyRoute';
import hospitalRoute from '@src/routes/hospitalRoute';
module.exports = (app: any) => {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/departments', departmentRouter);
  app.use('/api/v1/specialties', specialtyRouter);
  app.use('/api/v1', hospitalRoute);
};
