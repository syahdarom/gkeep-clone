import type { FastifyBaseLogger, FastifyHttpOptions } from 'fastify';
import type { Server } from 'node:http';

export type TFastifyHttpOptions = FastifyHttpOptions<Server, FastifyBaseLogger>;
