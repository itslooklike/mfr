const { buildedServerFilePath, clientChunksPath } = require('@mfr/builder')

const server = require(buildedServerFilePath).default
const chunks = require(clientChunksPath)

server(chunks.client)
