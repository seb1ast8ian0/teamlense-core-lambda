#!/bin/bash

# Pfad zur package.json-Datei
PACKAGE_JSON="../lambda/package.json"

chmod +x get_version.sh

# Überprüfe, ob die package.json-Datei vorhanden ist
if [ ! -f "$PACKAGE_JSON" ]; then
  echo "{\"error\": \"package.json not found\"}"
  exit 1
fi

# Lesen des Versionsparameters aus der package.json-Datei
VERSION=$(grep -Eo '"version":.*?[^\\]",' "$PACKAGE_JSON" | cut -d'"' -f4)

# Ausgabe des Versionsparameters als JSON-kodierte Map
echo "{\"version\": \"$VERSION\"}"
