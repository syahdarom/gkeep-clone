import 'dotenv/config';

import express from 'express';

import { envConfig } from './config/envConfig';
import errorHandlerMiddleware from './middleware/errorHandler.middleware';
import httpLoggerMiddleware from './middleware/httpLogger.middleware';
import requestIdMiddleware from './middleware/requestId.middleware';
import { SuccessHttpResponseWithData } from './model/http';
import logger from './util/logger';

const expressApp = express();
const mainRouter = express.Router();

const basePath = '/api';

mainRouter.use(requestIdMiddleware);
mainRouter.use(httpLoggerMiddleware);

mainRouter.get('/ok', (req, res) => {
  logger.info('Incoming a request to /ok', {
    requestId: req.requestId,
    logOrigin: {
      type: 'controller',
      name: 'ok',
    },
  });

  res.status(200).json(
    new SuccessHttpResponseWithData(200, {
      message: 'ok',
    }),
  );

  logger.info('The request is processed successfully from /ok', {
    requestId: req.requestId,
    logOrigin: {
      type: 'controller',
      name: 'ok',
    },
  });
});

expressApp.use(basePath, mainRouter);
expressApp.use(errorHandlerMiddleware);

const hostname =
  envConfig.app.nodeEnv === 'production' ? '0.0.0.0' : 'localhost';

const { port } = envConfig.server;

if (!port) throw new Error('The PORT environment variable is invalid');

const serverExpressApp = expressApp.listen(port, hostname, (err) => {
  if (err) {
    logger.error(err);
    return;
  }

  logger.info(`Server is listening on http://${hostname}:${port}${basePath}`);
});

async function gracefulServerShutdown(signal: string) {
  try {
    logger.info(`Received ${signal}. Server is closing...`);
    await new Promise((resolve, reject) => {
      serverExpressApp.close((error) => {
        if (error) reject(error);
        resolve(null);
      });
    });
    logger.info(`Received ${signal}. Server is closed successfully`);
  } catch (error) {
    logger.error({
      message: error,
      details: `Received ${signal}. Server failed to closed`,
    });
    process.exit(1);
  }
}

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, gracefulServerShutdown);
}

process.on('uncaughtException', (error, origin) => {
  logger.error({
    message: error,
    details: 'An uncaughtException occurred',
    origin,
  });
  gracefulServerShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  logger.error({
    message: reason,
    details: 'An unhandledRejection occurred',
  });
  gracefulServerShutdown('unhandledRejection');
});
