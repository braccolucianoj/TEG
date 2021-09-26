#!/bin/bash

mkdir -p dist
cp -r ./env ./dist/env
NODE_ENV=production tsc -p .