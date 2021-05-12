/**
 * Формируем чанки из манифеста
 * https://github.com/danethurber/webpack-manifest-plugin/issues/181#issuecomment-467907737
 */
const generateChunks = (clientPublicPath) => {
  return (seed, files) => {
    const entrypoints = new Set()
    files.forEach((file) =>
      ((file.chunk || {})._groups || []).forEach((group) => entrypoints.add(group))
    )
    const entries = [...entrypoints]
    const entryArrayManifest = entries.reduce((acc, entry) => {
      const name = (entry.options || {}).name || (entry.runtimeChunk || {}).name
      const files = []
        .concat(
          ...(entry.chunks || []).map((chunk) => {
            return [...chunk.files].map((path) => clientPublicPath + path)
          })
        )
        .filter(Boolean)

      const cssFiles = files.filter((item) => item.endsWith('.css'))

      const jsFiles = files.filter((item) => item.endsWith('.js'))

      return name
        ? {
            ...acc,
            [name]: {
              css: cssFiles,
              js: jsFiles,
            },
          }
        : acc
    }, seed)
    return entryArrayManifest
  }
}

module.exports = generateChunks
