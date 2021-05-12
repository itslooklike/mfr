const paths = require('./paths')
const { appID } = require(paths.appCliSettingsPath)

// Проверяем, что все необходимые настройки переданы корректно
const checkSettings = (settings) => {
  const { side } = settings

  if (side !== 'client' && side !== 'server') {
    throw new Error('Не указан `WEBPACK_SIDE` при сборке (client|server). Вы указали: ' + side)
  }

  if (appID.includes('-')) {
    // appID может использоваться как имя переменной js
    // обычно он выглядит так: `__my_widget_name__`
    throw new Error('`-` (тире/минус) нельзя использовать в `appID`. Вы указали: ' + appID)
  }

  if (appID !== appID.toLowerCase()) {
    // appID может использоваться как HTML атрибут
    // браузер все ловеркейсит принудительно
    throw new Error('`appID` должен быть в ловер-кейсе. Вы указали: ' + appID)
  }

  if (!appID || appID.toLowerCase() === '__app_name_here__') {
    // throw new Error('Укажите имя в `appID`')
  }
}

module.exports = checkSettings
