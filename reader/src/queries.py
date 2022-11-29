import requests
import json
import time


def queryCards(ip, password):
    try:
        text = requests.get(f'{ip}/query/cards?{password}').text
        f = open("./src/data/cards.json", "w")
        f.write(text)
        f.close()
    except: return False

def log(ip, password, id, opened):
    #password timestamp id opened << format
    try:
        requests.get(f'{ip}/query/log?{password}&{int(time.time())}&{id}&{"true" if opened else "false"}')
    except: pass