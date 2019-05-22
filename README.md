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
	
# 效果图

![text](/screenshoot/screenshoot1.png)