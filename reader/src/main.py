import json
from queries import *
from interface import *
from pynput import keyboard
import threading


config = json.load(open("./.conf"))
ip = config['ip']
password = config['password']
unlock = config['unlockPassword']

queryCards(ip, password)
print("Ready...")

def check_password():
    print("Password checking enabled")
    while True:
        time.sleep(1)
        returnedPassword = getPassword(ip, password)
        if returnedPassword == password:
            accept()
        
        global stop_threads
        if stop_threads:
            break

stop_threads = False
t = threading.Thread(target=check_password)
t.start()

inp=""

def on_press(key):
    global inp
    global stop_threads
    
    if key == keyboard.Key.esc:
        print("Quitting...")
        stop_threads = True
        return False  # stop listener
    try:
        inp += (key.char)
    except:
        try:
            if (key == keyboard.Key.enter):
                if( not len(inp) > 4): return
                opened = False
                cards = json.load(open("./src/data/cards.json", 'r'))
                id = inp;
                for card in cards:
                    print(card["number"])
                    if str(card['number']) in str(int(inp)):
                        id = str(card['number'])
                        opened = True
                if opened:
                    print("opening")
                    accept()
                else:
                    reject()
                    print("rejected")

                log(ip, password, id, opened);
                inp=""
                queryCards(ip, password)
        except Exception as e:
            print(e)
            pass
    print(inp)



listener = keyboard.Listener(on_press=on_press)
listener.start()
listener.join()    



