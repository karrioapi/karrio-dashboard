#!/usr/bin/env bash
branch="${1:=main}"

docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i "https://raw.githubusercontent.com/karrioapi/karrio/${branch}/server/schemas/openapi.json" \
  -g typescript-fetch \
  -o /local/karrio/rest/generated \
  --additional-properties=typescriptThreePlus=true \
  --additional-properties=modelPropertyNaming=snake_case \
  --additional-properties=useSingleRequestParameter=True

rm -rf karrio/rest/generated/index.ts \
  karrio/rest/generated/apis/index.ts \
  karrio/rest/generated/.openapi-generator-ignore \
  karrio/rest/generated/.openapi-generator/
