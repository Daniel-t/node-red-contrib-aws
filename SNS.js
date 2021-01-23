
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

		var awsService = new AWS.SNS( { 'region': node.region } );

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
			
			copyArg(n,"TopicArn",params,undefined,false); 
			copyArg(n,"Label",params,undefined,false); 
			copyArg(n,"AWSAccountId",params,undefined,false); 
			copyArg(n,"ActionName",params,undefined,false); 
			
			copyArg(msg,"TopicArn",params,undefined,false); 
			copyArg(msg,"Label",params,undefined,false); 
			copyArg(msg,"AWSAccountId",params,undefined,false); 
			copyArg(msg,"ActionName",params,undefined,false); 
			

			svc.addPermission(params,cb);
		}

		
		service.CheckIfPhoneNumberIsOptedOut=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"phoneNumber",params,undefined,false); 
			
			copyArg(msg,"phoneNumber",params,undefined,false); 
			

			svc.checkIfPhoneNumberIsOptedOut(params,cb);
		}

		
		service.ConfirmSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params,undefined,false); 
			copyArg(n,"Token",params,undefined,false); 
			
			copyArg(msg,"TopicArn",params,undefined,false); 
			copyArg(msg,"Token",params,undefined,false); 
			copyArg(msg,"AuthenticateOnUnsubscribe",params,undefined,false); 
			

			svc.confirmSubscription(params,cb);
		}

		
		service.CreatePlatformApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Platform",params,undefined,false); 
			copyArg(n,"Attributes",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Platform",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			

			svc.createPlatformApplication(params,cb);
		}

		
		service.CreatePlatformEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlatformApplicationArn",params,undefined,false); 
			copyArg(n,"Token",params,undefined,false); 
			
			copyArg(msg,"PlatformApplicationArn",params,undefined,false); 
			copyArg(msg,"Token",params,undefined,false); 
			copyArg(msg,"CustomUserData",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			

			svc.createPlatformEndpoint(params,cb);
		}

		
		service.CreateTopic=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTopic(params,cb);
		}

		
		service.DeleteEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointArn",params,undefined,false); 
			
			copyArg(msg,"EndpointArn",params,undefined,false); 
			

			svc.deleteEndpoint(params,cb);
		}

		
		service.DeletePlatformApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlatformApplicationArn",params,undefined,false); 
			
			copyArg(msg,"PlatformApplicationArn",params,undefined,false); 
			

			svc.deletePlatformApplication(params,cb);
		}

		
		service.DeleteTopic=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params,undefined,false); 
			
			copyArg(msg,"TopicArn",params,undefined,false); 
			

			svc.deleteTopic(params,cb);
		}

		
		service.GetEndpointAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointArn",params,undefined,false); 
			
			copyArg(msg,"EndpointArn",params,undefined,false); 
			

			svc.getEndpointAttributes(params,cb);
		}

		
		service.GetPlatformApplicationAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlatformApplicationArn",params,undefined,false); 
			
			copyArg(msg,"PlatformApplicationArn",params,undefined,false); 
			

			svc.getPlatformApplicationAttributes(params,cb);
		}

		
		service.GetSMSAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"attributes",params,undefined,false); 
			

			svc.getSMSAttributes(params,cb);
		}

		
		service.GetSubscriptionAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionArn",params,undefined,false); 
			
			copyArg(msg,"SubscriptionArn",params,undefined,false); 
			

			svc.getSubscriptionAttributes(params,cb);
		}

		
		service.GetTopicAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params,undefined,false); 
			
			copyArg(msg,"TopicArn",params,undefined,false); 
			

			svc.getTopicAttributes(params,cb);
		}

		
		service.ListEndpointsByPlatformApplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlatformApplicationArn",params,undefined,false); 
			
			copyArg(msg,"PlatformApplicationArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listEndpointsByPlatformApplication(params,cb);
		}

		
		service.ListPhoneNumbersOptedOut=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listPhoneNumbersOptedOut(params,cb);
		}

		
		service.ListPlatformApplications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listPlatformApplications(params,cb);
		}

		
		service.ListSubscriptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listSubscriptions(params,cb);
		}

		
		service.ListSubscriptionsByTopic=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params,undefined,false); 
			
			copyArg(msg,"TopicArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listSubscriptionsByTopic(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTopics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTopics(params,cb);
		}

		
		service.OptInPhoneNumber=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"phoneNumber",params,undefined,false); 
			
			copyArg(msg,"phoneNumber",params,undefined,false); 
			

			svc.optInPhoneNumber(params,cb);
		}

		
		service.Publish=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Message",params,undefined,false); 
			
			copyArg(msg,"TopicArn",params,undefined,false); 
			copyArg(msg,"TargetArn",params,undefined,false); 
			copyArg(msg,"PhoneNumber",params,undefined,false); 
			copyArg(msg,"Message",params,undefined,false); 
			copyArg(msg,"Subject",params,undefined,false); 
			copyArg(msg,"MessageStructure",params,undefined,false); 
			copyArg(msg,"MessageAttributes",params,undefined,false); 
			copyArg(msg,"MessageDeduplicationId",params,undefined,false); 
			copyArg(msg,"MessageGroupId",params,undefined,false); 
			

			svc.publish(params,cb);
		}

		
		service.RemovePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params,undefined,false); 
			copyArg(n,"Label",params,undefined,false); 
			
			copyArg(msg,"TopicArn",params,undefined,false); 
			copyArg(msg,"Label",params,undefined,false); 
			

			svc.removePermission(params,cb);
		}

		
		service.SetEndpointAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EndpointArn",params,undefined,false); 
			copyArg(n,"Attributes",params,undefined,true); 
			
			copyArg(msg,"EndpointArn",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			

			svc.setEndpointAttributes(params,cb);
		}

		
		service.SetPlatformApplicationAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PlatformApplicationArn",params,undefined,false); 
			copyArg(n,"Attributes",params,undefined,true); 
			
			copyArg(msg,"PlatformApplicationArn",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			

			svc.setPlatformApplicationAttributes(params,cb);
		}

		
		service.SetSMSAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"attributes",params,undefined,true); 
			
			copyArg(msg,"attributes",params,undefined,true); 
			

			svc.setSMSAttributes(params,cb);
		}

		
		service.SetSubscriptionAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionArn",params,undefined,false); 
			copyArg(n,"AttributeName",params,undefined,false); 
			
			copyArg(msg,"SubscriptionArn",params,undefined,false); 
			copyArg(msg,"AttributeName",params,undefined,false); 
			copyArg(msg,"AttributeValue",params,undefined,false); 
			

			svc.setSubscriptionAttributes(params,cb);
		}

		
		service.SetTopicAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params,undefined,false); 
			copyArg(n,"AttributeName",params,undefined,false); 
			
			copyArg(msg,"TopicArn",params,undefined,false); 
			copyArg(msg,"AttributeName",params,undefined,false); 
			copyArg(msg,"AttributeValue",params,undefined,false); 
			

			svc.setTopicAttributes(params,cb);
		}

		
		service.Subscribe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TopicArn",params,undefined,false); 
			copyArg(n,"Protocol",params,undefined,false); 
			
			copyArg(msg,"TopicArn",params,undefined,false); 
			copyArg(msg,"Protocol",params,undefined,false); 
			copyArg(msg,"Endpoint",params,undefined,false); 
			copyArg(msg,"Attributes",params,undefined,true); 
			copyArg(msg,"ReturnSubscriptionArn",params,undefined,false); 
			

			svc.subscribe(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.Unsubscribe=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionArn",params,undefined,false); 
			
			copyArg(msg,"SubscriptionArn",params,undefined,false); 
			

			svc.unsubscribe(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS SNS", AmazonAPINode);

};
