const { buildedServerFilePath, clientChunksPath } = require('@mf/builder')

const server = require(buildedServerFilePath).default
const chunks = require(clientChunksPath)

server(chunks.client)
