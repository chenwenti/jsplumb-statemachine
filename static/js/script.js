// No API call should be made until the DOM has been initialized.
var workflowData,workflow;
			
jsWorkflow.ready(function () {    
	// A list of jsWorkflow methods:
	//
	// #1 jsWorkflow.Instance() - A constructor to create a new workflow instance.
	//
	// #2 init() - A method to Initialize the workflow. A workflow can be initialized by passing either 
	// a workflow html element's id or the workflow JSON data comprising of details such as 
	// State transitions, State names, State positions and workflow container Id.
	//
	// #3 instance.createStateTrasitions() - A method to establish transitions among all the workflow States by passing the JSON data.
	//
	// #4 instance.getStateTransitions() - Get a list of all States and their transition (connection) with other States.
	//
	// #5 instance.getStateNames() - Get a list of all State element Ids with their respective names.
	//
	// #6 instance.getStatePositions() - Get a list of all State element Ids with their respective css positions (top and left).
	//
	// #7 instance.getWorkflow() - Get the current workflow object with details such as 
	// State transitions, State names, State positions and workflow container Id.


	// A sample JSON Workflow object
	//
	// {
	//   "transitions": {
	//     "new": "open",
	//     "open": "new,in-progress,resolved,closed",
	//     "in-progress": "open,resolved,closed",
	//     "resolved": "closed,reopened",
	//     "reopened": "closed,resolved,in-progress",
	//     "closed": "reopened"
	//   },
	//   "names": {
	//     "new": "New",
	//     "open": "Open",
	//     "in-progress": "In Progress",
	//     "resolved": "Resolved",
	//     "reopened": "Reopened",
	//     "closed": "Closed"
	//   },
	//   "positions": {
	//     "new": {
	//       "top": 100,
	//       "left": 500
	//     },
	//     "open": {
	//       "top": 200,
	//       "left": 500
	//     },
	//     "in-progress": {
	//       "top": 400,
	//       "left": 250
	//     },
	//     "resolved": {
	//       "top": 300,
	//       "left": 500
	//     },
	//     "reopened": {
	//       "top": 500,
	//       "left": 500
	//     },
	//     "closed": {
	//       "top": 400,
	//       "left": 750
	//     }
	//   },
	//   "container": "workflow-2"
	// }
	workflow = new jsWorkflow.Instance();
	workflow.init('workflow-2',true);
	
	
});
// For more details refer README.md


	$("#fileImport").click(function () {
	    $("#files").click();
	})
		function fileImport() {
		
		    var selectedFile = document.getElementById('files').files[0];
		    var name = selectedFile.name;
		    var size = selectedFile.size;
		
		
		    var reader = new FileReader();
		
		    reader.onload = function () {
		
						// Workflow object to render new workflow State elements in the DOM
						//workflowData000 ='{"transitions":{"new":"open","open":"new,in-progress,resolved,closed","in-progress":"open,resolved,closed","resolved":"closed,reopened","reopened":"closed,resolved,in-progress","closed":"reopened"},"names":{"new":"New","open":"Open","in-progress":"In Progress","resolved":"Resolved","reopened":"Reopened","closed":"Closed"},"positions":{"new":{"top":109,"left":176},"open":{"top":91,"left":677},"in-progress":{"top":409,"left":20},"resolved":{"top":257,"left":763},"reopened":{"top":556,"left":336},"closed":{"top":497,"left":850}},"container":"workflow-2"}';
						clearfunc();
						
						workflowData = this.result;
						
						workflow.init(JSON.parse(workflowData),false); // parse the workflowData string as JSON object.
						
		    }
		    
		    content = reader.readAsText(selectedFile,"UTF-8");
		      
	}


	demo1 = function () {
		
		//alert("demo1")
		clearfunc();
		
		workflowData = '{"transitions":{"tr0":{"source":"idle","target":"attach","label":"start"},"tr1":{"source":"attach","target":"register","label":"attach_success"},"tr2":{"source":"register","target":"callinit","label":"register_success"},"tr3":{"source":"callinit","target":"callring","label":"callring"},"tr4":{"source":"callring","target":"callconnect","label":"callconnect"},"tr5":{"source":"callring","target":"calldisconnect","label":"calldisconnect"},"tr6":{"source":"attach","target":"callend","label":"attach_faile"},"tr7":{"source":"attach","target":"callend","label":"attach_timeout"},"tr8":{"source":"register","target":"callend","label":"register_faile"},"tr9":{"source":"register","target":"callend","label":"register_timeout"},"tr10":{"source":"callinit","target":"callend","label":"callinit_timeout"},"tr11":{"source":"callconnect","target":"calldisconnect","label":"calldisconnect"},"tr12":{"source":"callconnect","target":"callconnect","label":"duriton_timeout"},"tr13":{"source":"calldisconnect","target":"callend","label":"dealy_timeout"},"tr14":{"source":"callend","target":"unregister","label":"is_need_unregister"},"tr15":{"source":"callend","target":"unattach","label":"is_need_unattach"},"tr16":{"source":"unregister","target":"unattach","label":"is_need_unattach"},"tr17":{"source":"callring","target":"callend","label":"callring_timeout"}},"names":{"idle":"IDLE","attach":"ATTACH","register":"REGISTER","callinit":"CALLINIT","callring":"CALLRING","callconnect":"CALLCONNECT","calldisconnect":"CALLDISCONNECT","callend":"CALLEND","unregister":"UNREGISTER","unattach":"UNATTACH"},"positions":{"idle":{"top":121,"left":159.90625},"attach":{"top":208,"left":280.90625},"register":{"top":338,"left":275.90625},"callinit":{"top":459,"left":272.90625},"callring":{"top":587,"left":271.90625},"callconnect":{"top":555,"left":673.90625},"calldisconnect":{"top":678,"left":670.859375},"callend":{"top":325,"left":944.859375},"unregister":{"top":502,"left":953.859375},"unattach":{"top":639,"left":1113.859375}},"container":"workflow-2"}';
		workflow.init(JSON.parse(workflowData),false);
	}
	
	demo2 = function () {
		
		clearfunc();
		
		workflowData = '{"transitions":{"tr0":{"source":"idle","target":"attach","label":"start"},"tr1":{"source":"attach","target":"register","label":"attach_success"},"tr2":{"source":"attach","target":"callend","label":"attach_faile"},"tr3":{"source":"attach","target":"callend","label":"attach_timeout"},"tr4":{"source":"register","target":"callend","label":"register_faile"},"tr5":{"source":"register","target":"callend","label":"register_timeout"},"tr6":{"source":"callconnect","target":"calldisconnect","label":"calldisconnect"},"tr7":{"source":"callconnect","target":"callconnect","label":"duriton_timeout"},"tr8":{"source":"calldisconnect","target":"callend","label":"dealy_timeout"},"tr9":{"source":"callend","target":"unregister","label":"is_need_unregister"},"tr10":{"source":"callend","target":"unattach","label":"is_need_unattach"},"tr11":{"source":"unregister","target":"unattach","label":"is_need_unattach"},"tr12":{"source":"register","target":"callwaiting","label":"register_success"},"tr13":{"source":"callwaiting","target":"callend","label":"callwaiting_timeout"},"tr14":{"source":"callwaiting","target":"callring","label":"callincoming"},"tr15":{"source":"callring","target":"callconnect","label":"callconnect"},"tr16":{"source":"callring","target":"callring","label":"dealay_to-pickup"},"tr17":{"source":"callring","target":"calldisconnect","label":"calldisconnect"},"tr18":{"source":"callring","target":"callend","label":"callring_timeout"}},"names":{"idle":"IDLE","attach":"ATTACH","register":"REGISTER","callring":"CALLRING","callconnect":"CALLCONNECT","calldisconnect":"CALLDISCONNECT","callend":"CALLEND","unregister":"UNREGISTER","unattach":"UNATTACH","callwaiting":"CALLWAITING"},"positions":{"idle":{"top":121,"left":159.90625},"attach":{"top":208,"left":280.90625},"register":{"top":338,"left":275.90625},"callring":{"top":676,"left":173.90625},"callconnect":{"top":555,"left":673.90625},"calldisconnect":{"top":678,"left":670.859375},"callend":{"top":325,"left":944.859375},"unregister":{"top":502,"left":953.859375},"unattach":{"top":639,"left":1113.859375},"callwaiting":{"top":467,"left":274.859375}},"container":"workflow-2"}';
		workflow.init(JSON.parse(workflowData),false);
	}
	
	demo3 = function () {
		
		clearfunc();
		
		workflowData = '{"transitions":{"tr0":{"source":"idle","target":"attach","label":"start"},"tr1":{"source":"attach","target":"register","label":"attach_success"},"tr2":{"source":"attach","target":"callend","label":"attach_faile"},"tr3":{"source":"attach","target":"callend","label":"attach_timeout"},"tr4":{"source":"register","target":"callend","label":"register_faile"},"tr5":{"source":"register","target":"callend","label":"register_timeout"},"tr6":{"source":"callend","target":"unregister","label":"is_need_unregister"},"tr7":{"source":"callend","target":"unattach","label":"is_need_unattach"},"tr8":{"source":"unregister","target":"unattach","label":"is_need_unattach"},"tr9":{"source":"register","target":"messagemo","label":"register_success"},"tr10":{"source":"messagemo","target":"callend","label":"message_success"},"tr11":{"source":"messagemo","target":"callend","label":"message_faile"},"tr12":{"source":"messagemo","target":"callend","label":"message_timeout"}},"names":{"idle":"IDLE","attach":"ATTACH","register":"REGISTER","callend":"CALLEND","unregister":"UNREGISTER","unattach":"UNATTACH","messagemo":"MESSAGEMO"},"positions":{"idle":{"top":147,"left":368.90625},"attach":{"top":263,"left":305.90625},"register":{"top":384,"left":291.90625},"callend":{"top":303,"left":954.859375},"unregister":{"top":473,"left":896.859375},"unattach":{"top":581,"left":1091.859375},"messagemo":{"top":508,"left":515.6875}},"container":"workflow-2"}';
		workflow.init(JSON.parse(workflowData),false);
	}