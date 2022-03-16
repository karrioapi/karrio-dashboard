#!/usr/bin/env bash

echo building image karrio/dashboard:$1 ...
docker build \
  -t karrio/dashboard:$1 \
  --build-arg VERSION=$1 \
  -f ./docker/Dockerfile .
