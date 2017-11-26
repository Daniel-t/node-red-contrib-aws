
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

		var awsService = new AWS.Ecs( { 'region': node.region } );

		node.on("input", function(msg) {
			node.sendMsg = function (err, data) {
				if (err) {
				node.status({fill:"red",shape:"ring",text:"error"});
				node.error("failed: " + err.toString(),msg);
				return;
				} else {
				msg.payload = data;
				node.status({});
				}
				node.send(msg);
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
		var copyArg=function(src,arg,out,outArg){
			outArg = (typeof outArg !== 'undefined') ? outArg : arg;
			if (typeof src[arg] !== 'undefined'){
				out[outArg]=src[arg];
			}
		}

		var service={};

		
		service.CreateCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"clusterName",params); 
			

			svc.createCluster(params,cb);
		}

		
		service.CreateService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"serviceName",params); 
			copyArg(n,"taskDefinition",params); 
			copyArg(n,"desiredCount",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"serviceName",params); 
			copyArg(msg,"taskDefinition",params); 
			copyArg(msg,"loadBalancers",params); 
			copyArg(msg,"desiredCount",params); 
			copyArg(msg,"clientToken",params); 
			copyArg(msg,"role",params); 
			copyArg(msg,"deploymentConfiguration",params); 
			copyArg(msg,"placementConstraints",params); 
			copyArg(msg,"placementStrategy",params); 
			copyArg(msg,"networkConfiguration",params); 
			

			svc.createService(params,cb);
		}

		
		service.DeleteAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"attributes",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"attributes",params); 
			

			svc.deleteAttributes(params,cb);
		}

		
		service.DeleteCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"cluster",params); 
			
			copyArg(msg,"cluster",params); 
			

			svc.deleteCluster(params,cb);
		}

		
		service.DeleteService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"service",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"service",params); 
			

			svc.deleteService(params,cb);
		}

		
		service.DeregisterContainerInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerInstance",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"containerInstance",params); 
			copyArg(msg,"force",params); 
			

			svc.deregisterContainerInstance(params,cb);
		}

		
		service.DeregisterTaskDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskDefinition",params); 
			
			copyArg(msg,"taskDefinition",params); 
			

			svc.deregisterTaskDefinition(params,cb);
		}

		
		service.DescribeClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"clusters",params); 
			

			svc.describeClusters(params,cb);
		}

		
		service.DescribeContainerInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerInstances",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"containerInstances",params); 
			

			svc.describeContainerInstances(params,cb);
		}

		
		service.DescribeServices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"services",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"services",params); 
			

			svc.describeServices(params,cb);
		}

		
		service.DescribeTaskDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskDefinition",params); 
			
			copyArg(msg,"taskDefinition",params); 
			

			svc.describeTaskDefinition(params,cb);
		}

		
		service.DescribeTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"tasks",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"tasks",params); 
			

			svc.describeTasks(params,cb);
		}

		
		service.DiscoverPollEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"containerInstance",params); 
			copyArg(msg,"cluster",params); 
			

			svc.discoverPollEndpoint(params,cb);
		}

		
		service.ListAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"targetType",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"targetType",params); 
			copyArg(msg,"attributeName",params); 
			copyArg(msg,"attributeValue",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			

			svc.listAttributes(params,cb);
		}

		
		service.ListClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			

			svc.listClusters(params,cb);
		}

		
		service.ListContainerInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"filter",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"status",params); 
			

			svc.listContainerInstances(params,cb);
		}

		
		service.ListServices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			

			svc.listServices(params,cb);
		}

		
		service.ListTaskDefinitionFamilies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"familyPrefix",params); 
			copyArg(msg,"status",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			

			svc.listTaskDefinitionFamilies(params,cb);
		}

		
		service.ListTaskDefinitions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"familyPrefix",params); 
			copyArg(msg,"status",params); 
			copyArg(msg,"sort",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			

			svc.listTaskDefinitions(params,cb);
		}

		
		service.ListTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"containerInstance",params); 
			copyArg(msg,"family",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"startedBy",params); 
			copyArg(msg,"serviceName",params); 
			copyArg(msg,"desiredStatus",params); 
			

			svc.listTasks(params,cb);
		}

		
		service.PutAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"attributes",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"attributes",params); 
			

			svc.putAttributes(params,cb);
		}

		
		service.RegisterContainerInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"instanceIdentityDocument",params); 
			copyArg(msg,"instanceIdentityDocumentSignature",params); 
			copyArg(msg,"totalResources",params); 
			copyArg(msg,"versionInfo",params); 
			copyArg(msg,"containerInstanceArn",params); 
			copyArg(msg,"attributes",params); 
			

			svc.registerContainerInstance(params,cb);
		}

		
		service.RegisterTaskDefinition=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"family",params); 
			copyArg(n,"containerDefinitions",params); 
			
			copyArg(msg,"family",params); 
			copyArg(msg,"taskRoleArn",params); 
			copyArg(msg,"networkMode",params); 
			copyArg(msg,"containerDefinitions",params); 
			copyArg(msg,"volumes",params); 
			copyArg(msg,"placementConstraints",params); 
			

			svc.registerTaskDefinition(params,cb);
		}

		
		service.RunTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskDefinition",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"taskDefinition",params); 
			copyArg(msg,"overrides",params); 
			copyArg(msg,"count",params); 
			copyArg(msg,"startedBy",params); 
			copyArg(msg,"group",params); 
			copyArg(msg,"placementConstraints",params); 
			copyArg(msg,"placementStrategy",params); 
			copyArg(msg,"networkConfiguration",params); 
			

			svc.runTask(params,cb);
		}

		
		service.StartTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskDefinition",params); 
			copyArg(n,"containerInstances",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"taskDefinition",params); 
			copyArg(msg,"overrides",params); 
			copyArg(msg,"containerInstances",params); 
			copyArg(msg,"startedBy",params); 
			copyArg(msg,"group",params); 
			copyArg(msg,"networkConfiguration",params); 
			

			svc.startTask(params,cb);
		}

		
		service.StopTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"task",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"task",params); 
			copyArg(msg,"reason",params); 
			

			svc.stopTask(params,cb);
		}

		
		service.SubmitContainerStateChange=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"task",params); 
			copyArg(msg,"containerName",params); 
			copyArg(msg,"status",params); 
			copyArg(msg,"exitCode",params); 
			copyArg(msg,"reason",params); 
			copyArg(msg,"networkBindings",params); 
			

			svc.submitContainerStateChange(params,cb);
		}

		
		service.SubmitTaskStateChange=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"task",params); 
			copyArg(msg,"status",params); 
			copyArg(msg,"reason",params); 
			copyArg(msg,"containers",params); 
			copyArg(msg,"attachments",params); 
			

			svc.submitTaskStateChange(params,cb);
		}

		
		service.UpdateContainerAgent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerInstance",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"containerInstance",params); 
			

			svc.updateContainerAgent(params,cb);
		}

		
		service.UpdateContainerInstancesState=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"containerInstances",params); 
			copyArg(n,"status",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"containerInstances",params); 
			copyArg(msg,"status",params); 
			

			svc.updateContainerInstancesState(params,cb);
		}

		
		service.UpdateService=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"service",params); 
			
			copyArg(msg,"cluster",params); 
			copyArg(msg,"service",params); 
			copyArg(msg,"desiredCount",params); 
			copyArg(msg,"taskDefinition",params); 
			copyArg(msg,"deploymentConfiguration",params); 
			copyArg(msg,"networkConfiguration",params); 
			

			svc.updateService(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Ecs", AmazonAPINode);

};
