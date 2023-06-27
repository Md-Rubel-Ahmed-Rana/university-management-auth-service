/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, infoLogger } from './shared/logger';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    infoLogger.info('Database connected');
    server = app.listen(config.port, () => {
      infoLogger.info(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error({
      message: 'Database not connected',
      error: error,
    });
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  errorLogger.info('SIGTERM is received');
  server.close();
});
