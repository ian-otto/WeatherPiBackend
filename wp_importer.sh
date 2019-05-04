#!/bin/sh

IMPORTER_BINARY="./bin/importer.js"
DAILY_URL="https://cefns.nau.edu/~nauws/daily.txt"
OUTPUT_FILE="/tmp/ws_daily.txt"

echo "Beginning import process..."

wget ${DAILY_URL} -O ${OUTPUT_FILE}

if [[ -f ${OUTPUT_FILE} ]]; then
    echo "File found, continuing..."
else
    echo "ERROR: File download failed, or no access"
    exit 1
fi

node ${IMPORTER_BINARY} ${OUTPUT_FILE}