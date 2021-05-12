import { Injectable, HttpService, Dependencies } from '@nestjs/common'

type TWidgetMap = {
  [key: string]: {
    url?: string
    params?: {
      [_: string]: string | string[] | boolean
    }
  }
}

const WIDGETS_MAP: TWidgetMap = {
  header: {
    url: 'http://localhost:4001/header',
  },
}

type WidgetConfig = {
  name: string
  params?: object
}

type WidgetResponse = {
  html: string
  linkCss: string
  linkJs: string
}

type WidgetsResponse = {
  [key: string]: WidgetResponse
}

@Injectable()
@Dependencies(HttpService)
export class WidgetsService {
  constructor(private httpService: HttpService) {}

  getWidget(name: string, params?: any) {
    const url = WIDGETS_MAP[name]?.url
    const widgetParams = { ...WIDGETS_MAP[name]?.params, ...params }

    return this.httpService.get(url, { params: widgetParams }).toPromise()
  }

  async getWidgets(widgetConfigs: WidgetConfig[]): Promise<WidgetsResponse> {
    const promises = widgetConfigs.map((config) => this.getWidget(config.name, config.params))

    const [...responses] = await Promise.allSettled(promises)

    const widgets: WidgetsResponse = {}

    const rejectedWidgets: string[] = []

    responses.forEach((response, i) => {
      const widgetName = widgetConfigs[i].name

      if (response.status === 'fulfilled') {
        console.log(`[🤖][${widgetName}] загружен`)
        widgets[widgetName] = response.value.data
      } else if (response.status === 'rejected') {
        rejectedWidgets.push(widgetName)
        console.log(`[💩][${widgetName}] не загружен`)
      }
    })

    return widgets
  }
}
