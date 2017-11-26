
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

		var awsService = new AWS.Kinesis( { 'region': node.region } );

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

		
		service.AddTagsToStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"Tags",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"Tags",params); 
			

			svc.addTagsToStream(params,cb);
		}

		
		service.CreateStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"ShardCount",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"ShardCount",params); 
			

			svc.createStream(params,cb);
		}

		
		service.DecreaseStreamRetentionPeriod=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"RetentionPeriodHours",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"RetentionPeriodHours",params); 
			

			svc.decreaseStreamRetentionPeriod(params,cb);
		}

		
		service.DeleteStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			
			copyArg(msg,"StreamName",params); 
			

			svc.deleteStream(params,cb);
		}

		
		service.DescribeLimits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeLimits(params,cb);
		}

		
		service.DescribeStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"Limit",params); 
			copyArg(msg,"ExclusiveStartShardId",params); 
			

			svc.describeStream(params,cb);
		}

		
		service.DisableEnhancedMonitoring=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"ShardLevelMetrics",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"ShardLevelMetrics",params); 
			

			svc.disableEnhancedMonitoring(params,cb);
		}

		
		service.EnableEnhancedMonitoring=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"ShardLevelMetrics",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"ShardLevelMetrics",params); 
			

			svc.enableEnhancedMonitoring(params,cb);
		}

		
		service.GetRecords=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ShardIterator",params); 
			
			copyArg(msg,"ShardIterator",params); 
			copyArg(msg,"Limit",params); 
			

			svc.getRecords(params,cb);
		}

		
		service.GetShardIterator=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"ShardId",params); 
			copyArg(n,"ShardIteratorType",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"ShardId",params); 
			copyArg(msg,"ShardIteratorType",params); 
			copyArg(msg,"StartingSequenceNumber",params); 
			copyArg(msg,"Timestamp",params); 
			

			svc.getShardIterator(params,cb);
		}

		
		service.IncreaseStreamRetentionPeriod=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"RetentionPeriodHours",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"RetentionPeriodHours",params); 
			

			svc.increaseStreamRetentionPeriod(params,cb);
		}

		
		service.ListStreams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Limit",params); 
			copyArg(msg,"ExclusiveStartStreamName",params); 
			

			svc.listStreams(params,cb);
		}

		
		service.ListTagsForStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"ExclusiveStartTagKey",params); 
			copyArg(msg,"Limit",params); 
			

			svc.listTagsForStream(params,cb);
		}

		
		service.MergeShards=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"ShardToMerge",params); 
			copyArg(n,"AdjacentShardToMerge",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"ShardToMerge",params); 
			copyArg(msg,"AdjacentShardToMerge",params); 
			

			svc.mergeShards(params,cb);
		}

		
		service.PutRecord=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"Data",params); 
			copyArg(n,"PartitionKey",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"Data",params); 
			copyArg(msg,"PartitionKey",params); 
			copyArg(msg,"ExplicitHashKey",params); 
			copyArg(msg,"SequenceNumberForOrdering",params); 
			

			svc.putRecord(params,cb);
		}

		
		service.PutRecords=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Records",params); 
			copyArg(n,"StreamName",params); 
			
			copyArg(msg,"Records",params); 
			copyArg(msg,"StreamName",params); 
			

			svc.putRecords(params,cb);
		}

		
		service.RemoveTagsFromStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"TagKeys",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"TagKeys",params); 
			

			svc.removeTagsFromStream(params,cb);
		}

		
		service.SplitShard=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"ShardToSplit",params); 
			copyArg(n,"NewStartingHashKey",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"ShardToSplit",params); 
			copyArg(msg,"NewStartingHashKey",params); 
			

			svc.splitShard(params,cb);
		}

		
		service.StartStreamEncryption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"EncryptionType",params); 
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"EncryptionType",params); 
			copyArg(msg,"KeyId",params); 
			

			svc.startStreamEncryption(params,cb);
		}

		
		service.StopStreamEncryption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"EncryptionType",params); 
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"EncryptionType",params); 
			copyArg(msg,"KeyId",params); 
			

			svc.stopStreamEncryption(params,cb);
		}

		
		service.UpdateShardCount=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"StreamName",params); 
			copyArg(n,"TargetShardCount",params); 
			copyArg(n,"ScalingType",params); 
			
			copyArg(msg,"StreamName",params); 
			copyArg(msg,"TargetShardCount",params); 
			copyArg(msg,"ScalingType",params); 
			

			svc.updateShardCount(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Kinesis", AmazonAPINode);

};
