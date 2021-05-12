#!/bin/bash

cd packages/app-index && EXPRESS_HOST=0.0.0.0 npm run build:start &
cd packages/widget-header && npm run build && npm run server
