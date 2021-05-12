declare module '*.svg' {
  const content: string
  export default content
}

declare const __APP_NAME__: string
declare const __ROOT_DIR__: string
declare const __PUBLIC_PATH_NS__: string

declare type TWidgetNames = 'header'

declare type TWidgetPreset = [TWidgetNames, object?][]

declare type TWidgetResponse = { html?: string; linkCss?: string; linkJs?: string }
