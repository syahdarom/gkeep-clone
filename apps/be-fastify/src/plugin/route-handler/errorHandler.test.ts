import { test } from 'vitest';

import setupFastifyHttp from '@/config/fastifyConfig';
import ServerError from '@/exception/ServerError';
import errorHandlerPlugin from './errorHandler';

test('should return a 500 error response', async () => {
  // Arrange
  const fastify = await setupFastifyHttp();
  fastify.register(errorHandlerPlugin);

  fastify.get('/error', () => {
    throw new ServerError('Error during processing a request');
  });

  // Action
  const response = await fastify.inject({
    method: 'GET',
    url: '/error',
  });

  // Assert
  expect(response.statusCode).toBe(500);

  expect(JSON.parse(response.body)).toStrictEqual({
    success: false,
    code: 500,
    error: {
      message: 'Something went wrong',
    },
  });
});
