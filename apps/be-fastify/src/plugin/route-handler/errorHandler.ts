import fastifyPlugin from 'fastify-plugin';

import { ErrorHttpResponse } from '@/model/http.js';

export default fastifyPlugin(async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error);

    reply
      .header('x-request-id', request.id)
      .status(500)
      .send(
        new ErrorHttpResponse(500, {
          message: 'Something went wrong',
        }),
      );
  });
});
