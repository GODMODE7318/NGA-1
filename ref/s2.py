import json,urllib.request,urllib.parse,time
qs={"carnival":"Carnival Cruise Line logo","disney":"Disney Cruise Line logo","holland-america":"Holland America Line logo","viking":"Viking Ocean Cruises logo","cunard":"Cunard Line logo","p-and-o":"P&O Cruises logo","marriott":"Marriott International logo","air-india":"Air India logo","indigo":"IndiGo logo","maersk":"Maersk logo"}
for slug,q in qs.items():
    time.sleep(6)
    url="https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=20&format=json&srsearch="+urllib.parse.quote(q+" filetype:svg")
    try:
        d=json.load(urllib.request.urlopen(urllib.request.Request(url,headers={"User-Agent":"nga-site-build/1.0"}),timeout=20))
        print(slug,[r["title"] for r in d["query"]["search"] if r["title"].lower().endswith(".svg")][:8])
    except Exception as e: print(slug,"ERR",e)
