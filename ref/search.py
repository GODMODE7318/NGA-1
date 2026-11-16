import json,urllib.request,urllib.parse,sys
brands={"msc":"MSC Cruises","royal-caribbean":"Royal Caribbean International","carnival":"Carnival Cruise Line","norwegian":"Norwegian Cruise Line","costa":"Costa Cruises","disney":"Disney Cruise Line","princess":"Princess Cruises","celebrity":"Celebrity Cruises","holland-america":"Holland America Line","viking":"Viking Cruises","cunard":"Cunard","p-and-o":"P&O Cruises","marriott":"Marriott International","hilton":"Hilton Hotels","air-india":"Air India","indigo":"IndiGo airline","emirates":"Emirates airline","maersk":"Maersk"}
out={}
for slug,name in brands.items():
    q=urllib.parse.quote(f"{name} logo filetype:svg")
    url=f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=12&format=json&srsearch={q}"
    req=urllib.request.Request(url,headers={"User-Agent":"nga-site-build/1.0"})
    try:
        d=json.load(urllib.request.urlopen(req,timeout=20))
        titles=[r["title"] for r in d["query"]["search"] if r["title"].lower().endswith(".svg")]
    except Exception as e:
        titles=[f"ERR {e}"]
    out[slug]=titles[:6]
    print(slug, titles[:6])
