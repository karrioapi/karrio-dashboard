#!/usr/bin/env bash
branch="${1:=main}"

docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i "https://raw.githubusercontent.com/purplship/purplship/${branch}/server/schemas/openapi.json" \
  -g typescript-fetch \
  -o /local/purplship/rest/generated \
  --additional-properties=typescriptThreePlus=true \
  --additional-properties=modelPropertyNaming=snake_case \
  --additional-properties=useSingleRequestParameter=True

rm -rf purplship/rest/generated/index.ts \
  purplship/rest/generated/apis/index.ts \
  purplship/rest/generated/.openapi-generator-ignore \
  purplship/rest/generated/.openapi-generator/
