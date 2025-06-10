#!/bin/bash
if [ "$DEPLOYMENT_GROUP_NAME" == "Pirika_Server_Deploy" ]; then
  set -e

  #ACTUALIZACION PROYECTO
  rm -rf /opt/pirika/publish
  mkdir -p /opt/pirika/publish
  cd /opt/codedeploy-agent/deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive/Server
  sudo dotnet publish Server.csproj -c Release -o ../Build
  
fi