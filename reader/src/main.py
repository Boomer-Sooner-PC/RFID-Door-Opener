import json
from queries import *
import threading
from interface import *


config = json.load(open("./.conf"))
ip = config['ip']
password = config['password']

queryCards(ip, password)
print("Ready...")

while True:
    read = input()
    opened = False
   
    cards = json.load(open("./src/data/cards.json", 'r'))

    for card in cards:
        if int(read) == (card['number']):
            opened = True
            break
   
    if opened:
        print("opening")
        accept()
    else:
        reject()
        print("rejected")

    log(ip, password, read, opened);
    queryCards(ip, password)
    # logThread = threading.Thread(target=log, args=[ip, password, read, opened], kwargs={})
    # logThread.start()
    # cardThread = threading.Thread(target=queryCards, args=[ip, password], kwargs={})