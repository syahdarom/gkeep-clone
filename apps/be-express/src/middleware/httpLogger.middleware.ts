import morgan from 'morgan';

import logger from '@/util/logger';

const httpLoggerMiddleware = morgan(
  (tokens, req, res) =>
    JSON.stringify({
      message: 'HTTP request/response activity',
      requestId: req.requestId,
      httpVersion: tokens['http-version'](req, res),
      method: tokens.method(req, res),
      contentLength: tokens.res(req, res, 'content-length'),
      remoteAddr: tokens['remote-addr'](req, res),
      remoteUser: tokens['remote-user'](req, res),
      responseTime: `${tokens['response-time'](req, res)} ms`,
      status: tokens.status(req, res),
      referrer: tokens.referrer(req, res),
      url: tokens.url(req, res),
      totalTime: `${tokens['total-time'](req, res)} ms`,
      userAgent: tokens['user-agent'](req, res),
    }),
  {
    stream: {
      write: (str) =>
        logger.http({
          ...JSON.parse(str),
          logOrigin: {
            type: 'middleware',
            name: 'httpLogger',
          },
        }),
    },
  },
);

export default httpLoggerMiddleware;
