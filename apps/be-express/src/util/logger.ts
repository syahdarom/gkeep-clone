import { envConfig } from '@/config/envConfig';
import nodeFs from 'node:fs';
import nodePath from 'node:path';
import winston from 'winston';

const logsDir = nodePath.resolve(process.cwd(), 'logs');

if (!nodeFs.existsSync(logsDir)) nodeFs.mkdirSync(logsDir, { recursive: true });

const { combine, errors, timestamp, colorize, json } = winston.format;

const logger = winston.createLogger({
  level: envConfig.logger.logLevel,
  format: combine(timestamp(), errors({ stack: true }), json()),
});

if (envConfig.app.nodeEnv !== 'production') {
  logger.exceptions.handle(
    new winston.transports.Stream({
      stream: nodeFs.createWriteStream(
        nodePath.resolve(logsDir, 'exceptions-temp.log'),
        {
          flags: 'a',
        },
      ),
    }),
  );

  logger.rejections.handle(
    new winston.transports.Stream({
      stream: nodeFs.createWriteStream(
        nodePath.resolve(logsDir, 'rejections-temp.log'),
        {
          flags: 'a',
        },
      ),
    }),
  );

  logger
    .add(
      new winston.transports.Stream({
        level: 'error',
        stream: nodeFs.createWriteStream(
          nodePath.resolve(logsDir, 'errors-temp.log'),
          {
            flags: 'a',
          },
        ),
      }),
    )
    .add(
      new winston.transports.Stream({
        stream: nodeFs.createWriteStream(
          nodePath.resolve(logsDir, 'combined-temp.log'),
          { flags: 'a' },
        ),
      }),
    )
    .add(
      new winston.transports.Console({
        format: combine(colorize({ all: true })),
      }),
    );
}

export default logger;
