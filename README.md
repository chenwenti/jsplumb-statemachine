# jsplumb-statemachine


## 1.1 ������Ŀ��
��˵�������Ŀ��Ҫ�����ʵ�����⡣  
֮ǰһֱ�����������̿��Ƶĳ����漰����ҵ�����̷ǳ��࣬������Ҫ����ҵ�����̵ı仯������롣
������Ҫ��ҵ�����̲���ͨ��ǰ�˱༭�ķ�ʽ�������ţ����ѡ��jsplumb��Ϊǰ�˿��������
��Ҫʵ�����¹��ܣ�

- ͨ����ק�ķ�ʽʵ��״̬��ģ�͵Ļ��ƺ�����
- �ܹ����������Ƶ�ģ�͹�ϵ�����ļ��洢
- �ܹ�ͨ�����ƵĹ�ϵ��ȷִ�ж�Ӧ��ҵ������
	
## 1.2 jsplumb��������	

����jsplumb�Ļ���֪ʶ���ﲻ�����ܣ��������вο��������ĵ������ѹ��׵������ĵ���  
�ٷ���ַ https://jsplumbtoolkit.com//
	
## 1.3 jsplumb��״̬��ģ��

jsplumb֧�ֶ���ͼ�λ��ƣ��˴�ֻ������jsplumb�� statemathine��
	

## 2.1 jsplumb�����
������ο���github�ϵ�jsworkflow��Ŀ��Ϊ��������������˸Ķ���

###2.2 ����lable����
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


## 4.1 �ɸĽ�����