#!/bin/bash

shopt -s globstar

if [ -d "$INPUT_APP_DIRECTORY" ]; then
    cp -r $INPUT_APP_DIRECTORY ./dist

    if [ -f "/go/server.go" ]; then
        go run /go/server.go &
    else
        echo "server.go not found in current directory"
        exit 1
    fi
fi

for file in $INPUT_INCLUDE; do
    k6 run $INPUT_ARGS "$file"
done
