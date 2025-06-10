#!/bin/bash
if [ "$DEPLOYMENT_GROUP_NAME" == "Pirika_Server_Deploy" ]; then
  set -e

  echo $HOME > /tmp/hola.txt
  echo $DOTNET_ROOT >> /tmp/hola.txt
  echo $PATH >> /tmp/hola.txt

  #ACTUALIZACION PROYECTO
  rm -rf /opt/pirika/publish
  mkdir -p /opt/pirika/publish
  cd /opt/codedeploy-agent/deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive/Server
  sudo dotnet publish Server.csproj -c Release -o ./publish
  
fi