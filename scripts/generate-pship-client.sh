#!/usr/bin/env bash

docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i https://raw.githubusercontent.com/purplship/purplship-server/main/schemas/openapi.json \
  -g typescript-fetch \
  -o /local/api/generated \
  --additional-properties=typescriptThreePlus=true \
  --additional-properties=modelPropertyNaming=snake_case \
  --additional-properties=useSingleRequestParameter=True
