import type { Chunks } from 'universal-webpack'

export function formatClientAssets(assets: Chunks) {
  const linkCss = Object.keys(assets.styles)
    .reverse()
    .map((style) => `<link rel="stylesheet" href="${assets.styles[style]}" />`)
    .join('')

  const linkJs = Object.keys(assets.javascript)
    .map((script) => `<script defer src="${assets.javascript[script]}"></script>`)
    .join('')

  return { linkCss, linkJs }
}
