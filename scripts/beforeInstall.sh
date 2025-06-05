#!/bin/bash
set -e

#ACTUALIZACION PROYECTO
rm -rf /opt/pirika/publish
mkdir -p /opt/pirika/publish
cd /opt/codedeploy-agent/deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive/
dotnet publish Server.csproj -c Release -o /opt/pirika/publish

systemctl restart pirika