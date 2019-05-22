# jsplumb-statemachine


## 1.1 ������Ŀ��
��˵�������Ŀ��Ҫ�����ʵ�����⡣  
֮ǰһֱ�����������̿��Ƶĳ����漰����ҵ�����̷ǳ��࣬������Ҫ����ҵ�����̵ı仯������롣
������Ҫ��ҵ�����̲���ͨ��ǰ�˱༭�ķ�ʽ�������ţ����ѡ��jsplumb��Ϊǰ�˿��������
��Ҫʵ�����¹��ܣ�

- ͨ����ק�ķ�ʽʵ��״̬��ģ�͵Ļ��ƺ�����
- �ܹ����������Ƶ�ģ�͹�ϵ�����ļ��洢
- �ܹ�ͨ�����ƵĹ�ϵ��ȷִ�ж�Ӧ��ҵ������

�������е�״̬��ҵ��Ϊvolte�еĺ���ҵ��volte��ʹ��SIPЭ�飬�����ҵ���ʱ��������Ķ�SIP����ĵ�����
SIP������״̬����һ�����˽⡣��ͼΪSIPЭ�������״̬����  

![](./screenshoot/sip.png)

��ʵ�����а���ʹ���߶Ե绰����⽫״̬�������CALLINIT(׼������)��CALLRING(����״̬)��CALLCONNECT(ժ��״̬)��CALLDISCONNECT(�һ�״̬)��
CALLEND(���н���״̬)���⼸��״̬����ͨ�绰Ҳ���ã�����ֻ�������ATTACH(����״̬)�����VOLTE������REGISTER(SIPע��״̬)����ӦҲ������DEATTCH(ȥ����״̬)��
UNREGISTER(ע��״̬)��
	
## 1.2 jsplumb��������	

����jsplumb�Ļ���֪ʶ���ﲻ�����ܣ��������вο��������ĵ������ѹ��׵������ĵ���  
�ٷ���ַ https://jsplumbtoolkit.com//
	
## 1.3 jsplumb��״̬��ģ��

jsplumb֧�ֶ���ͼ�λ��ƣ��˴�ֻ������jsplumb�� statemathine���ܡ�
	
## 1.4 jsplumbǰ��Ч��

DEMO��ַ��http://www.51pcap.com/callflow 
![](./screenshoot/screenshoot1.png)

## 2.1 jsplumb�����
��demo�ο���github�ϵ�jsworkflow��Ŀ��Ϊ��������������˸Ķ���
������lable�����������˱��桢���롢�������ק���ܣ��Դ洢�Ľṹ����Ҫ�����Ż���

### 2.2 ����lable����
Ϊʹ���Ƶ�ͼ���ܴ���������Ϣ����Ҫ�ڻ��Ƶ��������Ӳ�����jsplumb����lable������ͨ��overlays��ʵ�֣�  
Ĭ�ϲ����»ᴴ��ConnectionOverlaysͼ�㣬id����Ϊdefaultlabel��  
```
// Import all the given defaults into this instance.
instance.importDefaults({
    Endpoint: ["Dot", {
        radius: 0.1
    }],
    HoverPaintStyle: {
        strokeStyle: "#6699FF",
        lineWidth: 2
    },
    ConnectionOverlays: [
        ["Arrow", {
            location: 1,
            id: "arrow",
            length: 14,
            foldback: 0.4
        }],
       
        ["Label", {
            //label: "transition",
            id: "defaultlabel",
            cssClass: "aLabel",
            events:{  
               click (label) {
                 // var bc=prompt("shuru...");
                  // label.setLabel(bc);
                 }
            }
        }]                    
    ],
```
���ֶ��϶���������ʱ��������overlayͼ�� ,id����Ϊconnectlable��
```
instance.createStateTrasitions = function (workflowData) {
    var transitions=workflowData.transitions,
        source,target,label;

    for (var tr in transitions) {
    	var trx=transitions[tr];
					labtext = trx["label"];
       var conn=instance.connect({
            source: trx["source"],
            target: trx["target"],
						labelStyle: {cssClass: "aLabel",},
						overlays: [
          	//ConnectionOverlays: [
          	["Label", {
                  cssClass: "aLabel",
                  label: labtext,
                  location: 0.5,
                  id: "connectlabel",
              }],
						]
        });
        //conn.setLabel(trx["label"]);
```
����ĺ��ֶ����Ƶ�����ͼ�㲻һ�������޸ĺͱ���ʱ�������жϡ������overlay����⻹���Ǻ�͸���������и��õ�
����취��

### 2.3 ����������
������JSON���Ǵ洢,transitions�¼�¼��ԭ״̬��Ŀ��״̬��lable��¼���м�Ĵ���������  
names��¼�����е�״̬��������positions��¼��������λ�ã����ļ����뵽webҳ����ʹ�ã�����״̬������ʱ����Ҫ��    
```
{
	"transitions": {
		"tr0": {
			"source": "idle",
			"target": "attach",
			"label": "start"
		},
		"tr1": {
			"source": "attach",
			"target": "register",
			"label": "attach_success"
		},
		"tr2": {
			"source": "attach",
			"target": "callend",
			"label": "attach_faile"
		},
		"tr3": {
			"source": "attach",
			"target": "callend",
			"label": "attach_timeout"
		},
		"tr4": {
			"source": "register",
			"target": "callend",
			"label": "register_faile"
		},
		"tr5": {
			"source": "register",
			"target": "callend",
			"label": "register_timeout"
		},
		"tr6": {
			"source": "callend",
			"target": "unregister",
			"label": "is_need_unregister"
		},
		"tr7": {
			"source": "callend",
			"target": "unattach",
			"label": "is_need_unattach"
		},
		"tr8": {
			"source": "unregister",
			"target": "unattach",
			"label": "is_need_unattach"
		},
		"tr9": {
			"source": "register",
			"target": "messagemo",
			"label": "register_success"
		},
		"tr10": {
			"source": "messagemo",
			"target": "callend",
			"label": "message_success"
		},
		"tr11": {
			"source": "messagemo",
			"target": "callend",
			"label": "message_faile"
		},
		"tr12": {
			"source": "messagemo",
			"target": "callend",
			"label": "message_timeout"
		}
	},
	"names": {
		"idle": "IDLE",
		"attach": "ATTACH",
		"register": "REGISTER",
		"callend": "CALLEND",
		"unregister": "UNREGISTER",
		"unattach": "UNATTACH",
		"messagemo": "MESSAGEMO"
	},
	"positions": {
		"idle": {
			"top": 147,
			"left": 368.90625
		},
		"attach": {
			"top": 263,
			"left": 305.90625
		},
		"register": {
			"top": 384,
			"left": 291.90625
		},
		"callend": {
			"top": 303,
			"left": 954.859375
		},
		"unregister": {
			"top": 473,
			"left": 896.859375
		},
		"unattach": {
			"top": 581,
			"left": 1091.859375
		},
		"messagemo": {
			"top": 508,
			"left": 515.6875
		}
	},
	"container": "workflow-2"
}
```

## 3.1 ״̬�������������
�����״̬��������ʱ������Ҫ����״̬������ѧģ�͹�ʽ��  
����״̬����һ����Ԫ��M=(Q,��,��,q0,F)�����У�  
Q={q0,q1,...,qn}������״̬���ϡ�����һȷ����ʱ�̣�����״̬��ֻ�ܴ���һ��ȷ����״̬qi��  
��={��1,��2,...,��n}�����������ַ����ϡ�����һȷ����ʱ�̣�����״̬��ֻ�ܽ���һ��ȷ���������j��  
��:Q������Q��״̬ת�ƺ�������ĳһ״̬�£��������������״̬����ת��״̬Ǩ�ƺ���������һ����״̬��  
q0��Q�ǳ�ʼ״̬������״̬���ɴ�״̬��ʼ�������룻  
F��Q������״̬���ϣ�����״̬���ڴﵽ��̬���ٽ������롣  

�ڱ�����״̬���ĵ�״̬Q���Ϊ  
Q={IDLE,ATTACH,REGISTER,CALLINIT,CALLRING,CALLCONNECT,CALLDISCONNECT,CALLEND,UNREGISTER,DEATTACH};  

��={start,attach_success,attach_faile,attach_timeout,register_success,register_faile,register_timeout,
callring,callinit_timeout,callring_timeout,callconnect,calldisconnect..........}  

����ÿһ���¼���Ӧִ�еĶ���  
��={before_start2attach().before_attach2reg(),before_attach2callend(),..........}  

��ʼ״̬q0= IDLE  

����״̬F = DEATTACH  


## 3.2 ״̬���������Ĵ���demoʵ��
Ϊ��ʵ�����ϵ���ѧ���壬ʹ����python�µ�transitions��������  
������ܿ��Բο��ٷ��ĵ�  https://github.com/pytransitions/transitions  

���е�״̬������Ҫ�ж�ʱ�����������Ҫʹ��transitions��timeout��չ����  

�ȶ���state���������趼��ʱ10�룬��ʱ��ִ�г�ʱ������������ʱ�¼���
```
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
```

Ȼ���崥������������Ը���jsplumb��д��json�ļ��Զ�ת�������������塣  
```
transitions = [
    {'trigger': 'start', 'source': 'IDLE', 'dest': 'ATTACH', 'before': 'before_start2attach'},
    {'trigger': 'attach_success', 'source': 'ATTACH', 'dest': 'REGISTER', 'before': 'before_attach2reg' },
    {'trigger': 'attach_faile', 'source': 'ATTACH', 'dest': 'CALLEND', 'before': 'before_attach2callend' },
    {'trigger': 'attach_timeout', 'source': 'ATTACH', 'dest': 'CALLEND', 'before': 'before_attach2callend' },
    {'trigger': 'register_success', 'source': 'REGISTER', 'dest': 'CALLINIT', 'before': 'before_reg2callinit' },
    {'trigger': 'register_faile', 'source': 'REGISTER', 'dest': 'CALLEND', 'before': 'before_reg2callend' },
    {'trigger': 'register_timeout', 'source': 'REGISTER', 'dest': 'CALLEND', 'before': 'before_reg2callend' },
    {'trigger': 'callring', 'source': 'CALLINIT', 'dest': 'CALLRING', 'before': 'before_reg2callinit'},
    {'trigger': 'callinit_timeout', 'source': 'CALLINIT', 'dest': 'CALLEND', 'before': 'before_reg2callend'},
    {'trigger': 'callring_timeout', 'source': 'CALLRING', 'dest': 'CALLEND', 'before': 'before_callring2callend'},
    {'trigger': 'callconnect', 'source': 'CALLRING', 'dest': 'CALLCONNECT', 'before': 'before_reg2callend'},
    {'trigger': 'calldisconnect', 'source': 'CALLRING', 'dest': 'CALLDISCONNECT', 'before': 'before_callring2calldisconnect'},
    {'trigger': 'calldisconnect', 'source': 'CALLCONNECT', 'dest': 'CALLDISCONNECT', 'before': 'before_callconnect2calldisconnect'},
    {'trigger': 'callconnect_timeout', 'source': 'CALLCONNECT', 'dest': 'CALLCONNECT', 'before': 'timeout2handup'},
    {'trigger': 'callend_timeout', 'source': 'CALLEND', 'dest': 'CALLEND', 'before': 'before_reg2callend'},
]
```

ʵ���ຯ��  

```
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

    #��ʱ������
    def on_enter_waiting(self):
        self.entourage += 1

    def on_timeout_attach(self):
        print ("on_timeout_attach dosomthing")

    def on_timeout_register(self):
        print ("on_timeoute_register do something")		
        
		....
		ʵ��ÿ����������
		
```

���Ӻ����������������У�һ��ģ�������¼���һ��ȡ���¼�����Ϊ�¼������ַ����������Ҫ��Ҫת����
��������ʹ����getattr������  

```
# �Ӷ�����ȡ���¼���ִ�е����յ�״̬
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

```

## 3.3 ���Դ�������

python3.6  
��װtransitions��ֱ������  


## 4.1 �ɸĽ�����

lable������������ݸ�ʽ�����ӱ���timeoutʱ���������ȡ�  
���ӿ�����Ƴ� ��2= ����1����Ŀ2=����2  
��fun=xxxx,timer=10��ʾִ��ʲô��������ʱʱ�����١�  

lable�еĲ���������ģ�������Ƴ�������ʽ��ѡ�񣬼�������ʱ�Ĵ���  

�������õ�transitions��ʵ����Ŀ�е����ܴ������ʣ�ʹ��transitionsֻ�Ǽ��ں����״̬�������ģʽ�������
ʹ���б�������sip״̬��ģ�ͶԶ�ʱ����Ҫ��ܸߣ��ܶඨʱ��Ҫ����Ҫ�ﵽ200ms�����£�Ŀǰ���뼶��ʱ���޷�����Ҫ��