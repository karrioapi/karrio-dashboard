#!/usr/bin/env bash

docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i https://raw.githubusercontent.com/purplship/purplship-server/main/schemas/openapi.json \
  -g typescript-axios \
  -o /local/api/generated \
  --additional-properties=typescriptThreePlus=true \
  --additional-properties=enumPropertyNaming=snake_case
