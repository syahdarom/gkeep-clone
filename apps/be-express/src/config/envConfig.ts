export const envConfig = {
  app: {
    nodeEnv: (process.env.NODE_ENV ?? '').toLowerCase(),
  },
  server: {
    port: Number(process.env.PORT),
  },
  logger: {
    logLevel: (process.env.LOG_LEVEL ?? '').toLowerCase(),
  },
};
