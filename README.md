# jsplumb-statemachine


## 1.1 背景和目标
先说下这个项目想要解决的实际问题。  
之前一直在做呼叫流程控制的程序，涉及到的业务流程非常多，经常需要根据业务流程的变化变更代码。
现在想要把业务流程部分通过前端编辑的方式进行重排，最后选型jsplumb作为前端控制组件。
主要实现以下功能：

- 通过拖拽的方式实现状态机模型的绘制和连接
- 能够保存所绘制的模型关系并以文件存储
- 能够通过绘制的关系正确执行对应的业务流程
	
## 1.2 jsplumb基本介绍	

关于jsplumb的基本知识这里不做介绍，可以自行参考官网的文档和网友贡献的中文文档。  
官方地址 https://jsplumbtoolkit.com//
	
## 1.3 jsplumb的状态机模型

jsplumb支持多种图形绘制，此处只是用了jsplumb的 statemathine。
	

## 2.1 jsplumb的设计
本软件参考了github上的jsworkflow项目，为了满足需求进行了改动。

###2.2 增加lable参数
为使绘制的图形能传递完整信息，需要在绘制的线上增加参数。jsplumb关于lable部分是通过overlays来实现，  
默认参数下会创建ConnectionOverlays图层，id设置为defaultlabel。  
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
在手动拖动创建连线时创建的是overlay图层 ,id设置为connectlable。
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
导入的和手动绘制的两个图层不一样，在修改和保持时进行了判断。这里对overlay的理解还不是很透彻，或许有更好的
处理办法。


## 3.1 状态机解释器的设计
在设计状态机解释器时首先需要掌握状态机的数学模型公式：  
有限状态机是一个五元组M=(Q,Σ,δ,q0,F)，其中：  
Q={q0,q1,...,qn}是有限状态集合。在任一确定的时刻，有限状态机只能处于一个确定的状态qi；  
Σ={σ1,σ2,...,σn}是有限输入字符集合。在任一确定的时刻，有限状态机只能接收一个确定的输入σj；  
δ:Q×Σ→Q是状态转移函数，在某一状态下，给定输入后有限状态机将转入状态迁移函数决定的一个新状态；  
q0∈Q是初始状态，有限状态机由此状态开始接收输入；  
F∈Q是最终状态集合，有限状态机在达到终态后不再接收输入。  

在本例中状态机的的状态Q设计为  
Q={IDLE,ATTACH,REGISTER,CALLINIT,CALLRING,CALLCONNECT,CALLDISCONNECT,CALLEND,UNREGISTER,DEATTACH};  

Σ={start,attach_success,attach_faile,attach_timeout,register_success,register_faile,register_timeout,
callring,callinit_timeout,callring_timeout,callconnect,calldisconnect..........}  

δ是每一个事件对应执行的动作  
δ={before_start2attach().before_attach2reg(),before_attach2callend(),..........}  

初始状态q0= IDLE  

最终状态F = DEATTACH  


## 4.1 可改进部分