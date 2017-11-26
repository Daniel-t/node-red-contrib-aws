
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

		var awsService = new AWS.Dynamodb( { 'region': node.region } );

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

		
		service.BatchGetItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RequestItems",params); 
			
			copyArg(msg,"RequestItems",params); 
			copyArg(msg,"ReturnConsumedCapacity",params); 
			

			svc.batchGetItem(params,cb);
		}

		
		service.BatchWriteItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RequestItems",params); 
			
			copyArg(msg,"RequestItems",params); 
			copyArg(msg,"ReturnConsumedCapacity",params); 
			copyArg(msg,"ReturnItemCollectionMetrics",params); 
			

			svc.batchWriteItem(params,cb);
		}

		
		service.CreateTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AttributeDefinitions",params); 
			copyArg(n,"TableName",params); 
			copyArg(n,"KeySchema",params); 
			copyArg(n,"ProvisionedThroughput",params); 
			
			copyArg(msg,"AttributeDefinitions",params); 
			copyArg(msg,"TableName",params); 
			copyArg(msg,"KeySchema",params); 
			copyArg(msg,"LocalSecondaryIndexes",params); 
			copyArg(msg,"GlobalSecondaryIndexes",params); 
			copyArg(msg,"ProvisionedThroughput",params); 
			copyArg(msg,"StreamSpecification",params); 
			

			svc.createTable(params,cb);
		}

		
		service.DeleteItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"TableName",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"Expected",params); 
			copyArg(msg,"ConditionalOperator",params); 
			copyArg(msg,"ReturnValues",params); 
			copyArg(msg,"ReturnConsumedCapacity",params); 
			copyArg(msg,"ReturnItemCollectionMetrics",params); 
			copyArg(msg,"ConditionExpression",params); 
			copyArg(msg,"ExpressionAttributeNames",params); 
			copyArg(msg,"ExpressionAttributeValues",params); 
			

			svc.deleteItem(params,cb);
		}

		
		service.DeleteTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params); 
			
			copyArg(msg,"TableName",params); 
			

			svc.deleteTable(params,cb);
		}

		
		service.DescribeLimits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeLimits(params,cb);
		}

		
		service.DescribeTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params); 
			
			copyArg(msg,"TableName",params); 
			

			svc.describeTable(params,cb);
		}

		
		service.DescribeTimeToLive=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params); 
			
			copyArg(msg,"TableName",params); 
			

			svc.describeTimeToLive(params,cb);
		}

		
		service.GetItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"TableName",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"AttributesToGet",params); 
			copyArg(msg,"ConsistentRead",params); 
			copyArg(msg,"ReturnConsumedCapacity",params); 
			copyArg(msg,"ProjectionExpression",params); 
			copyArg(msg,"ExpressionAttributeNames",params); 
			

			svc.getItem(params,cb);
		}

		
		service.ListTables=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ExclusiveStartTableName",params); 
			copyArg(msg,"Limit",params); 
			

			svc.listTables(params,cb);
		}

		
		service.ListTagsOfResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params); 
			
			copyArg(msg,"ResourceArn",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.listTagsOfResource(params,cb);
		}

		
		service.PutItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params); 
			copyArg(n,"Item",params); 
			
			copyArg(msg,"TableName",params); 
			copyArg(msg,"Item",params); 
			copyArg(msg,"Expected",params); 
			copyArg(msg,"ReturnValues",params); 
			copyArg(msg,"ReturnConsumedCapacity",params); 
			copyArg(msg,"ReturnItemCollectionMetrics",params); 
			copyArg(msg,"ConditionalOperator",params); 
			copyArg(msg,"ConditionExpression",params); 
			copyArg(msg,"ExpressionAttributeNames",params); 
			copyArg(msg,"ExpressionAttributeValues",params); 
			

			svc.putItem(params,cb);
		}

		
		service.Query=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params); 
			
			copyArg(msg,"TableName",params); 
			copyArg(msg,"IndexName",params); 
			copyArg(msg,"Select",params); 
			copyArg(msg,"AttributesToGet",params); 
			copyArg(msg,"Limit",params); 
			copyArg(msg,"ConsistentRead",params); 
			copyArg(msg,"KeyConditions",params); 
			copyArg(msg,"QueryFilter",params); 
			copyArg(msg,"ConditionalOperator",params); 
			copyArg(msg,"ScanIndexForward",params); 
			copyArg(msg,"ExclusiveStartKey",params); 
			copyArg(msg,"ReturnConsumedCapacity",params); 
			copyArg(msg,"ProjectionExpression",params); 
			copyArg(msg,"FilterExpression",params); 
			copyArg(msg,"KeyConditionExpression",params); 
			copyArg(msg,"ExpressionAttributeNames",params); 
			copyArg(msg,"ExpressionAttributeValues",params); 
			

			svc.query(params,cb);
		}

		
		service.Scan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params); 
			
			copyArg(msg,"TableName",params); 
			copyArg(msg,"IndexName",params); 
			copyArg(msg,"AttributesToGet",params); 
			copyArg(msg,"Limit",params); 
			copyArg(msg,"Select",params); 
			copyArg(msg,"ScanFilter",params); 
			copyArg(msg,"ConditionalOperator",params); 
			copyArg(msg,"ExclusiveStartKey",params); 
			copyArg(msg,"ReturnConsumedCapacity",params); 
			copyArg(msg,"TotalSegments",params); 
			copyArg(msg,"Segment",params); 
			copyArg(msg,"ProjectionExpression",params); 
			copyArg(msg,"FilterExpression",params); 
			copyArg(msg,"ExpressionAttributeNames",params); 
			copyArg(msg,"ExpressionAttributeValues",params); 
			copyArg(msg,"ConsistentRead",params); 
			

			svc.scan(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params); 
			copyArg(n,"Tags",params); 
			
			copyArg(msg,"ResourceArn",params); 
			copyArg(msg,"Tags",params); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params); 
			copyArg(n,"TagKeys",params); 
			
			copyArg(msg,"ResourceArn",params); 
			copyArg(msg,"TagKeys",params); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"TableName",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"AttributeUpdates",params); 
			copyArg(msg,"Expected",params); 
			copyArg(msg,"ConditionalOperator",params); 
			copyArg(msg,"ReturnValues",params); 
			copyArg(msg,"ReturnConsumedCapacity",params); 
			copyArg(msg,"ReturnItemCollectionMetrics",params); 
			copyArg(msg,"UpdateExpression",params); 
			copyArg(msg,"ConditionExpression",params); 
			copyArg(msg,"ExpressionAttributeNames",params); 
			copyArg(msg,"ExpressionAttributeValues",params); 
			

			svc.updateItem(params,cb);
		}

		
		service.UpdateTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params); 
			
			copyArg(msg,"AttributeDefinitions",params); 
			copyArg(msg,"TableName",params); 
			copyArg(msg,"ProvisionedThroughput",params); 
			copyArg(msg,"GlobalSecondaryIndexUpdates",params); 
			copyArg(msg,"StreamSpecification",params); 
			

			svc.updateTable(params,cb);
		}

		
		service.UpdateTimeToLive=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params); 
			copyArg(n,"TimeToLiveSpecification",params); 
			
			copyArg(msg,"TableName",params); 
			copyArg(msg,"TimeToLiveSpecification",params); 
			

			svc.updateTimeToLive(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Dynamodb", AmazonAPINode);

};
