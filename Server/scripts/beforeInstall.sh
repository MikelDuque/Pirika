#!/bin/bash
pwd > /var/log/hola.txt

#ACTUALIZACION PROYECTO
rm -rf /opt/pirika/publish
mkdir -p /opt/pirika/publish
cd /opt/codedeploy-agent/deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive/*/Server
dotnet publish Server.csproj -c Release -o ./publish