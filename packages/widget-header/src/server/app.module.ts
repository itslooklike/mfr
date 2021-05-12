import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'

import { AppController } from './app.controller'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: __APP_CLIENT_PATH__,
      serveRoot: __APP_PUBLIC_PATH__,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
