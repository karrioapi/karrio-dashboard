#!/usr/bin/env bash
branch="${1:=main}"

curl https://raw.githubusercontent.com/purplship/purplship/${branch}/server/schemas/graphql.json --output graphql.json

apollo-codegen generate "src/graphql/queries.ts" \
  --schema "./graphql.json" \
  --target typescript \
  --output "src/graphql/types.ts"

rm -f graphql.json
