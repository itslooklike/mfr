import { Controller, Get, Res, Req } from '@nestjs/common'
import { getWidgetResponse } from '@mfr/builder/server'
import type { Response } from 'express'

// import App from '../app/App.svelte'
const App = require('../app/App.svelte').default

@Controller()
export class AppController {
  constructor() {}

  @Get()
  healthCheck(@Res() res: Response) {
    res.status(200).send()
  }

  @Get('/header')
  async getHello(@Req() req, @Res() res: Response) {
    const { name } = req.query

    const appProps = {
      name,
    }

    const result = getWidgetResponse(__APP_ID__, App, appProps, res.locals.chunks)

    res.status(200).send(result)
  }
}
