
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

		var awsService = new AWS.Firehose( { 'region': node.region } );

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

		
		service.CreateDeliveryStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliveryStreamName",params,undefined,false); 
			
			copyArg(msg,"DeliveryStreamName",params,undefined,false); 
			copyArg(msg,"DeliveryStreamType",params,undefined,false); 
			copyArg(msg,"KinesisStreamSourceConfiguration",params,undefined,false); 
			copyArg(msg,"DeliveryStreamEncryptionConfigurationInput",params,undefined,true); 
			copyArg(msg,"S3DestinationConfiguration",params,undefined,true); 
			copyArg(msg,"ExtendedS3DestinationConfiguration",params,undefined,false); 
			copyArg(msg,"RedshiftDestinationConfiguration",params,undefined,false); 
			copyArg(msg,"ElasticsearchDestinationConfiguration",params,undefined,false); 
			copyArg(msg,"SplunkDestinationConfiguration",params,undefined,false); 
			copyArg(msg,"HttpEndpointDestinationConfiguration",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createDeliveryStream(params,cb);
		}

		
		service.DeleteDeliveryStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliveryStreamName",params,undefined,false); 
			
			copyArg(msg,"DeliveryStreamName",params,undefined,false); 
			copyArg(msg,"AllowForceDelete",params,undefined,false); 
			

			svc.deleteDeliveryStream(params,cb);
		}

		
		service.DescribeDeliveryStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliveryStreamName",params,undefined,false); 
			
			copyArg(msg,"DeliveryStreamName",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"ExclusiveStartDestinationId",params,undefined,false); 
			

			svc.describeDeliveryStream(params,cb);
		}

		
		service.ListDeliveryStreams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"DeliveryStreamType",params,undefined,false); 
			copyArg(msg,"ExclusiveStartDeliveryStreamName",params,undefined,false); 
			

			svc.listDeliveryStreams(params,cb);
		}

		
		service.ListTagsForDeliveryStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliveryStreamName",params,undefined,false); 
			
			copyArg(msg,"DeliveryStreamName",params,undefined,false); 
			copyArg(msg,"ExclusiveStartTagKey",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listTagsForDeliveryStream(params,cb);
		}

		
		service.PutRecord=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliveryStreamName",params,undefined,false); 
			copyArg(n,"Record",params,undefined,true); 
			
			copyArg(msg,"DeliveryStreamName",params,undefined,false); 
			copyArg(msg,"Record",params,undefined,true); 
			

			svc.putRecord(params,cb);
		}

		
		service.PutRecordBatch=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliveryStreamName",params,undefined,false); 
			copyArg(n,"Records",params,undefined,false); 
			
			copyArg(msg,"DeliveryStreamName",params,undefined,false); 
			copyArg(msg,"Records",params,undefined,false); 
			

			svc.putRecordBatch(params,cb);
		}

		
		service.StartDeliveryStreamEncryption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliveryStreamName",params,undefined,false); 
			
			copyArg(msg,"DeliveryStreamName",params,undefined,false); 
			copyArg(msg,"DeliveryStreamEncryptionConfigurationInput",params,undefined,true); 
			

			svc.startDeliveryStreamEncryption(params,cb);
		}

		
		service.StopDeliveryStreamEncryption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliveryStreamName",params,undefined,false); 
			
			copyArg(msg,"DeliveryStreamName",params,undefined,false); 
			

			svc.stopDeliveryStreamEncryption(params,cb);
		}

		
		service.TagDeliveryStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliveryStreamName",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"DeliveryStreamName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagDeliveryStream(params,cb);
		}

		
		service.UntagDeliveryStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliveryStreamName",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"DeliveryStreamName",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagDeliveryStream(params,cb);
		}

		
		service.UpdateDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliveryStreamName",params,undefined,false); 
			copyArg(n,"CurrentDeliveryStreamVersionId",params,undefined,false); 
			copyArg(n,"DestinationId",params,undefined,false); 
			
			copyArg(msg,"DeliveryStreamName",params,undefined,false); 
			copyArg(msg,"CurrentDeliveryStreamVersionId",params,undefined,false); 
			copyArg(msg,"DestinationId",params,undefined,false); 
			copyArg(msg,"S3DestinationUpdate",params,undefined,true); 
			copyArg(msg,"ExtendedS3DestinationUpdate",params,undefined,false); 
			copyArg(msg,"RedshiftDestinationUpdate",params,undefined,false); 
			copyArg(msg,"ElasticsearchDestinationUpdate",params,undefined,false); 
			copyArg(msg,"SplunkDestinationUpdate",params,undefined,false); 
			copyArg(msg,"HttpEndpointDestinationUpdate",params,undefined,false); 
			

			svc.updateDestination(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Firehose", AmazonAPINode);

};
