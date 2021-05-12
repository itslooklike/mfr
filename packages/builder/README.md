# builder

CLI обертка над webpack и его конфигом, билдит `svelte` для сервера и клиента

```json
{
  "start": "NODE_ENV=production fmb"
}
```

Настройки указываются в `mfb-cli.json` (должен быть в корне проекта)

```json
{
  "appID": "widget-something",
  "port": 4040,
  "devAppPort": 8081
}
```

Закидывает в приложение переменные

- `__APP_ID__` - уникальное название виджета (используется для маунта ноды и хранения состояния)
- `__APP_SERVER_PORT__` - порт для запуска
- `__APP_CLIENT_PATH__` - путь к собранному приложению
- `__APP_PUBLIC_PATH__` - путь к статике (css,js,img и прочее), нужен для миддлевары статики

## ENV

ENV переменные, которые нужно прокинуть в `webpack.DefinePlugin` нужно именовать с префиксом `MFB_`

## helper функции

- `client` - функции только для клиента
  - нельзя использовать `require`
  - должны быть `ESM`
- `server` - функции только для сервера

## link

```sh
npm link

# в приложении, к которому нужно прилинковать билдер
npm link @mfr/builder
npm unlink @mfr/builder --no-save && npm i
```
