import json
def validate(data):
    if not isinstance(data,dict) or "result" not in data: raise ValueError("Unexpected response format.")
    return data
def main():
    q=input("Search term for demo: ").strip()
    if not q: print("Enter a search term.");return
    sample={"source":"SIMULATED DEMO DATA — not live","query":q,"result":{"status":"success","message":"Example response for learning JSON."}}
    try:print(json.dumps(validate(sample),indent=2));print("This result was simulated, not fetched online.")
    except ValueError as e:print("Response error:",e)
if __name__=="__main__":main()
