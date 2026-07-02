#!/bin/bash
cd /home/aliambo/git/ZenithNexus/packages/portal/frontend
exec node node_modules/.bin/react-app-rewired start > dev-frontend.log 2>&1
