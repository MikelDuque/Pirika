#!/bin/bash

if [ "$DEPLOYMENT_GROUP_NAME" == "Pirika_Server_Deploy" ]; then
  systemctl stop pirika

elif [ "$DEPLOYMENT_GROUP_NAME" == "Pirika_Client_Deploy" ]; then
  systemctl stop nginx

fi