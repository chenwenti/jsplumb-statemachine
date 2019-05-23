from time import sleep
from transitions import Machine
from transitions.extensions.states import add_state_features, Tags, Timeout
import threading
from queue import Queue
from threading import *

@add_state_features(Tags, Timeout)
class JsExtenStateMachine(Machine):
    pass

class VolteCallStateMachine(object):
    def __init__(self):
        self.entourage = 0

    #超时处理函数
    def on_enter_waiting(self):
        self.entourage += 1

    def on_timeout_attach(self):
        print ("on_timeout_attach dosomthing")

    def on_timeout_register(self):
        print ("on_timeoute_register do something")

    def on_timeout_callinit(self):
        print ("on_timeoute_callinit do something")

    def on_timeout_callring(self):
        print("on_timeoute_callring do something")

    def on_timeout_callconnect(self):
        print("on_timeoute_callconnect do something")

    def on_timeout_callconnect(self):
        print("on_timeoute_callconnect do something")

    def on_timeout_calldisconnect(self):
        print("on_timeout_calldisconnect do something")

    def on_timeout_callend(self):
        print("on_timeout_callend do something")

    def on_timeout_unregister(self):
        print("on_timeout_unregister do something")

    def on_timeout_deattach(self):
        print("on_timeout_deattach do something")


    # 正常事件处理函数
    def before_start2attach(self):
        print ("before_start2attach do something")

    def before_attach2reg(self):
        print ("before_attach2reg do something")

    def before_attach2callend(self):
        print ("before_attach2callend do something")

    def before_reg2callinit(self):
        print ("before_reg2callinit do something")

    def before_reg2callend(self):
        print ("before_reg2callend do something")

    def before_callring2callend(self):
        print ("before_callring2callend do something")

    def before_callring2calldisconnect(self):
        print ("before_callring2calldisconnect do something")

    def before_callring2callconnect(self):
        print ("before_callring2callconnect do something")

    def timeout2handup(self):
        #产生一个挂机事件
        q.put('calldisconnect')
        print("timeout2handup,lanch a evet calldisconnect")

    def before_callconnect2callend(self):
        print ("before_callconnect2callend do something")

    def before_callconnect2calldisconnect(self):
        print ("before_callconnect2calldisconnect do something")

    def before_calldisconnect2callend(self):
        print ("before_calldisconnect2callend do something")
        print ("is register or is attach")

    def before_callenddeatach(self):
        print ("before_callenddeatach do something")

states = [{'name': 'IDLE'},
          {'name': 'ATTACH','timeout': 10, 'on_timeout':['on_timeout_attach','attach_timeout']},
          {'name': 'REGISTER', 'timeout': 10, 'on_timeout': ['on_timeout_register','register_timeout']},
          {'name': 'CALLINIT','timeout': 10, 'on_timeout': ['on_timeout_callinit','callinit_timeout']},
          {'name': 'CALLRING','timeout': 10, 'on_timeout': ['on_timeout_callring','callring_timeout']},
          {'name': 'CALLCONNECT','timeout': 10, 'on_timeout': ['on_timeout_callconnect','callconnect_timeout']},
          {'name': 'CALLDISCONNECT','timeout': 10, 'on_timeout': ['on_timeout_calldisconnect','calldisconnect_timeout']},
          {'name': 'CALLEND','timeout': 10, 'on_timeout': ['on_timeout_callend']},
          {'name': 'UNREGISTER','timeout': 10, 'on_timeout': ['on_timeout_unregister','unregister_timeout']},
          {'name': 'DEATTACH','timeout': 10, 'on_timeout': ['on_timeout_deattach','deattach_timeout']}
          ]

transitions = [
    { 'trigger': 'start', 'source': 'IDLE', 'dest': 'ATTACH', 'before': 'before_start2attach'},
    { 'trigger': 'attach_success', 'source': 'ATTACH', 'dest': 'REGISTER', 'before': 'before_attach2reg' },
    { 'trigger': 'attach_faile', 'source': 'ATTACH', 'dest': 'CALLEND', 'before': 'before_attach2callend' },
    { 'trigger': 'attach_timeout', 'source': 'ATTACH', 'dest': 'CALLEND', 'before': 'before_attach2callend' },

    { 'trigger': 'register_success', 'source': 'REGISTER', 'dest': 'CALLINIT', 'before': 'before_reg2callinit' },
    { 'trigger': 'register_faile', 'source': 'REGISTER', 'dest': 'CALLEND', 'before': 'before_reg2callend' },
    { 'trigger': 'register_timeout', 'source': 'REGISTER', 'dest': 'CALLEND', 'before': 'before_reg2callend' },

    {'trigger': 'callring', 'source': 'CALLINIT', 'dest': 'CALLRING', 'before': 'before_reg2callinit'},
    #{'trigger': 'callconnect', 'source': 'CALLINIT', 'dest': 'CALLCONNECT', 'before': 'before_reg2callend'},
    #{'trigger': 'calldisconnect', 'source': 'CALLINIT', 'dest': 'CALLEND', 'before': 'before_reg2callend'},
    {'trigger': 'callinit_timeout', 'source': 'CALLINIT', 'dest': 'CALLEND', 'before': 'before_reg2callend'},

    {'trigger': 'callring_timeout', 'source': 'CALLRING', 'dest': 'CALLEND', 'before': 'before_callring2callend'},
    {'trigger': 'callconnect', 'source': 'CALLRING', 'dest': 'CALLCONNECT', 'before': 'before_reg2callend'},
    {'trigger': 'calldisconnect', 'source': 'CALLRING', 'dest': 'CALLDISCONNECT', 'before': 'before_callring2calldisconnect'},

    {'trigger': 'calldisconnect', 'source': 'CALLCONNECT', 'dest': 'CALLDISCONNECT', 'before': 'before_callconnect2calldisconnect'},
    {'trigger': 'callconnect_timeout', 'source': 'CALLCONNECT', 'dest': 'CALLCONNECT', 'before': 'timeout2handup'},

    {'trigger': 'calldisconnect_timeout', 'source': 'CALLDISCONNECT', 'dest': 'CALLEND', 'before': 'before_callconnect2callend'},

    {'trigger': 'callend_timeout', 'source': 'CALLEND', 'dest': 'DEATTACH', 'before': 'before_callend2deattach'},
]


volte401 = VolteCallStateMachine()
machine = JsExtenStateMachine(model=volte401, states=states, transitions=transitions, initial='IDLE')

q = Queue()

eventdemo = ['start','attach_success','register_success','callring','callconnect']

# 假设有一消息队列，按一定时间插入消息
def putevents2queue():
    size = len(eventdemo)
    #反转字符串数组
    eventdemo.reverse()

    while(1):
        if (size<=0) :
            break
        else:
            q.put(eventdemo[size-1])
            size = size-1

    print("end putevents2queue")

# 从队列中取出事件并执行到最终的状态
def geteventsfromqueue():

    sleep(2)
    print("start geteventsfromqueue")

    while(1):
       print(q.qsize())
       event = q.get()
       print ('recv event = '+event)
       func = getattr(volte401,event, None)
       func()
       print("now state=" + volte401.state)
       sleep(3)

    print("end geteventsfromqueue")

putthreading = threading.Thread(target=putevents2queue,)
getthreading = threading.Thread(target=geteventsfromqueue,)
putthreading.start();
getthreading.start();


sleep(60);

'''
print (volte401.state)
volte401.start()
print (volte401.state)
sleep(3)
volte401.attach_success()
sleep(3)
print (volte401.state)
'''