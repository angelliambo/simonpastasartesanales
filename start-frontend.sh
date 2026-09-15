#!/bin/bash
cd packages/portal/frontend
exec pnpm dev > dev-frontend.log 2>&1
