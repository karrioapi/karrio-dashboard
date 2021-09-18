#!/usr/bin/env bash

apollo-codegen generate "graphql/queries.ts" \
  --schema "scripts/graphql.json" \
  --target typescript \
  --output "graphql/types.ts"
