import { Module, HttpModule } from '@nestjs/common'

import { WidgetsService } from './widgets.service'

@Module({
  imports: [
    HttpModule,
  ],
  providers: [WidgetsService],
  exports: [WidgetsService],
})
export class WidgetsModule {}
