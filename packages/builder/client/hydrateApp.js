export function hydrateApp(appId, App) {
  const nodes = document.querySelectorAll(`[data-${appId}]`)

  nodes.forEach((node) => {
    const propJson = node.dataset[appId]
    const props = JSON.parse(propJson)

    // INFO: есть подозрение, что вычистит GC, если по непонятным причинам отваливался JS
    // то нужно сохранять куда-то инстанс, и хранить его на уровне приложения
    new App({
      target: node,
      hydrate: true,
      props,
    })
  })
}
