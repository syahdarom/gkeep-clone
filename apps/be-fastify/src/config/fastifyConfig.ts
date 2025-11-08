import Fastify from 'fastify';

import appPlugin from '@/plugin/app.js';
import type { TFastifyHttpOptions } from '@/types/server.js';
import envConfig from './envConfig.js';

const basePath = '/api';

async function setupFastifyHttp(opts: TFastifyHttpOptions = {}) {
  const defaultLogger =
    envConfig.app.nodeEnv === 'production'
      ? {
          level: envConfig.logger.logLevel,
        }
      : {
          level: envConfig.logger.logLevel,
          transport: {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
        };

  const fastify = Fastify({
    ...opts,
    logger: opts?.logger ? opts.logger : defaultLogger,
  });

  try {
    await fastify.register(appPlugin, {
      prefixRoutePath: basePath,
    });

    return fastify;
  } catch (error) {
    fastify.log.fatal(error);
    process.exit(1);
  }
}

export default setupFastifyHttp;
