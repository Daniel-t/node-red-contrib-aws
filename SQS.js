
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

		var awsService = new AWS.SQS( { 'region': node.region } );

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
			
			copyArg(n,"QueueUrl",params); 
			copyArg(n,"Label",params); 
			copyArg(n,"AWSAccountIds",params); 
			copyArg(n,"Actions",params); 
			
			copyArg(msg,"QueueUrl",params); 
			copyArg(msg,"Label",params); 
			copyArg(msg,"AWSAccountIds",params); 
			copyArg(msg,"Actions",params); 
			

			svc.addPermission(params,cb);
		}

		
		service.ChangeMessageVisibility=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			copyArg(n,"ReceiptHandle",params); 
			copyArg(n,"VisibilityTimeout",params); 
			
			copyArg(msg,"QueueUrl",params); 
			copyArg(msg,"ReceiptHandle",params); 
			copyArg(msg,"VisibilityTimeout",params); 
			

			svc.changeMessageVisibility(params,cb);
		}

		
		service.ChangeMessageVisibilityBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			copyArg(n,"Entries",params); 
			
			copyArg(msg,"QueueUrl",params); 
			copyArg(msg,"Entries",params); 
			

			svc.changeMessageVisibilityBatch(params,cb);
		}

		
		service.CreateQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueName",params); 
			
			copyArg(msg,"QueueName",params); 
			copyArg(msg,"Attributes",params); 
			

			svc.createQueue(params,cb);
		}

		
		service.DeleteMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			copyArg(n,"ReceiptHandle",params); 
			
			copyArg(msg,"QueueUrl",params); 
			copyArg(msg,"ReceiptHandle",params); 
			

			svc.deleteMessage(params,cb);
		}

		
		service.DeleteMessageBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			copyArg(n,"Entries",params); 
			
			copyArg(msg,"QueueUrl",params); 
			copyArg(msg,"Entries",params); 
			

			svc.deleteMessageBatch(params,cb);
		}

		
		service.DeleteQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			
			copyArg(msg,"QueueUrl",params); 
			

			svc.deleteQueue(params,cb);
		}

		
		service.GetQueueAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			
			copyArg(msg,"QueueUrl",params); 
			copyArg(msg,"AttributeNames",params); 
			

			svc.getQueueAttributes(params,cb);
		}

		
		service.GetQueueUrl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueName",params); 
			
			copyArg(msg,"QueueName",params); 
			copyArg(msg,"QueueOwnerAWSAccountId",params); 
			

			svc.getQueueUrl(params,cb);
		}

		
		service.ListDeadLetterSourceQueues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			
			copyArg(msg,"QueueUrl",params); 
			

			svc.listDeadLetterSourceQueues(params,cb);
		}

		
		service.ListQueueTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			
			copyArg(msg,"QueueUrl",params); 
			

			svc.listQueueTags(params,cb);
		}

		
		service.ListQueues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"QueueNamePrefix",params); 
			

			svc.listQueues(params,cb);
		}

		
		service.PurgeQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			
			copyArg(msg,"QueueUrl",params); 
			

			svc.purgeQueue(params,cb);
		}

		
		service.ReceiveMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			
			copyArg(msg,"QueueUrl",params); 
			copyArg(msg,"AttributeNames",params); 
			copyArg(msg,"MessageAttributeNames",params); 
			copyArg(msg,"MaxNumberOfMessages",params); 
			copyArg(msg,"VisibilityTimeout",params); 
			copyArg(msg,"WaitTimeSeconds",params); 
			copyArg(msg,"ReceiveRequestAttemptId",params); 
			

			svc.receiveMessage(params,cb);
		}

		
		service.RemovePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			copyArg(n,"Label",params); 
			
			copyArg(msg,"QueueUrl",params); 
			copyArg(msg,"Label",params); 
			

			svc.removePermission(params,cb);
		}

		
		service.SendMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			copyArg(n,"MessageBody",params); 
			
			copyArg(msg,"QueueUrl",params); 
			copyArg(msg,"MessageBody",params); 
			copyArg(msg,"DelaySeconds",params); 
			copyArg(msg,"MessageAttributes",params); 
			copyArg(msg,"MessageDeduplicationId",params); 
			copyArg(msg,"MessageGroupId",params); 
			

			svc.sendMessage(params,cb);
		}

		
		service.SendMessageBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			copyArg(n,"Entries",params); 
			
			copyArg(msg,"QueueUrl",params); 
			copyArg(msg,"Entries",params); 
			

			svc.sendMessageBatch(params,cb);
		}

		
		service.SetQueueAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			copyArg(n,"Attributes",params); 
			
			copyArg(msg,"QueueUrl",params); 
			copyArg(msg,"Attributes",params); 
			

			svc.setQueueAttributes(params,cb);
		}

		
		service.TagQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			copyArg(n,"Tags",params); 
			
			copyArg(msg,"QueueUrl",params); 
			copyArg(msg,"Tags",params); 
			

			svc.tagQueue(params,cb);
		}

		
		service.UntagQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params); 
			copyArg(n,"TagKeys",params); 
			
			copyArg(msg,"QueueUrl",params); 
			copyArg(msg,"TagKeys",params); 
			

			svc.untagQueue(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS SQS", AmazonAPINode);

};
