#!/usr/bin/env bash

echo building image purplship/dashboard:$1 ...
docker build \
  -t purplship/dashboard:$1 \
  --build-arg VERSION=$1 \
  -f ./docker/Dockerfile .
