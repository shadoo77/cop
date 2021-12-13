import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import CONSTANTS from './contants/constants';
import RoutesLoader from './loaders/routesLoader';
import constants from './contants/constants';
import { Logger } from './logger';

const app = express();

app.use(cors());

app.use(
  express.urlencoded({
    extended: false,
    limit: '50mb',
    parameterLimit: 1000000,
  })
);
app.use(express.json());

// access for anywhere on the server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  return next();
});

// load routes
RoutesLoader(app);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(`${__dirname}/client/build/index.html`))
  );
}

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error(`Route [ ${req.url} ] is not found!`);
  error.status = 404;
  return next(error);
});

app.use((error: any, req: Request, res: Response) =>
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  })
);

// error handler. Keep this outside of try/catch block so that an error code is sent
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  Logger.error(
    'Unexpected error: ',
    err ? `${err.status}: ${err.message}` : 'unknown error'
  );

  // render the error page or let Express handle the error if the response was already sent to the client
  if (res.headersSent) {
    return next(err);
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error =
    req.app.get('env') === 'development' ||
    req.app.get('env') === constants.LOCALHOST
      ? err
      : {};
  res.status(err.status || 500);
  return res.sendStatus(err.status);
});

// Create db_file if not exist
if (!fs.existsSync(path.join(`${__dirname}/mock-db`, CONSTANTS.DB_FILE_NAME))) {
  fs.appendFile(
    path.join(`${__dirname}/mock-db`, CONSTANTS.DB_FILE_NAME),
    '[]',
    () => Logger.info(`${CONSTANTS.DB_FILE_NAME} created!`)
  );
}

const server = {
  host: 'http://localhost',
  port: 3123,
};

const port = process.env.PORT || server.port;
app.listen(port, () => {
  Logger.verbose(`Listening on ${server.host}:${port} ..`);
});

export default app;
