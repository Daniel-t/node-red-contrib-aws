
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

		var awsService = new AWS.SQS( { 'region': node.region } );

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

		
		service.AddPermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			copyArg(n,"Label",params,undefined,false); 
			copyArg(n,"AWSAccountIds",params,undefined,false); 
			copyArg(n,"Actions",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"Label",params,undefined,false); 
			copyArg(msg,"AWSAccountIds",params,undefined,false); 
			copyArg(msg,"Actions",params,undefined,false); 
			

			svc.addPermission(params,cb);
		}

		
		service.ChangeMessageVisibility=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			copyArg(n,"ReceiptHandle",params,undefined,false); 
			copyArg(n,"VisibilityTimeout",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"ReceiptHandle",params,undefined,false); 
			copyArg(msg,"VisibilityTimeout",params,undefined,false); 
			

			svc.changeMessageVisibility(params,cb);
		}

		
		service.ChangeMessageVisibilityBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			copyArg(n,"Entries",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"Entries",params,undefined,false); 
			

			svc.changeMessageVisibilityBatch(params,cb);
		}

		
		service.CreateQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueName",params,undefined,false); 
			
			copyArg(msg,"QueueName",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createQueue(params,cb);
		}

		
		service.DeleteMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			copyArg(n,"ReceiptHandle",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"ReceiptHandle",params,undefined,false); 
			

			svc.deleteMessage(params,cb);
		}

		
		service.DeleteMessageBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			copyArg(n,"Entries",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"Entries",params,undefined,false); 
			

			svc.deleteMessageBatch(params,cb);
		}

		
		service.DeleteQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			

			svc.deleteQueue(params,cb);
		}

		
		service.GetQueueAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"AttributeNames",params,undefined,true); 
			

			svc.getQueueAttributes(params,cb);
		}

		
		service.GetQueueUrl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueName",params,undefined,false); 
			
			copyArg(msg,"QueueName",params,undefined,false); 
			copyArg(msg,"QueueOwnerAWSAccountId",params,undefined,false); 
			

			svc.getQueueUrl(params,cb);
		}

		
		service.ListDeadLetterSourceQueues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listDeadLetterSourceQueues(params,cb);
		}

		
		service.ListQueueTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			

			svc.listQueueTags(params,cb);
		}

		
		service.ListQueues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"QueueNamePrefix",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listQueues(params,cb);
		}

		
		service.PurgeQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			

			svc.purgeQueue(params,cb);
		}

		
		service.ReceiveMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"AttributeNames",params,undefined,true); 
			copyArg(msg,"MessageAttributeNames",params,undefined,false); 
			copyArg(msg,"MaxNumberOfMessages",params,undefined,false); 
			copyArg(msg,"VisibilityTimeout",params,undefined,false); 
			copyArg(msg,"WaitTimeSeconds",params,undefined,false); 
			copyArg(msg,"ReceiveRequestAttemptId",params,undefined,false); 
			

			svc.receiveMessage(params,cb);
		}

		
		service.RemovePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			copyArg(n,"Label",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"Label",params,undefined,false); 
			

			svc.removePermission(params,cb);
		}

		
		service.SendMessage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			copyArg(n,"MessageBody",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"MessageBody",params,undefined,false); 
			copyArg(msg,"DelaySeconds",params,undefined,false); 
			copyArg(msg,"MessageAttributes",params,undefined,true); 
			copyArg(msg,"MessageSystemAttributes",params,undefined,true); 
			copyArg(msg,"MessageDeduplicationId",params,undefined,false); 
			copyArg(msg,"MessageGroupId",params,undefined,false); 
			

			svc.sendMessage(params,cb);
		}

		
		service.SendMessageBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			copyArg(n,"Entries",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"Entries",params,undefined,false); 
			

			svc.sendMessageBatch(params,cb);
		}

		
		service.SetQueueAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			copyArg(n,"Attributes",params,undefined,true); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			

			svc.setQueueAttributes(params,cb);
		}

		
		service.TagQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagQueue(params,cb);
		}

		
		service.UntagQueue=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"QueueUrl",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"QueueUrl",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagQueue(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS SQS", AmazonAPINode);

};
