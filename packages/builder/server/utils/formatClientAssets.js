function formatClientAssets({ css = [], js = [] }) {
  const linkCss = css.map((style) => `<link rel="stylesheet" href="${style}" />`).join('')
  const linkJs = js.map((script) => `<script defer src="${script}"></script>`).join('')

  return { linkCss, linkJs }
}

module.exports = formatClientAssets
