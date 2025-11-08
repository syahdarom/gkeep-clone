import { describe, expect, test } from 'vitest';

import setupFastifyHttp from '@/config/fastifyConfig';
import okRoute from './ok.route';

describe('GET /ok', () => {
  test('should return a successful response', async () => {
    // Arrange
    const fastify = await setupFastifyHttp();

    await fastify.register(okRoute, {
      prefixRoutePath: '',
    });

    // Action
    const response = await fastify.inject({
      method: 'GET',
      path: '/ok',
    });

    // Assert
    expect(response.statusCode).toBe(200);

    expect(JSON.parse(response.body)).toStrictEqual({
      success: true,
      code: 200,
      data: {
        message: 'ok',
      },
    });
  });
});
