#!/bin/bash

shopt -s globstar

while getopts "i:p:" flag; do
  case $flag in
  i) INCLUDE="$OPTARG" ;;
  p) PARAMS="$OPTARG" ;;
  esac
done

for file in $INCLUDE; do
  K6_BROWSER_ENABLED=true ./k6 run -e HEADLESS=true $PARAMS "$file"
done
