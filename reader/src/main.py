import json
from queries import *
import threading


config = json.load(open("./.conf"))
ip = config['ip']
password = config['password']

queryCards(ip, password)

while True:
    read = input()
    opened = False
    
    cards = json.load(open("./src/data/cards.json", 'r'))

    for card in cards:
        if (read) == str(card['number']):
            opened = True
            break
    
    if opened: print("opening")
    else: print("rejected")

    logThread = threading.Thread(target=log, args=[ip, password, read, opened], kwargs={})
    logThread.start()
    cardThread = threading.Thread(target=queryCards, args=[ip, password], kwargs={})