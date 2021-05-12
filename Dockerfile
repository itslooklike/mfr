FROM node:16-alpine3.11

RUN apk add --no-cache bash

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run boot

ENTRYPOINT ["/bin/bash", "./run-mfr.sh"]
