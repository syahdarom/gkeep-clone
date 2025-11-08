import type { FastifyPluginAsync } from 'fastify';

import errorHandler from './route-handler/errorHandler.js';
import routesPlugin from './route/routes.js';

const app: FastifyPluginAsync<{
  prefixRoutePath: string;
}> = async (fastify, { prefixRoutePath }) => {
  await fastify.register(errorHandler);
  await fastify.register(routesPlugin, {
    prefixRoutePath,
  });
};

export default app;
