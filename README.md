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
������ο���github�ϵ�jsworkflow��Ŀ��


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
��������ת��״̬���¼������������������һ���¼�evet
��={start,attach_success,attach_faile,attach_timeout,register_success,register_faile,register_timeout,
callring,callinit_timeout,callring_timeout,callconnect,calldisconnect..........}
����ÿһ���¼���Ӧִ�еĶ���
��={before_start2attach().before_attach2reg(),before_attach2callend(),..........}
��ʼ״̬q0= IDLE
����״̬F = DEATTACH

## 4.1 �ɸĽ�����