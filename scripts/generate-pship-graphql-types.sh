#!/usr/bin/env bash

apollo-codegen generate "src/graphql/queries.ts" \
  --schema "scripts/graphql.json" \
  --target typescript \
  --output "src/graphql/types.ts"
