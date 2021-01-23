
/**
 * Copyright 2017 Daniel Thomas.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
	"use strict";

	function AmazonAPINode(n) {
		RED.nodes.createNode(this,n);
		this.awsConfig = RED.nodes.getNode(n.aws);
		this.region = n.region;
		this.operation = n.operation;
		this.name = n.name;
		this.region = this.awsConfig.region;
		this.accessKey = this.awsConfig.accessKey;
		this.secretKey = this.awsConfig.secretKey;

		var node = this;
		var AWS = require("aws-sdk");
		AWS.config.update({
			accessKeyId: this.accessKey,
			secretAccessKey: this.secretKey,
			region: this.region
		});
		if (!AWS) {
			node.warn("Missing AWS credentials");
			return;
		}

        if (this.awsConfig.proxyRequired){
            var proxy = require('proxy-agent');
            AWS.config.update({
                httpOptions: { agent: new proxy(this.awsConfig.proxy) }
            });
        }

		var awsService = new AWS.ECS( { 'region': node.region } );

		node.on("input", function(msg) {
			node.sendMsg = function (err, data) {
				if (err) {
				    node.status({fill:"red",shape:"ring",text:"error"});
                    node.error("failed: " + err.toString(), msg);
                    node.send([null, { err: err }]);
    				return;
				} else {
				msg.payload = data;
				node.status({});
				}
				node.send([msg,null]);
			};
		
			var _cb=function(err,data){
				node.sendMsg(err,data);
			}		

			if (typeof service[node.operation] == "function"){
				node.status({fill:"blue",shape:"dot",text:node.operation});
				service[node.operation](awsService,msg,_cb);
			} else {
				node.error("failed: Operation node defined - "+node.operation);
			}

		});
		var copyArg=function(src,arg,out,outArg,isObject){
			var tmpValue=src[arg];
			outArg = (typeof outArg !== 'undefined') ? outArg : arg;

			if (typeof src[arg] !== 'undefined'){
				if (isObject && typeof src[arg]=="string" && src[arg] != "") { 
					tmpValue=JSON.parse(src[arg]);
				}
				out[outArg]=tmpValue;
			}
                        //AWS API takes 'Payload' not 'payload' (see Lambda)
                        if (arg=="Payload" && typeof tmpValue == 'undefined'){
                                out[arg]=src["payload"];
                        }

		}

		var service={};

		
		service.CreateCapacityProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"autoScalingGroupProvider",params,undefined,true); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"autoScalingGroupProvider",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createCapacityProvider(params,cb);
		}

		
		service.CreateCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"clusterName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"settings",params,undefined,true); 
			copyArg(msg,"capacityProviders",params,undefined,true); 
			copyArg(msg,"defaultCapacityProviderStrategy",params,undefined,true); 
			

			svc.createCluster(params,cb);
		}

		
		service.CreateService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceName",params,undefined,false); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"serviceName",params,undefined,false); 
			copyArg(msg,"taskDefinition",params,undefined,false); 
			copyArg(msg,"loadBalancers",params,undefined,true); 
			copyArg(msg,"serviceRegistries",params,undefined,true); 
			copyArg(msg,"desiredCount",params,undefined,false); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"launchType",params,undefined,false); 
			copyArg(msg,"capacityProviderStrategy",params,undefined,true); 
			copyArg(msg,"platformVersion",params,undefined,false); 
			copyArg(msg,"role",params,undefined,false); 
			copyArg(msg,"deploymentConfiguration",params,undefined,true); 
			copyArg(msg,"placementConstraints",params,undefined,true); 
			copyArg(msg,"placementStrategy",params,undefined,true); 
			copyArg(msg,"networkConfiguration",params,undefined,true); 
			copyArg(msg,"healthCheckGracePeriodSeconds",params,undefined,false); 
			copyArg(msg,"schedulingStrategy",params,undefined,false); 
			copyArg(msg,"deploymentController",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"enableECSManagedTags",params,undefined,false); 
			copyArg(msg,"propagateTags",params,undefined,false); 
			

			svc.createService(params,cb);
		}

		
		service.CreateTaskSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"service",params,undefined,false); 
			copyArg(n,"cluster",params,undefined,false); 
			copyArg(n,"taskDefinition",params,undefined,false); 
			
			copyArg(msg,"service",params,undefined,false); 
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"externalId",params,undefined,false); 
			copyArg(msg,"taskDefinition",params,undefined,false); 
			copyArg(msg,"networkConfiguration",params,undefined,true); 
			copyArg(msg,"loadBalancers",params,undefined,true); 
			copyArg(msg,"serviceRegistries",params,undefined,true); 
			copyArg(msg,"launchType",params,undefined,false); 
			copyArg(msg,"capacityProviderStrategy",params,undefined,true); 
			copyArg(msg,"platformVersion",params,undefined,false); 
			copyArg(msg,"scale",params,undefined,true); 
			copyArg(msg,"clientToken",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createTaskSet(params,cb);
		}

		
		service.DeleteAccountSetting=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"principalArn",params,undefined,false); 
			

			svc.deleteAccountSetting(params,cb);
		}

		
		service.DeleteAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"attributes",params,undefined,true); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"attributes",params,undefined,true); 
			

			svc.deleteAttributes(params,cb);
		}

		
		service.DeleteCapacityProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"capacityProvider",params,undefined,false); 
			
			copyArg(msg,"capacityProvider",params,undefined,false); 
			

			svc.deleteCapacityProvider(params,cb);
		}

		
		service.DeleteCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"cluster",params,undefined,false); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			

			svc.deleteCluster(params,cb);
		}

		
		service.DeleteService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"service",params,undefined,false); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"service",params,undefined,false); 
			copyArg(msg,"force",params,undefined,false); 
			

			svc.deleteService(params,cb);
		}

		
		service.DeleteTaskSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"cluster",params,undefined,false); 
			copyArg(n,"service",params,undefined,false); 
			copyArg(n,"taskSet",params,undefined,false); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"service",params,undefined,false); 
			copyArg(msg,"taskSet",params,undefined,false); 
			copyArg(msg,"force",params,undefined,false); 
			

			svc.deleteTaskSet(params,cb);
		}

		
		service.DeregisterContainerInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerInstance",params,undefined,false); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"containerInstance",params,undefined,false); 
			copyArg(msg,"force",params,undefined,false); 
			

			svc.deregisterContainerInstance(params,cb);
		}

		
		service.DeregisterTaskDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskDefinition",params,undefined,false); 
			
			copyArg(msg,"taskDefinition",params,undefined,false); 
			

			svc.deregisterTaskDefinition(params,cb);
		}

		
		service.DescribeCapacityProviders=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"capacityProviders",params,undefined,true); 
			copyArg(msg,"include",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.describeCapacityProviders(params,cb);
		}

		
		service.DescribeClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"clusters",params,undefined,true); 
			copyArg(msg,"include",params,undefined,false); 
			

			svc.describeClusters(params,cb);
		}

		
		service.DescribeContainerInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerInstances",params,undefined,true); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"containerInstances",params,undefined,true); 
			copyArg(msg,"include",params,undefined,false); 
			

			svc.describeContainerInstances(params,cb);
		}

		
		service.DescribeServices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"services",params,undefined,true); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"services",params,undefined,true); 
			copyArg(msg,"include",params,undefined,false); 
			

			svc.describeServices(params,cb);
		}

		
		service.DescribeTaskDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskDefinition",params,undefined,false); 
			
			copyArg(msg,"taskDefinition",params,undefined,false); 
			copyArg(msg,"include",params,undefined,false); 
			

			svc.describeTaskDefinition(params,cb);
		}

		
		service.DescribeTaskSets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"cluster",params,undefined,false); 
			copyArg(n,"service",params,undefined,false); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"service",params,undefined,false); 
			copyArg(msg,"taskSets",params,undefined,true); 
			copyArg(msg,"include",params,undefined,false); 
			

			svc.describeTaskSets(params,cb);
		}

		
		service.DescribeTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"tasks",params,undefined,true); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"tasks",params,undefined,true); 
			copyArg(msg,"include",params,undefined,false); 
			

			svc.describeTasks(params,cb);
		}

		
		service.DiscoverPollEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"containerInstance",params,undefined,false); 
			copyArg(msg,"cluster",params,undefined,false); 
			

			svc.discoverPollEndpoint(params,cb);
		}

		
		service.ListAccountSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"value",params,undefined,false); 
			copyArg(msg,"principalArn",params,undefined,false); 
			copyArg(msg,"effectiveSettings",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAccountSettings(params,cb);
		}

		
		service.ListAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"targetType",params,undefined,false); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"targetType",params,undefined,false); 
			copyArg(msg,"attributeName",params,undefined,false); 
			copyArg(msg,"attributeValue",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAttributes(params,cb);
		}

		
		service.ListClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listClusters(params,cb);
		}

		
		service.ListContainerInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"filter",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.listContainerInstances(params,cb);
		}

		
		service.ListServices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"launchType",params,undefined,false); 
			copyArg(msg,"schedulingStrategy",params,undefined,false); 
			

			svc.listServices(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTaskDefinitionFamilies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"familyPrefix",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listTaskDefinitionFamilies(params,cb);
		}

		
		service.ListTaskDefinitions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"familyPrefix",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"sort",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listTaskDefinitions(params,cb);
		}

		
		service.ListTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"containerInstance",params,undefined,false); 
			copyArg(msg,"family",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"startedBy",params,undefined,false); 
			copyArg(msg,"serviceName",params,undefined,false); 
			copyArg(msg,"desiredStatus",params,undefined,false); 
			copyArg(msg,"launchType",params,undefined,false); 
			

			svc.listTasks(params,cb);
		}

		
		service.PutAccountSetting=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"value",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"value",params,undefined,false); 
			copyArg(msg,"principalArn",params,undefined,false); 
			

			svc.putAccountSetting(params,cb);
		}

		
		service.PutAccountSettingDefault=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"value",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"value",params,undefined,false); 
			

			svc.putAccountSettingDefault(params,cb);
		}

		
		service.PutAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"attributes",params,undefined,true); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"attributes",params,undefined,true); 
			

			svc.putAttributes(params,cb);
		}

		
		service.PutClusterCapacityProviders=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"cluster",params,undefined,false); 
			copyArg(n,"capacityProviders",params,undefined,true); 
			copyArg(n,"defaultCapacityProviderStrategy",params,undefined,true); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"capacityProviders",params,undefined,true); 
			copyArg(msg,"defaultCapacityProviderStrategy",params,undefined,true); 
			

			svc.putClusterCapacityProviders(params,cb);
		}

		
		service.RegisterContainerInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"instanceIdentityDocument",params,undefined,false); 
			copyArg(msg,"instanceIdentityDocumentSignature",params,undefined,false); 
			copyArg(msg,"totalResources",params,undefined,true); 
			copyArg(msg,"versionInfo",params,undefined,true); 
			copyArg(msg,"containerInstanceArn",params,undefined,false); 
			copyArg(msg,"attributes",params,undefined,true); 
			copyArg(msg,"platformDevices",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.registerContainerInstance(params,cb);
		}

		
		service.RegisterTaskDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"family",params,undefined,false); 
			copyArg(n,"containerDefinitions",params,undefined,true); 
			
			copyArg(msg,"family",params,undefined,false); 
			copyArg(msg,"taskRoleArn",params,undefined,false); 
			copyArg(msg,"executionRoleArn",params,undefined,false); 
			copyArg(msg,"networkMode",params,undefined,false); 
			copyArg(msg,"containerDefinitions",params,undefined,true); 
			copyArg(msg,"volumes",params,undefined,true); 
			copyArg(msg,"placementConstraints",params,undefined,true); 
			copyArg(msg,"requiresCompatibilities",params,undefined,true); 
			copyArg(msg,"cpu",params,undefined,false); 
			copyArg(msg,"memory",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"pidMode",params,undefined,false); 
			copyArg(msg,"ipcMode",params,undefined,false); 
			copyArg(msg,"proxyConfiguration",params,undefined,true); 
			copyArg(msg,"inferenceAccelerators",params,undefined,true); 
			

			svc.registerTaskDefinition(params,cb);
		}

		
		service.RunTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskDefinition",params,undefined,false); 
			
			copyArg(msg,"capacityProviderStrategy",params,undefined,true); 
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"count",params,undefined,false); 
			copyArg(msg,"enableECSManagedTags",params,undefined,false); 
			copyArg(msg,"group",params,undefined,false); 
			copyArg(msg,"launchType",params,undefined,false); 
			copyArg(msg,"networkConfiguration",params,undefined,true); 
			copyArg(msg,"overrides",params,undefined,true); 
			copyArg(msg,"placementConstraints",params,undefined,true); 
			copyArg(msg,"placementStrategy",params,undefined,true); 
			copyArg(msg,"platformVersion",params,undefined,false); 
			copyArg(msg,"propagateTags",params,undefined,false); 
			copyArg(msg,"referenceId",params,undefined,false); 
			copyArg(msg,"startedBy",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"taskDefinition",params,undefined,false); 
			

			svc.runTask(params,cb);
		}

		
		service.StartTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerInstances",params,undefined,true); 
			copyArg(n,"taskDefinition",params,undefined,false); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"containerInstances",params,undefined,true); 
			copyArg(msg,"enableECSManagedTags",params,undefined,false); 
			copyArg(msg,"group",params,undefined,false); 
			copyArg(msg,"networkConfiguration",params,undefined,true); 
			copyArg(msg,"overrides",params,undefined,true); 
			copyArg(msg,"propagateTags",params,undefined,false); 
			copyArg(msg,"referenceId",params,undefined,false); 
			copyArg(msg,"startedBy",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"taskDefinition",params,undefined,false); 
			

			svc.startTask(params,cb);
		}

		
		service.StopTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"task",params,undefined,false); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"task",params,undefined,false); 
			copyArg(msg,"reason",params,undefined,false); 
			

			svc.stopTask(params,cb);
		}

		
		service.SubmitAttachmentStateChanges=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"attachments",params,undefined,true); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"attachments",params,undefined,true); 
			

			svc.submitAttachmentStateChanges(params,cb);
		}

		
		service.SubmitContainerStateChange=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"task",params,undefined,false); 
			copyArg(msg,"containerName",params,undefined,false); 
			copyArg(msg,"runtimeId",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"exitCode",params,undefined,false); 
			copyArg(msg,"reason",params,undefined,false); 
			copyArg(msg,"networkBindings",params,undefined,true); 
			

			svc.submitContainerStateChange(params,cb);
		}

		
		service.SubmitTaskStateChange=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"task",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"reason",params,undefined,false); 
			copyArg(msg,"containers",params,undefined,false); 
			copyArg(msg,"attachments",params,undefined,true); 
			copyArg(msg,"pullStartedAt",params,undefined,false); 
			copyArg(msg,"pullStoppedAt",params,undefined,false); 
			copyArg(msg,"executionStoppedAt",params,undefined,false); 
			

			svc.submitTaskStateChange(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateCapacityProvider=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"autoScalingGroupProvider",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"autoScalingGroupProvider",params,undefined,false); 
			

			svc.updateCapacityProvider(params,cb);
		}

		
		service.UpdateClusterSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"cluster",params,undefined,false); 
			copyArg(n,"settings",params,undefined,true); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"settings",params,undefined,true); 
			

			svc.updateClusterSettings(params,cb);
		}

		
		service.UpdateContainerAgent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerInstance",params,undefined,false); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"containerInstance",params,undefined,false); 
			

			svc.updateContainerAgent(params,cb);
		}

		
		service.UpdateContainerInstancesState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerInstances",params,undefined,true); 
			copyArg(n,"status",params,undefined,false); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"containerInstances",params,undefined,true); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.updateContainerInstancesState(params,cb);
		}

		
		service.UpdateService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"service",params,undefined,false); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"service",params,undefined,false); 
			copyArg(msg,"desiredCount",params,undefined,false); 
			copyArg(msg,"taskDefinition",params,undefined,false); 
			copyArg(msg,"capacityProviderStrategy",params,undefined,true); 
			copyArg(msg,"deploymentConfiguration",params,undefined,true); 
			copyArg(msg,"networkConfiguration",params,undefined,true); 
			copyArg(msg,"placementConstraints",params,undefined,true); 
			copyArg(msg,"placementStrategy",params,undefined,true); 
			copyArg(msg,"platformVersion",params,undefined,false); 
			copyArg(msg,"forceNewDeployment",params,undefined,false); 
			copyArg(msg,"healthCheckGracePeriodSeconds",params,undefined,false); 
			

			svc.updateService(params,cb);
		}

		
		service.UpdateServicePrimaryTaskSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"cluster",params,undefined,false); 
			copyArg(n,"service",params,undefined,false); 
			copyArg(n,"primaryTaskSet",params,undefined,false); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"service",params,undefined,false); 
			copyArg(msg,"primaryTaskSet",params,undefined,false); 
			

			svc.updateServicePrimaryTaskSet(params,cb);
		}

		
		service.UpdateTaskSet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"cluster",params,undefined,false); 
			copyArg(n,"service",params,undefined,false); 
			copyArg(n,"taskSet",params,undefined,false); 
			copyArg(n,"scale",params,undefined,true); 
			
			copyArg(msg,"cluster",params,undefined,false); 
			copyArg(msg,"service",params,undefined,false); 
			copyArg(msg,"taskSet",params,undefined,false); 
			copyArg(msg,"scale",params,undefined,true); 
			

			svc.updateTaskSet(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS ECS", AmazonAPINode);

};
