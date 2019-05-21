/**
 * jsWorkflow 1.0
 *
 * jsWorkflow, a jsPlumb based workfow API, helps to create JavaScript based workflow diagrams for various applications.
 * It abstracts all the complexities involved in designing and managing workflows.
 *
 * Copyright (c) 2014 Hemanatha Shetty (hemantsshetty@gmail.com)
 *
 * http://github.com/hemantsshetty/jsWorkflow
 *
 * Licensed under the MIT
 */
/**
 *@namespace jsWorkflow
 */
;
var jsWorkflow = jsWorkflow || {};
var bindflag = null ;

var clearfunc ;

// Leveraging the ready function of jsPlumb.
jsWorkflow.ready = jsPlumb.ready;

// Self execute this code
(function () {
    // No API call should be made until the DOM has been initialized.
    jsWorkflow.ready(function () {
        /**
         *Create a workflow instance.
         *@constructor Instance
         */
        jsWorkflow.Instance = function () {

            // Get a new instance of jsPlumb.
            this.instance = jsPlumb.getInstance();
        }
        
        /**
         *Initialize the workflow instance.
         *@method init
         *@param {String} workflowData Id of an HTML container within which the worlflow is to be rendered
         *@param {Object} workflowData A workflow object to render new workflow State elements in the DOM
         *return {Object} instance Returns an initialized instance of the workflow object
         */
        jsWorkflow.Instance.prototype.init = function (workflowData,isnew) {

            var instance,
                windows,
                addNewState,
                bindStateEvents,
                workflow;
                
            var clickFlag = null;
						
						//add 2019-5-6  new button
						var savedata,saveJson,clearAll;

            if (typeof workflowData === 'object') {
                workflow = workflowData.container;
                jsWorkflow.Instance.createWorkflowDOM(workflowData);
            } else {
                workflow = workflowData;
            }

            instance = this.instance;

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
                Container: workflow // Id of the workflow container.
            });
												
           
            // Get an array of State elements.
            windows = jsPlumb.getSelector("#" + workflow + " .w");

            // Get a reference to the element in the workflow used to create a new State on click.
            //addNewState = jsPlumb.getSelector("#" + workflow + " .create-state");
            addNewState = jsPlumb.getSelector("#" + "addstate");

            // 2019-5-6
						savedata = jsPlumb.getSelector("#" + 'savedata');
						clearall = jsPlumb.getSelector("#" + 'clearall');
						
						
						bindClickEvents = function () {

				            // Bind a click listener to each transition (connection). On double click, the transition is deleted.
				            instance.bind("dblclick", function (transition) {
				 
				            	  if(clickFlag) {
				                    clickFlag = clearTimeout(clickFlag);
				                }
				                instance.detach(transition);
				            });
				            
				            instance.bind("click", function (connection) {
				               if(clickFlag) {
				                    clickFlag = clearTimeout(clickFlag);
				                }
				                  clickFlag = setTimeout(function() {
				                  	
				                  	var label = connection.getOverlay("connectlabel");
				                  	
				                  	if(label == null)
				                  	label = connection.getOverlay("defaultlabel");
				                  	
				                    var ab=prompt('输入变量1...',label.getLabel());
				
				                    if(ab){
				                       label.setLabel(ab);              
				                    }else{
				                       return false;
				                    }
				 
				                  }, 300);
				            });


				            // Add new State event.
				            /*
				            addNewState.bind("click", function () {
				                var _this = this,
				                    stateName,
				                    stateId,
				                    stateElement;
				
				                stateName = prompt("输入状态名称...");
				
				                if (stateName && stateName !== '') {
				
				                    stateName = stateName.replace(/[^a-zA-Z0-9 ]/g, '');
				
				                    stateId = stateName.toLocaleLowerCase().replace(' ', '-');
				
				                    if (jQuery(_this).parent().find('#' + stateId).length < 1) {
				
				                        stateElement = '<div class="w state" id="' + stateId + '">' + stateName + '<div class="ep"></div></div>';
				
				                        jQuery(_this).parent().append(stateElement);
				
				                        // Bind required functionalities to this State element
				                        bindStateEvents(jQuery('#' + stateId));
				
				                    } else {
				                        alert('This state is already present.');
				                    }
				                }
				            });
				            */
				
									// Add savedata event. 2019-5-6
				            savedata.bind("click", function () {
										
												var _workflow  = instance.getWorkflow();
				
				                var elementA = document.createElement('a');
				                
				                var filename=prompt('输入文件名称...');
				      					
				      					if(filename)
				      						elementA.download = filename + ".json";
				      					else
				      						{
				                	elementA.download = "data" + ".json";
				                return ;}
				      
				                var blob = new Blob([JSON.stringify(_workflow)]);
	
				                elementA.href = URL.createObjectURL(blob);
				                document.body.appendChild(elementA);
				                elementA.click();
				                document.body.removeChild(elementA);
											
									});
							
									//Add clear all event 2019-5-7
			            clearall.bind("click", function () {
											var truthBeTold = window.confirm("clear all YES or NOT");
											
											if (truthBeTold) {
													instance.delStateTransitions();
											}				
									});
									
						}
						
						if(isnew)
						bindClickEvents();
												
            /**
             *Bind required functionalities to State elements
             *@method bindStateEvents
             *@param {Object} windows List of all State elements
             */
            bindStateEvents = function (windows) {

                // Bind a click listener to each State elements. On double click, State elements are deleted.
                windows.bind("dblclick", function () {

                    var _this = this,
                        deleteState;

                    deleteState = confirm('Deleting State(' + jQuery(_this).attr('id').toUpperCase() + ') ...');

                    if (deleteState) {

                        // remove all the connections of this State element.
                        instance.detachAllConnections(_this);

                        // remove the State element.
                        jQuery(_this).remove();

                    } else {
                        return false;
                    }
                });

                // Initialize State elements as draggable.  
                instance.draggable(windows);

                // Initialize all State elements as Connection sources.
                instance.makeSource(windows, {
                    filter: ".ep",
                    anchor: "Continuous",
                    connector: ["StateMachine", {
                        curviness: 0
                    }],
                    connectorStyle: {
                        strokeStyle: "#bbb",
                        lineWidth: 1,
                        outlineColor: "transparent",
                        outlineWidth: 4
                    },
                    maxConnections: 10,
                    onMaxConnections: function (info, e) {
                        alert("Maximum connections (" + info.maxConnections + ") reached");
                    }
                });

                // Initialize all State elements as connection targets.  
                instance.makeTarget(windows, {
                    dropOptions: {
                        hoverClass: "dragHover"
                    },
                    anchor: "Continuous"
                });
            };

							$("#workflow-2").droppable({
                  scope: "ss",
                  drop: function (event, ui) {
                  		 var _this = this,
				                    stateName,
				                    stateId,
				                    stateElement;
				
				                stateName = prompt("输入状态名称...");
				
				                if (stateName && stateName !== '') {
				
				                    stateName = stateName.replace(/[^a-zA-Z0-9 ]/g, '');
				
				                    stateId = stateName.toLocaleLowerCase().replace(' ', '-');
				
				                    if (jQuery(_this).parent().find('#' + stateId).length < 1) {
															  
															  var position = ui.position;
															  var posstr = JSON.stringify(position);
				                        //stateElement = '<div class="w state" id="' + stateId + '"'+'style="left:131px;top:264px"'+'>' + stateName + '<div class="ep"></div></div>';
								                stateElement = '<div class="w state" id="' + stateId + '"'+'style="left:'+position["left"]+'px;top:'+position["top"]+'px"'+'>' + stateName + '<div class="ep"></div></div>';

				                        jQuery(_this).append(stateElement);
																
				                        // Bind required functionalities to this State element
				                        bindStateEvents(jQuery('#' + stateId));
				
				                    } else {
				                        alert('This state is already present.');
				                    }
				                }
                  }
                  	});
    

            // Initiate bindStateEvents on States elements present in the DOM
            if (windows.length > 0) {
                bindStateEvents(windows);
            }
			
				      /**
             *del all State transitions
             */
            clearfunc = instance.delStateTransitions = function () {
            				// Get updates array of State elements.
                		windows = jsPlumb.getSelector("#" + workflow + " .w");

										var connectionCount = windows.length; 
									  for (var i = 0; i < connectionCount; i += 1) {
												instance.detachAllConnections(windows[i]);
												jQuery(windows[i]).remove();
                		}
            }
					
            /**
             *Get all State transitions
             *@method getStateTransitions A public method
             *@return {Object} workflowTransition List of all States and their transition (connection) with other States
             */
            instance.getStateTransitions = function () {
                
								var plumbConnections = instance.getAllConnections(),
                    connectionCount = plumbConnections.length,
                    workflowTransition = {},
                    sourceID,targetID,label;
                    
                    for (var i = 0; i < connectionCount; i += 1) {
                        var trx={};         
                               	
                        sourceID = plumbConnections[i]['sourceId'];
                        targetID = plumbConnections[i]['targetId'];

												overlay =  plumbConnections[i].getOverlay("connectlabel");
												if(overlay ==  null)
												overlay =  plumbConnections[i].getOverlay("defaultlabel");
												
                        trx["source"]=sourceID;
                        trx["target"]=targetID;
                        trx["label"]=overlay.getLabel();

                        workflowTransition["tr"+i]=trx;
                }
                return workflowTransition;                
            }

            /**
             *Get all State names
             *@method getStateNames A public method
             *@return {Object} workflowStateName List of all State Element Ids with their respective names
             */
            instance.getStateNames = function () {
                var stateCount = windows.length,
                    workflowStateName = {};

                for (var i = 0; i < stateCount; i += 1) {

                    workflowStateName[jQuery(windows[i]).attr('id')] = jQuery(windows[i]).text().trim();
                }
                return workflowStateName;
            }

            /**
             *Get all State position
             *@method getStatePositions A public method
             *@return {Object} workflowStatePosition List of all State Element Ids with their respective css positions (top and left)
             */
            instance.getStatePositions = function () {

                // Get updates array of State elements.
                windows = jsPlumb.getSelector("#" + workflow + " .w");

                var stateCount = windows.length,
                    workflowStatePosition = {};

                for (var i = 0; i < stateCount; i += 1) {

                    workflowStatePosition[jQuery(windows[i]).attr('id')] = jQuery(windows[i]).position();
                }
                return workflowStatePosition;
            }

            /**
             *Get the workflow Object
             *@method getWorkflow A public method
             *@return {Object} workflow Current workflow object with details such as
             /* State transitions, State names, State positions and workflow container Id
             */
            instance.getWorkflow = function () {

                // Get updates array of State elements.
                windows = jsPlumb.getSelector("#" + workflow + " .w");

                var workflowObject = {};

                workflowObject['transitions'] = instance.getStateTransitions();
                workflowObject['names'] = instance.getStateNames();
                workflowObject['positions'] = instance.getStatePositions();
                workflowObject['container'] = workflow;

                return workflowObject;
            }

            /**
             *Create workflow State transitions from the given Object.
             *@method createStateTrasitions A public method
             *@param {Object} workflowData A workflow object to create State transitions
             */
            instance.createStateTrasitions = function (workflowData) {
                var transitions=workflowData.transitions,
                    source,target,label;

                for (var tr in transitions) {
                	var trx=transitions[tr];
											labtext = trx["label"];
                   var conn=instance.connect({
                        source: trx["source"],
                        target: trx["target"],
                        /*
                        overlays:[
											  ["Custom", {
											    create:function(component) {
											      return $("<select id='myDropDown'><option value='foo'>foo</option><option value='bar'>bar</option></select>");
											    },
											    location:0.7,
											    id:"customOverlay"
											  }]
											  ]*/
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
                    
                }                
              
            }
            
           // Create workflow State transitions from the given workflowData Object.
            if (typeof workflowData === 'object') {
                instance.createStateTrasitions(workflowData);
           }   
                  			    
            return instance;
        }
        /**
         *Create the workflow DOM from the given data.
         *@method createWorkflowDOM
         *@param {Object} workflowData A workflow object to render new workflow State elements in the DOM
         */
        jsWorkflow.Instance.createWorkflowDOM = function (workflowData) {

            var container = workflowData.container,
                names = workflowData.names,
                positions = workflowData.positions,
                elements = '';

            for (var name in names) {
                if (names.hasOwnProperty(name)) {
                    elements += '<div class="w state" id=' + name + ' style="left: ' + positions[name]['left'] + 'px; top: ' + positions[name]['top'] + 'px;">' + names[name] + '<div class="ep"></div></div>';
                }
            }

            jQuery('#' + container).append(elements);
        }
        
        jsWorkflow.Instance.renew = function (workflowData) {
						jsWorkflow.Instance.createWorkflowDOM(workflowData);
						
						jsWorkflow.Instance.createStateTrasitions(workflowData);
        }
             
    });
})();