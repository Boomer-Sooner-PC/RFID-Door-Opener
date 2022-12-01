import RPi.GPIO as GPIO
import time
from gpiozero import Servo

rejectPin = 8
acceptPin = 10
servo = 12

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(servo, GPIO.OUT)
GPIO.setup(rejectPin, GPIO.OUT)
GPIO.setup(acceptPin, GPIO.OUT)
pwm = GPIO.PWM(servo,50)
pwm.start(0)


def reject():
GPIO.output(rejectPin, GPIO.HIGH)
time.sleep(.1)
GPIO.output(rejectPin, GPIO.LOW)
time.sleep(.1)
GPIO.output(rejectPin, GPIO.HIGH)
time.sleep(.1)
GPIO.output(rejectPin, GPIO.LOW)

def accept():
GPIO.output(acceptPin, GPIO.HIGH)
SetAngle(180)
time.sleep(5)
SetAngle(0)
GPIO.output(acceptPin, GPIO.LOW)


def SetAngle(angle):
duty = angle / 18 + 2
GPIO.output(servo, True)
pwm.ChangeDutyCycle(duty)
time.sleep(1)
GPIO.output(servo, False)
pwm.ChangeDutyCycle(0)

# def accept():
#     print("accepted")

# def reject():
#     print("rejected")