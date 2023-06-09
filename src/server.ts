import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, infoLogger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    infoLogger.info('Database connected')
    app.listen(config.port, () => {
      infoLogger.info(`Server is running on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error({
      message: 'Database not connected',
      error: error,
    })
  }
}

bootstrap()
