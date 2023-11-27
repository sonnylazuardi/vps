#!/bin/bash

git fetch origin
git reset --hard origin/main
bun install
pm2 restart "bun https.ts"