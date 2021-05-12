import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'

import { AppModule } from './app.module'

const chunksMiddleware = (chunks) => (req, res, next) => {
  res.locals.chunks = chunks
  next()
}

const SERVER_HOST = process.env.SERVER_HOST || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || __APP_SERVER_PORT__

export default async function bootstrap(chunks) {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(chunksMiddleware(chunks))
  await app.listen(SERVER_PORT, SERVER_HOST, () => {
    logger.log(`[${__APP_ID__}] start on: http://${SERVER_HOST}:${SERVER_PORT}`)
  })
}
