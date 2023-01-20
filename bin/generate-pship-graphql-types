#!/usr/bin/env bash
branch="${1:=main}"

curl https://raw.githubusercontent.com/karrioapi/karrio/${branch}/server/schemas/graphql.json --output graphql.json

npx apollo-codegen generate "karrio/graphql/queries.ts" \
  --schema "./graphql.json" \
  --target typescript \
  --output "karrio/graphql/types.ts"

rm -f graphql.json
