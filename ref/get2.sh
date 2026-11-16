#!/bin/bash
D=/home/user/site/public/assets/logos
get(){ slug=$1; shift; for t in "$@"; do enc=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$t"); curl -sL --max-time 30 -A "nga-site-build/1.0" -o /tmp/l.svg "https://commons.wikimedia.org/wiki/Special:FilePath/$enc"; if head -c 300 /tmp/l.svg | grep -qi "<svg\|<?xml"; then cp /tmp/l.svg $D/$slug.svg; echo "OK $slug <- $t ($(stat -c%s $D/$slug.svg)b)"; return; fi; sleep 3; done; echo "FAIL $slug"; }
get disney "Disney Wish Logo-Gold.svg" "Disney Fantasy logo.svg"
get marriott "Marriott International.svg" "Marriott Logo.svg"
get air-india "Air India 2023.svg" "Air India logo (2007–2023).svg"
get indigo "IndiGo Airlines logo.svg"
get maersk "Maersk Group Logo.svg"
get cunard "Common house flag of the Cunard-White Star Line.svg"
