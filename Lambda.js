
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

		var awsService = new AWS.Lambda( { 'region': node.region } );

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

		
		service.AddPermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			copyArg(n,"StatementId",params); 
			copyArg(n,"Action",params); 
			copyArg(n,"Principal",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"StatementId",params); 
			copyArg(msg,"Action",params); 
			copyArg(msg,"Principal",params); 
			copyArg(msg,"SourceArn",params); 
			copyArg(msg,"SourceAccount",params); 
			copyArg(msg,"EventSourceToken",params); 
			copyArg(msg,"Qualifier",params); 
			

			svc.addPermission(params,cb);
		}

		
		service.CreateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			copyArg(n,"Name",params); 
			copyArg(n,"FunctionVersion",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Name",params); 
			copyArg(msg,"FunctionVersion",params); 
			copyArg(msg,"Description",params); 
			

			svc.createAlias(params,cb);
		}

		
		service.CreateEventSourceMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EventSourceArn",params); 
			copyArg(n,"FunctionName",params); 
			copyArg(n,"StartingPosition",params); 
			
			copyArg(msg,"EventSourceArn",params); 
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Enabled",params); 
			copyArg(msg,"BatchSize",params); 
			copyArg(msg,"StartingPosition",params); 
			copyArg(msg,"StartingPositionTimestamp",params); 
			

			svc.createEventSourceMapping(params,cb);
		}

		
		service.CreateFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			copyArg(n,"Runtime",params); 
			copyArg(n,"Role",params); 
			copyArg(n,"Handler",params); 
			copyArg(n,"Code",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Runtime",params); 
			copyArg(msg,"Role",params); 
			copyArg(msg,"Handler",params); 
			copyArg(msg,"Code",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"Timeout",params); 
			copyArg(msg,"MemorySize",params); 
			copyArg(msg,"Publish",params); 
			copyArg(msg,"VpcConfig",params); 
			copyArg(msg,"DeadLetterConfig",params); 
			copyArg(msg,"Environment",params); 
			copyArg(msg,"KMSKeyArn",params); 
			copyArg(msg,"TracingConfig",params); 
			copyArg(msg,"Tags",params); 
			

			svc.createFunction(params,cb);
		}

		
		service.DeleteAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			copyArg(n,"Name",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Name",params); 
			

			svc.deleteAlias(params,cb);
		}

		
		service.DeleteEventSourceMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UUID",params); 
			
			copyArg(msg,"UUID",params); 
			

			svc.deleteEventSourceMapping(params,cb);
		}

		
		service.DeleteFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Qualifier",params); 
			

			svc.deleteFunction(params,cb);
		}

		
		service.GetAccountSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getAccountSettings(params,cb);
		}

		
		service.GetAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			copyArg(n,"Name",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Name",params); 
			

			svc.getAlias(params,cb);
		}

		
		service.GetEventSourceMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UUID",params); 
			
			copyArg(msg,"UUID",params); 
			

			svc.getEventSourceMapping(params,cb);
		}

		
		service.GetFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Qualifier",params); 
			

			svc.getFunction(params,cb);
		}

		
		service.GetFunctionConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Qualifier",params); 
			

			svc.getFunctionConfiguration(params,cb);
		}

		
		service.GetPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Qualifier",params); 
			

			svc.getPolicy(params,cb);
		}

		
		service.Invoke=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"InvocationType",params); 
			copyArg(msg,"LogType",params); 
			copyArg(msg,"ClientContext",params); 
			copyArg(msg,"Payload",params); 
			copyArg(msg,"Qualifier",params); 
			

			svc.invoke(params,cb);
		}

		
		service.InvokeAsync=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			copyArg(n,"InvokeArgs",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"InvokeArgs",params); 
			

			svc.invokeAsync(params,cb);
		}

		
		service.ListAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"FunctionVersion",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"MaxItems",params); 
			

			svc.listAliases(params,cb);
		}

		
		service.ListEventSourceMappings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"EventSourceArn",params); 
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"MaxItems",params); 
			

			svc.listEventSourceMappings(params,cb);
		}

		
		service.ListFunctions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MasterRegion",params); 
			copyArg(msg,"FunctionVersion",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"MaxItems",params); 
			

			svc.listFunctions(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params); 
			
			copyArg(msg,"Resource",params); 
			

			svc.listTags(params,cb);
		}

		
		service.ListVersionsByFunction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"MaxItems",params); 
			

			svc.listVersionsByFunction(params,cb);
		}

		
		service.PublishVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"CodeSha256",params); 
			copyArg(msg,"Description",params); 
			

			svc.publishVersion(params,cb);
		}

		
		service.RemovePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			copyArg(n,"StatementId",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"StatementId",params); 
			copyArg(msg,"Qualifier",params); 
			

			svc.removePermission(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params); 
			copyArg(n,"Tags",params); 
			
			copyArg(msg,"Resource",params); 
			copyArg(msg,"Tags",params); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params); 
			copyArg(n,"TagKeys",params); 
			
			copyArg(msg,"Resource",params); 
			copyArg(msg,"TagKeys",params); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			copyArg(n,"Name",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Name",params); 
			copyArg(msg,"FunctionVersion",params); 
			copyArg(msg,"Description",params); 
			

			svc.updateAlias(params,cb);
		}

		
		service.UpdateEventSourceMapping=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UUID",params); 
			
			copyArg(msg,"UUID",params); 
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Enabled",params); 
			copyArg(msg,"BatchSize",params); 
			

			svc.updateEventSourceMapping(params,cb);
		}

		
		service.UpdateFunctionCode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"ZipFile",params); 
			copyArg(msg,"S3Bucket",params); 
			copyArg(msg,"S3Key",params); 
			copyArg(msg,"S3ObjectVersion",params); 
			copyArg(msg,"Publish",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.updateFunctionCode(params,cb);
		}

		
		service.UpdateFunctionConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FunctionName",params); 
			
			copyArg(msg,"FunctionName",params); 
			copyArg(msg,"Role",params); 
			copyArg(msg,"Handler",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"Timeout",params); 
			copyArg(msg,"MemorySize",params); 
			copyArg(msg,"VpcConfig",params); 
			copyArg(msg,"Environment",params); 
			copyArg(msg,"Runtime",params); 
			copyArg(msg,"DeadLetterConfig",params); 
			copyArg(msg,"KMSKeyArn",params); 
			copyArg(msg,"TracingConfig",params); 
			

			svc.updateFunctionConfiguration(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Lambda", AmazonAPINode);

};
