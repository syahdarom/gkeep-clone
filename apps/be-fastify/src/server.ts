import 'dotenv/config';

import envConfig from './config/envConfig.js';
import setupFastifyHttp from './config/fastifyConfig.js';

const fastify = await setupFastifyHttp();

try {
  await fastify.listen({
    port: envConfig.server.port,
    host: envConfig.app.nodeEnv === 'production' ? '0.0.0.0' : 'localhost',
  });
} catch (error) {
  fastify.log.fatal(error);
  process.exit(1);
}

async function closeServerGracefully(signal: string) {
  try {
    fastify.log.info(`Received ${signal} signal. Closing the server...`);
    await fastify.close();
    fastify.log.info(`Received ${signal} signal. The server closed gracefully`);
  } catch (error) {
    fastify.log.error(error, `The server failed to close`);
    process.exit(1);
  }
}

for (const signalName of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signalName, async (signal) => {
    await closeServerGracefully(signal);
    process.exit(0);
  });
}

for (const signalName of ['uncaughtException', 'unhandledRejection'] as const) {
  process.on(signalName, async (error) => {
    fastify.log.fatal(error, `The ${signalName} detected`);
    await closeServerGracefully(signalName);
    process.exit(1);
  });
}
