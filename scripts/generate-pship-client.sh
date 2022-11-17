#!/usr/bin/env bash
branch="${1:=main}"

docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i "https://raw.githubusercontent.com/karrioapi/karrio/${branch}/server/schemas/openapi.json" \
  -g typescript-axios \
  -o /local/karrio/rest/generated \
  --additional-properties=typescriptThreePlus=true \
  --additional-properties=modelPropertyNaming=snake_case \
  --additional-properties=useSingleRequestParameter=True

rm -rf karrio/rest/generated/.openapi-generator/ \
  karrio/rest/generated/.openapi-generator-ignore \
  karrio/rest/generated/.gitignore \
  karrio/rest/generated/.npmignore \
  karrio/rest/generated/git_push.sh
