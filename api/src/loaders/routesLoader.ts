import { Application } from 'express';

import coupon from '../routes/coupon';

export default (app: Application) => {
  app.use('/coupon', coupon);

  return app;
};
