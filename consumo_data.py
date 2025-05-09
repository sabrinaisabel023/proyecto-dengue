import requests

def call_api():
    try:
        r = requests.get('https://www.datos.gov.co/resource/dq2k-gub9.json')
        data = r.json()
        return data
    except Exception as e:
        print(e)
        
