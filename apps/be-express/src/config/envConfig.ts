export const envConfig = {
  app: {
    nodeEnv: process.env.NODE_ENV ?? '',
  },
  server: {
    hostname: process.env.HOSTNAME ?? '',
    port: Number(process.env.PORT),
  },
  logger: {
    logLevel: process.env.LOG_LEVEL ?? '',
  },
};
