#!/usr/bin/env bash
branch="${1:=main}"

docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i "https://raw.githubusercontent.com/purplship/purplship/${branch}/server/schemas/openapi.json" \
  -g typescript-fetch \
  -o /local/src/api/generated \
  --additional-properties=typescriptThreePlus=true \
  --additional-properties=modelPropertyNaming=snake_case \
  --additional-properties=useSingleRequestParameter=True

rm -rf src/api/generated/index.ts \
  src/api/generated/apis/index.ts \
  src/api/generated/.openapi-generator-ignore \
  src/api/generated/.openapi-generator/
