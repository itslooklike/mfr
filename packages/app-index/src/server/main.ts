import { NestFactory } from '@nestjs/core'
import compression from 'compression'
import { createProxyMiddleware } from 'http-proxy-middleware'
import type { Parameters } from 'universal-webpack'

import { AppModule } from './app.module'
import { formatClientAssets } from './helpers/formatClientAssets'

import { name } from '../../package.json'

const APP_PORT = 7756

const { WIDGETS_ENDPOINTS, EXPRESS_HOST = 'localhost' } = process.env

const endpointConfig = JSON.parse(WIDGETS_ENDPOINTS || '{}')

export default async function bootstrap(containerAssets: Parameters) {
  const app = await NestFactory.create(AppModule)

  global.containerAssets = formatClientAssets(containerAssets.chunks())

  app.use(compression())
  app.use(
    '/widget/@mfr/:id',
    createProxyMiddleware({
      changeOrigin: true,
      router: (req) => {
        const widgetName = req.params?.id
        const result = endpointConfig[widgetName]
        return result
      },
    })
  )

  await app.listen(APP_PORT, EXPRESS_HOST, () => {
    console.log(`[ok][app start][${name}]: http://${EXPRESS_HOST}:${APP_PORT}`)
  })
}
