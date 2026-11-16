#!/bin/bash
D=/home/user/site/public/assets/logos
mkdir -p $D
get(){ slug=$1; shift; for t in "$@"; do enc=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$t"); curl -sL --max-time 30 -A "nga-site-build/1.0" -o /tmp/l.svg "https://commons.wikimedia.org/wiki/Special:FilePath/$enc"; if head -c 300 /tmp/l.svg | grep -qi "<svg\|<?xml"; then cp /tmp/l.svg $D/$slug.svg; echo "OK $slug <- $t ($(stat -c%s $D/$slug.svg)b)"; return; fi; sleep 2; done; echo "FAIL $slug"; }
get msc "MSC Cruises de logo.svg" "MSC Cruises logo.svg"
get royal-caribbean "Royal Caribbean logo (2024).svg" "Royal Caribbean logo.svg"
get carnival "Carnival Cruise Line logo.svg" "Carnival Corporation logo.svg" "Carnival Cruise Line Logo.svg"
get norwegian "Norwegian-Cruise-Line-Logo.svg"
get costa "Costa-logo-2021.svg"
get disney "Disney Cruise Line logo.svg" "Disney Cruise Line.svg"
get princess "Princess Cruises Wordmark.svg"
get celebrity "Celebrity-Cruises-Logo.svg"
get holland-america "Holland America Line logo.svg" "Holland America Line.svg"
get viking "Viking Cruises logo.svg" "Viking Cruises Logo.svg"
get cunard "Cunard logo.svg" "Cunard Line logo.svg"
get p-and-o "P&O Cruises logo.svg" "P&O Cruises Logo.svg"
get marriott "Marriott International logo.svg" "Marriott International 2019.svg" "Marriott logo.svg"
get hilton "Hilton Worldwide logo.svg" "Hilton logo.svg"
get air-india "Air India logo.svg" "Air India Logo.svg"
get indigo "IndiGo logo.svg" "IndiGo Logo.svg"
get emirates "Emirates logo.svg" "Emirates Logo.svg"
get maersk "Maersk Group logo.svg" "Maersk logo.svg" "A.P. Moller - Maersk logo.svg"
