
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

		var awsService = new AWS.Kinesis( { 'region': node.region } );

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

		
		service.AddTagsToStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,false); 
			

			svc.addTagsToStream(params,cb);
		}

		
		service.CreateStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			copyArg(n,"ShardCount",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"ShardCount",params,undefined,false); 
			

			svc.createStream(params,cb);
		}

		
		service.DecreaseStreamRetentionPeriod=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			copyArg(n,"RetentionPeriodHours",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"RetentionPeriodHours",params,undefined,false); 
			

			svc.decreaseStreamRetentionPeriod(params,cb);
		}

		
		service.DeleteStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"EnforceConsumerDeletion",params,undefined,false); 
			

			svc.deleteStream(params,cb);
		}

		
		service.DeregisterStreamConsumer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StreamARN",params,undefined,false); 
			copyArg(msg,"ConsumerName",params,undefined,false); 
			copyArg(msg,"ConsumerARN",params,undefined,false); 
			

			svc.deregisterStreamConsumer(params,cb);
		}

		
		service.DescribeLimits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeLimits(params,cb);
		}

		
		service.DescribeStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"ExclusiveStartShardId",params,undefined,false); 
			

			svc.describeStream(params,cb);
		}

		
		service.DescribeStreamConsumer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StreamARN",params,undefined,false); 
			copyArg(msg,"ConsumerName",params,undefined,false); 
			copyArg(msg,"ConsumerARN",params,undefined,false); 
			

			svc.describeStreamConsumer(params,cb);
		}

		
		service.DescribeStreamSummary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			

			svc.describeStreamSummary(params,cb);
		}

		
		service.DisableEnhancedMonitoring=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			copyArg(n,"ShardLevelMetrics",params,undefined,true); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"ShardLevelMetrics",params,undefined,true); 
			

			svc.disableEnhancedMonitoring(params,cb);
		}

		
		service.EnableEnhancedMonitoring=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			copyArg(n,"ShardLevelMetrics",params,undefined,true); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"ShardLevelMetrics",params,undefined,true); 
			

			svc.enableEnhancedMonitoring(params,cb);
		}

		
		service.GetRecords=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ShardIterator",params,undefined,false); 
			
			copyArg(msg,"ShardIterator",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.getRecords(params,cb);
		}

		
		service.GetShardIterator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			copyArg(n,"ShardId",params,undefined,false); 
			copyArg(n,"ShardIteratorType",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"ShardId",params,undefined,false); 
			copyArg(msg,"ShardIteratorType",params,undefined,false); 
			copyArg(msg,"StartingSequenceNumber",params,undefined,false); 
			copyArg(msg,"Timestamp",params,undefined,false); 
			

			svc.getShardIterator(params,cb);
		}

		
		service.IncreaseStreamRetentionPeriod=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			copyArg(n,"RetentionPeriodHours",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"RetentionPeriodHours",params,undefined,false); 
			

			svc.increaseStreamRetentionPeriod(params,cb);
		}

		
		service.ListShards=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"ExclusiveStartShardId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"StreamCreationTimestamp",params,undefined,false); 
			

			svc.listShards(params,cb);
		}

		
		service.ListStreamConsumers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamARN",params,undefined,false); 
			
			copyArg(msg,"StreamARN",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"StreamCreationTimestamp",params,undefined,false); 
			

			svc.listStreamConsumers(params,cb);
		}

		
		service.ListStreams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"ExclusiveStartStreamName",params,undefined,false); 
			

			svc.listStreams(params,cb);
		}

		
		service.ListTagsForStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"ExclusiveStartTagKey",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listTagsForStream(params,cb);
		}

		
		service.MergeShards=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			copyArg(n,"ShardToMerge",params,undefined,false); 
			copyArg(n,"AdjacentShardToMerge",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"ShardToMerge",params,undefined,false); 
			copyArg(msg,"AdjacentShardToMerge",params,undefined,false); 
			

			svc.mergeShards(params,cb);
		}

		
		service.PutRecord = function (svc, msg, cb) {


			var params = {};
			//copyArgs

			if (n.Data.indexOf('msg') >= 0) {
				/** 
				 * to handle msg or msg.payload
				 * https://github.com/joeartsea/node-red-contrib-aws/blob/master/kinesis.js
				 * set Data as msg.payload || msg.topic
				 * */

				params = {
					Data: (n.Data.indexOf('.') >= 3) ? msg[n.Data.split(".")[1]] : msg,
					StreamName: n.StreamName || msg.streamname,
					PartitionKey: n.PartitionKey || msg.partitionkey,
					ExplicitHashKey: n.ExplicitHashKey || msg.explicithashkey,
					SequenceNumberForOrdering: n.SequenceNumberForOrdering || msg.SequenceNumberForOrdering
				};
				node.status({ fill: "blue", shape: "dot", text: "custom puts data record" });
			} else {
				copyArg(n, "StreamName", params, undefined, false);
				copyArg(n, "Data", params, undefined, false);
				copyArg(n, "PartitionKey", params, undefined, false);

				copyArg(msg, "StreamName", params, undefined, false);
				copyArg(msg, "Data", params, undefined, false);
				copyArg(msg, "PartitionKey", params, undefined, false);
				copyArg(msg, "ExplicitHashKey", params, undefined, false);
				copyArg(msg, "SequenceNumberForOrdering", params, undefined, false);
				node.status({ fill: "blue", shape: "dot", text: "original puts data record" });
			}


			node.status({ fill: "blue", shape: "dot", text: "PutRecord to AWS" });
			node.warn("n");
			node.warn(n);
			svc.putRecord(params, cb);
		}

		
		service.PutRecords=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Records",params,undefined,false); 
			copyArg(n,"StreamName",params,undefined,false); 
			
			copyArg(msg,"Records",params,undefined,false); 
			copyArg(msg,"StreamName",params,undefined,false); 
			

			svc.putRecords(params,cb);
		}

		
		service.RegisterStreamConsumer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamARN",params,undefined,false); 
			copyArg(n,"ConsumerName",params,undefined,false); 
			
			copyArg(msg,"StreamARN",params,undefined,false); 
			copyArg(msg,"ConsumerName",params,undefined,false); 
			

			svc.registerStreamConsumer(params,cb);
		}

		
		service.RemoveTagsFromStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.removeTagsFromStream(params,cb);
		}

		
		service.SplitShard=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			copyArg(n,"ShardToSplit",params,undefined,false); 
			copyArg(n,"NewStartingHashKey",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"ShardToSplit",params,undefined,false); 
			copyArg(msg,"NewStartingHashKey",params,undefined,false); 
			

			svc.splitShard(params,cb);
		}

		
		service.StartStreamEncryption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			copyArg(n,"EncryptionType",params,undefined,false); 
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"EncryptionType",params,undefined,false); 
			copyArg(msg,"KeyId",params,undefined,false); 
			

			svc.startStreamEncryption(params,cb);
		}

		
		service.StopStreamEncryption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			copyArg(n,"EncryptionType",params,undefined,false); 
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"EncryptionType",params,undefined,false); 
			copyArg(msg,"KeyId",params,undefined,false); 
			

			svc.stopStreamEncryption(params,cb);
		}

		
		service.UpdateShardCount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params,undefined,false); 
			copyArg(n,"TargetShardCount",params,undefined,false); 
			copyArg(n,"ScalingType",params,undefined,false); 
			
			copyArg(msg,"StreamName",params,undefined,false); 
			copyArg(msg,"TargetShardCount",params,undefined,false); 
			copyArg(msg,"ScalingType",params,undefined,false); 
			

			svc.updateShardCount(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Kinesis", AmazonAPINode);

};
