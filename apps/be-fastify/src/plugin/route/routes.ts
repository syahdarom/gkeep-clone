import type { FastifyPluginAsync } from 'fastify';

import okRoute from './ok.route.js';

const routes: FastifyPluginAsync<{
  prefixRoutePath: string;
}> = async (fastify, { prefixRoutePath }) => {
  await fastify.register(okRoute, {
    prefixRoutePath,
  });
};

export default routes;
