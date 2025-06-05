#!/bin/bash
nginx -t
if [ $? -ne 0 ]; then
  echo "La configuración de Nginx no es válida."
  exit 1
fi

systemctl restart nginx