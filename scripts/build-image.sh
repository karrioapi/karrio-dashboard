#!/usr/bin/env bash

echo building image purplship/dashboard:$1 ...
docker build -f ./docker/Dockerfile ./ -t purplship/dashboard:$1
