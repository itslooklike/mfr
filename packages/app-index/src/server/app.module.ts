import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import path from 'path'

import { AppController } from './app.controller'
import { WidgetsModule } from './widgets/widgets.module'

@Module({
  imports: [
    WidgetsModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__ROOT_DIR__, 'static'),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__ROOT_DIR__, 'build/client'),
      serveRoot: __PUBLIC_PATH_NS__,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
