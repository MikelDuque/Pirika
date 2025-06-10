#!/bin/bash
if [ "$DEPLOYMENT_GROUP_NAME" == "Pirika_Client_Deploy" ]; then
  set -e

  #ACTUALIZACION PROYECTO
  rm -rf /var/www/pirika
  mkdir -p /var/www/pirika
  cd /opt/codedeploy-agent/deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive/Client
  npm install
  npm run cdBuild

fi