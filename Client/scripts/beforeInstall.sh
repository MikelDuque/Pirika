#!/bin/bash
set -e

#ACTUALIZACION PROYECTO
rm -rf /opt/pirika
mkdir -p /opt/pirika
cd /opt/codedeploy-agent/deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive/Client
npm install
npm run build