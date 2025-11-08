import type { FastifyPluginAsync } from 'fastify';

import { SuccessHttpResponseWithData } from '@/model/http.js';

const okRoute: FastifyPluginAsync<{
  prefixRoutePath: string;
}> = async (fastify, { prefixRoutePath }) => {
  fastify.get(`${prefixRoutePath}/ok`, async (request, reply) => {
    const requestId = request.id;

    const logger = fastify.log.child({
      reqId: requestId,
      req: {
        method: request.method,
        url: request.url,
        host: request.host,
      },
      logFrom: 'route-handler',
    });

    logger.trace('Processing a request...');

    reply
      .header('x-request-id', requestId)
      .status(200)
      .send(
        new SuccessHttpResponseWithData(200, {
          message: 'ok',
        }),
      );

    logger.trace('Response processed successfully');
  });
};

export default okRoute;
