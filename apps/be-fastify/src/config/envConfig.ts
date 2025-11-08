const envConfig = {
  app: {
    nodeEnv: process.env.NODE_ENV,
  },
  server: {
    port: Number(process.env.PORT),
  },
  logger: {
    logLevel: process.env.LOG_LEVEL,
  },
};

export default envConfig;
