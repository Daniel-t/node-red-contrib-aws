
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

		var awsService = new AWS.SNS( { 'region': node.region } );

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
			
			copyArg(n,"TopicArn",params); 
			copyArg(n,"Label",params); 
			copyArg(n,"AWSAccountId",params); 
			copyArg(n,"ActionName",params); 
			
			copyArg(msg,"TopicArn",params); 
			copyArg(msg,"Label",params); 
			copyArg(msg,"AWSAccountId",params); 
			copyArg(msg,"ActionName",params); 
			

			svc.addPermission(params,cb);
		}

		
		service.CheckIfPhoneNumberIsOptedOut=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"phoneNumber",params); 
			
			copyArg(msg,"phoneNumber",params); 
			

			svc.checkIfPhoneNumberIsOptedOut(params,cb);
		}

		
		service.ConfirmSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params); 
			copyArg(n,"Token",params); 
			
			copyArg(msg,"TopicArn",params); 
			copyArg(msg,"Token",params); 
			copyArg(msg,"AuthenticateOnUnsubscribe",params); 
			

			svc.confirmSubscription(params,cb);
		}

		
		service.CreatePlatformApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params); 
			copyArg(n,"Platform",params); 
			copyArg(n,"Attributes",params); 
			
			copyArg(msg,"Name",params); 
			copyArg(msg,"Platform",params); 
			copyArg(msg,"Attributes",params); 
			

			svc.createPlatformApplication(params,cb);
		}

		
		service.CreatePlatformEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlatformApplicationArn",params); 
			copyArg(n,"Token",params); 
			
			copyArg(msg,"PlatformApplicationArn",params); 
			copyArg(msg,"Token",params); 
			copyArg(msg,"CustomUserData",params); 
			copyArg(msg,"Attributes",params); 
			

			svc.createPlatformEndpoint(params,cb);
		}

		
		service.CreateTopic=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params); 
			
			copyArg(msg,"Name",params); 
			

			svc.createTopic(params,cb);
		}

		
		service.DeleteEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointArn",params); 
			
			copyArg(msg,"EndpointArn",params); 
			

			svc.deleteEndpoint(params,cb);
		}

		
		service.DeletePlatformApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlatformApplicationArn",params); 
			
			copyArg(msg,"PlatformApplicationArn",params); 
			

			svc.deletePlatformApplication(params,cb);
		}

		
		service.DeleteTopic=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params); 
			
			copyArg(msg,"TopicArn",params); 
			

			svc.deleteTopic(params,cb);
		}

		
		service.GetEndpointAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointArn",params); 
			
			copyArg(msg,"EndpointArn",params); 
			

			svc.getEndpointAttributes(params,cb);
		}

		
		service.GetPlatformApplicationAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlatformApplicationArn",params); 
			
			copyArg(msg,"PlatformApplicationArn",params); 
			

			svc.getPlatformApplicationAttributes(params,cb);
		}

		
		service.GetSMSAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"attributes",params); 
			

			svc.getSMSAttributes(params,cb);
		}

		
		service.GetSubscriptionAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionArn",params); 
			
			copyArg(msg,"SubscriptionArn",params); 
			

			svc.getSubscriptionAttributes(params,cb);
		}

		
		service.GetTopicAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params); 
			
			copyArg(msg,"TopicArn",params); 
			

			svc.getTopicAttributes(params,cb);
		}

		
		service.ListEndpointsByPlatformApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlatformApplicationArn",params); 
			
			copyArg(msg,"PlatformApplicationArn",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.listEndpointsByPlatformApplication(params,cb);
		}

		
		service.ListPhoneNumbersOptedOut=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params); 
			

			svc.listPhoneNumbersOptedOut(params,cb);
		}

		
		service.ListPlatformApplications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params); 
			

			svc.listPlatformApplications(params,cb);
		}

		
		service.ListSubscriptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params); 
			

			svc.listSubscriptions(params,cb);
		}

		
		service.ListSubscriptionsByTopic=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params); 
			
			copyArg(msg,"TopicArn",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.listSubscriptionsByTopic(params,cb);
		}

		
		service.ListTopics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params); 
			

			svc.listTopics(params,cb);
		}

		
		service.OptInPhoneNumber=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"phoneNumber",params); 
			
			copyArg(msg,"phoneNumber",params); 
			

			svc.optInPhoneNumber(params,cb);
		}

		
		service.Publish=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Message",params); 
			
			copyArg(msg,"TopicArn",params); 
			copyArg(msg,"TargetArn",params); 
			copyArg(msg,"PhoneNumber",params); 
			copyArg(msg,"Message",params); 
			copyArg(msg,"Subject",params); 
			copyArg(msg,"MessageStructure",params); 
			copyArg(msg,"MessageAttributes",params); 
			

			svc.publish(params,cb);
		}

		
		service.RemovePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params); 
			copyArg(n,"Label",params); 
			
			copyArg(msg,"TopicArn",params); 
			copyArg(msg,"Label",params); 
			

			svc.removePermission(params,cb);
		}

		
		service.SetEndpointAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointArn",params); 
			copyArg(n,"Attributes",params); 
			
			copyArg(msg,"EndpointArn",params); 
			copyArg(msg,"Attributes",params); 
			

			svc.setEndpointAttributes(params,cb);
		}

		
		service.SetPlatformApplicationAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlatformApplicationArn",params); 
			copyArg(n,"Attributes",params); 
			
			copyArg(msg,"PlatformApplicationArn",params); 
			copyArg(msg,"Attributes",params); 
			

			svc.setPlatformApplicationAttributes(params,cb);
		}

		
		service.SetSMSAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"attributes",params); 
			
			copyArg(msg,"attributes",params); 
			

			svc.setSMSAttributes(params,cb);
		}

		
		service.SetSubscriptionAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionArn",params); 
			copyArg(n,"AttributeName",params); 
			
			copyArg(msg,"SubscriptionArn",params); 
			copyArg(msg,"AttributeName",params); 
			copyArg(msg,"AttributeValue",params); 
			

			svc.setSubscriptionAttributes(params,cb);
		}

		
		service.SetTopicAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params); 
			copyArg(n,"AttributeName",params); 
			
			copyArg(msg,"TopicArn",params); 
			copyArg(msg,"AttributeName",params); 
			copyArg(msg,"AttributeValue",params); 
			

			svc.setTopicAttributes(params,cb);
		}

		
		service.Subscribe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params); 
			copyArg(n,"Protocol",params); 
			
			copyArg(msg,"TopicArn",params); 
			copyArg(msg,"Protocol",params); 
			copyArg(msg,"Endpoint",params); 
			

			svc.subscribe(params,cb);
		}

		
		service.Unsubscribe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionArn",params); 
			
			copyArg(msg,"SubscriptionArn",params); 
			

			svc.unsubscribe(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS SNS", AmazonAPINode);

};
