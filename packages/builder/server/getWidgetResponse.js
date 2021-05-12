const formatClientAssets = require('./utils/formatClientAssets')

/**
 * @param {string} id - id виджета
 * @param {*} App - Svelte компонент приложения
 * @param {*} props - объект с пропсами для гидрации
 * @param {*} chunks - js, css чанки
 */
function getWidgetResponse(id, App, props, chunks) {
  const { js, css } = chunks

  const appHtml = App.render(props).html

  const { linkCss, linkJs } = formatClientAssets({ js, css })

  const html = `<div data-${id}='${JSON.stringify(props)}'>${appHtml}</div>`

  return {
    html,
    linkCss,
    linkJs,
  }
}

module.exports = getWidgetResponse
