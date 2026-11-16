#!/bin/bash
D=/home/user/site/public/assets/logos
get(){ slug=$1; shift; for t in "$@"; do enc=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$t"); curl -sL --max-time 30 -A "nga-site-build/1.0" -o /tmp/l.svg "https://commons.wikimedia.org/wiki/Special:FilePath/$enc"; if head -c 300 /tmp/l.svg | grep -qi "<svg\|<?xml"; then cp /tmp/l.svg $D/$slug.svg; echo "OK $slug <- $t"; return; fi; sleep 3; done; echo "FAIL $slug"; }
get carnival "Carnival Cruise Line Logo 2019.svg" "Carnival Logo.svg" "Carnival Cruise Line.svg" "Carnival Cruise Line Logo Horizontal.svg"
get holland-america "Holland America Line Logo.svg" "HAL logo.svg" "Holland America Line 2022.svg"
get viking "Viking Cruises Logo.svg" "Viking Ocean Cruises logo.svg" "Viking Ocean Cruises.svg"
get p-and-o "P&O Cruises Logo.svg" "P&O Cruises logo 2019.svg" "P&O Cruises.svg" "P&O Cruises Logo 2019.svg"
