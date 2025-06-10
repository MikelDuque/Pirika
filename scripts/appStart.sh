#!/bin/bash

if [ "$DEPLOYMENT_GROUP_NAME" == "Pirika_Server_Deploy" ]; then
  systemctl stop pirika

elif [ "$DEPLOYMENT_GROUP_NAME" == "Pirika_Client_Deploy" ]; then
  nginx -t

  if [ $? -ne 0 ]; then
    echo "La configuración de Nginx no es válida."
    exit 1
  fi

  systemctl restart nginx

fi




