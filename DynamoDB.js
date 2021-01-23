
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

		var awsService = new AWS.DynamoDB( { 'region': node.region } );

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

		
		service.BatchExecuteStatement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Statements",params,undefined,false); 
			
			copyArg(msg,"Statements",params,undefined,false); 
			

			svc.batchExecuteStatement(params,cb);
		}

		
		service.BatchGetItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RequestItems",params,undefined,true); 
			
			copyArg(msg,"RequestItems",params,undefined,true); 
			copyArg(msg,"ReturnConsumedCapacity",params,undefined,false); 
			

			svc.batchGetItem(params,cb);
		}

		
		service.BatchWriteItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RequestItems",params,undefined,true); 
			
			copyArg(msg,"RequestItems",params,undefined,true); 
			copyArg(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArg(msg,"ReturnItemCollectionMetrics",params,undefined,false); 
			

			svc.batchWriteItem(params,cb);
		}

		
		service.CreateBackup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"BackupName",params,undefined,false); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"BackupName",params,undefined,false); 
			

			svc.createBackup(params,cb);
		}

		
		service.CreateGlobalTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalTableName",params,undefined,false); 
			copyArg(n,"ReplicationGroup",params,undefined,true); 
			
			copyArg(msg,"GlobalTableName",params,undefined,false); 
			copyArg(msg,"ReplicationGroup",params,undefined,true); 
			

			svc.createGlobalTable(params,cb);
		}

		
		service.CreateTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AttributeDefinitions",params,undefined,true); 
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"KeySchema",params,undefined,true); 
			
			copyArg(msg,"AttributeDefinitions",params,undefined,true); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"KeySchema",params,undefined,true); 
			copyArg(msg,"LocalSecondaryIndexes",params,undefined,true); 
			copyArg(msg,"GlobalSecondaryIndexes",params,undefined,true); 
			copyArg(msg,"BillingMode",params,undefined,false); 
			copyArg(msg,"ProvisionedThroughput",params,undefined,true); 
			copyArg(msg,"StreamSpecification",params,undefined,true); 
			copyArg(msg,"SSESpecification",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTable(params,cb);
		}

		
		service.DeleteBackup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupArn",params,undefined,false); 
			
			copyArg(msg,"BackupArn",params,undefined,false); 
			

			svc.deleteBackup(params,cb);
		}

		
		service.DeleteItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"Key",params,undefined,true); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,true); 
			copyArg(msg,"Expected",params,undefined,true); 
			copyArg(msg,"ConditionalOperator",params,undefined,false); 
			copyArg(msg,"ReturnValues",params,undefined,false); 
			copyArg(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArg(msg,"ReturnItemCollectionMetrics",params,undefined,false); 
			copyArg(msg,"ConditionExpression",params,undefined,false); 
			copyArg(msg,"ExpressionAttributeNames",params,undefined,true); 
			copyArg(msg,"ExpressionAttributeValues",params,undefined,true); 
			

			svc.deleteItem(params,cb);
		}

		
		service.DeleteTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			

			svc.deleteTable(params,cb);
		}

		
		service.DescribeBackup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BackupArn",params,undefined,false); 
			
			copyArg(msg,"BackupArn",params,undefined,false); 
			

			svc.describeBackup(params,cb);
		}

		
		service.DescribeContinuousBackups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			

			svc.describeContinuousBackups(params,cb);
		}

		
		service.DescribeContributorInsights=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"IndexName",params,undefined,false); 
			

			svc.describeContributorInsights(params,cb);
		}

		
		service.DescribeEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeEndpoints(params,cb);
		}

		
		service.DescribeExport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ExportArn",params,undefined,false); 
			
			copyArg(msg,"ExportArn",params,undefined,false); 
			

			svc.describeExport(params,cb);
		}

		
		service.DescribeGlobalTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalTableName",params,undefined,false); 
			
			copyArg(msg,"GlobalTableName",params,undefined,false); 
			

			svc.describeGlobalTable(params,cb);
		}

		
		service.DescribeGlobalTableSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalTableName",params,undefined,false); 
			
			copyArg(msg,"GlobalTableName",params,undefined,false); 
			

			svc.describeGlobalTableSettings(params,cb);
		}

		
		service.DescribeKinesisStreamingDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			

			svc.describeKinesisStreamingDestination(params,cb);
		}

		
		service.DescribeLimits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeLimits(params,cb);
		}

		
		service.DescribeTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			

			svc.describeTable(params,cb);
		}

		
		service.DescribeTableReplicaAutoScaling=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			

			svc.describeTableReplicaAutoScaling(params,cb);
		}

		
		service.DescribeTimeToLive=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			

			svc.describeTimeToLive(params,cb);
		}

		
		service.DisableKinesisStreamingDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			
			copyArg(msg,"TableName",params,undefined,true); 
			copyArg(msg,"StreamArn",params,undefined,true); 

			svc.disableKinesisStreamingDestination(params,cb);
		}

		
		service.EnableKinesisStreamingDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			
			copyArg(msg,"TableName",params,undefined,true); 
			copyArg(msg,"StreamArn",params,undefined,true); 

			svc.enableKinesisStreamingDestination(params,cb);
		}

		
		service.ExecuteStatement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Statement",params,undefined,false); 
			
			copyArg(msg,"Statement",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			copyArg(msg,"ConsistentRead",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.executeStatement(params,cb);
		}

		
		service.ExecuteTransaction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransactStatements",params,undefined,false); 
			
			copyArg(msg,"TransactStatements",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.executeTransaction(params,cb);
		}

		
		service.ExportTableToPointInTime=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableArn",params,undefined,false); 
			copyArg(n,"S3Bucket",params,undefined,false); 
			
			copyArg(msg,"TableArn",params,undefined,false); 
			copyArg(msg,"ExportTime",params,undefined,false); 
			copyArg(msg,"ClientToken",params,undefined,false); 
			copyArg(msg,"S3Bucket",params,undefined,false); 
			copyArg(msg,"S3BucketOwner",params,undefined,false); 
			copyArg(msg,"S3Prefix",params,undefined,false); 
			copyArg(msg,"S3SseAlgorithm",params,undefined,false); 
			copyArg(msg,"S3SseKmsKeyId",params,undefined,false); 
			copyArg(msg,"ExportFormat",params,undefined,false); 
			

			svc.exportTableToPointInTime(params,cb);
		}

		
		service.GetItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"Key",params,undefined,true); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,true); 
			copyArg(msg,"AttributesToGet",params,undefined,true); 
			copyArg(msg,"ConsistentRead",params,undefined,false); 
			copyArg(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArg(msg,"ProjectionExpression",params,undefined,false); 
			copyArg(msg,"ExpressionAttributeNames",params,undefined,true); 
			

			svc.getItem(params,cb);
		}

		
		service.ListBackups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"TimeRangeLowerBound",params,undefined,false); 
			copyArg(msg,"TimeRangeUpperBound",params,undefined,false); 
			copyArg(msg,"ExclusiveStartBackupArn",params,undefined,false); 
			copyArg(msg,"BackupType",params,undefined,false); 
			

			svc.listBackups(params,cb);
		}

		
		service.ListContributorInsights=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			

			svc.listContributorInsights(params,cb);
		}

		
		service.ListExports=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TableArn",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listExports(params,cb);
		}

		
		service.ListGlobalTables=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ExclusiveStartGlobalTableName",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"RegionName",params,undefined,false); 
			

			svc.listGlobalTables(params,cb);
		}

		
		service.ListTables=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ExclusiveStartTableName",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			

			svc.listTables(params,cb);
		}

		
		service.ListTagsOfResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceArn",params,undefined,false); 
			
			copyArg(msg,"ResourceArn",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listTagsOfResource(params,cb);
		}

		
		service.PutItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"Item",params,undefined,true); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"Item",params,undefined,true); 
			copyArg(msg,"Expected",params,undefined,true); 
			copyArg(msg,"ReturnValues",params,undefined,false); 
			copyArg(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArg(msg,"ReturnItemCollectionMetrics",params,undefined,false); 
			copyArg(msg,"ConditionalOperator",params,undefined,false); 
			copyArg(msg,"ConditionExpression",params,undefined,false); 
			copyArg(msg,"ExpressionAttributeNames",params,undefined,true); 
			copyArg(msg,"ExpressionAttributeValues",params,undefined,true); 
			

			svc.putItem(params,cb);
		}

		
		service.Query=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"IndexName",params,undefined,false); 
			copyArg(msg,"Select",params,undefined,false); 
			copyArg(msg,"AttributesToGet",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"ConsistentRead",params,undefined,false); 
			copyArg(msg,"KeyConditions",params,undefined,false); 
			copyArg(msg,"QueryFilter",params,undefined,true); 
			copyArg(msg,"ConditionalOperator",params,undefined,false); 
			copyArg(msg,"ScanIndexForward",params,undefined,false); 
			copyArg(msg,"ExclusiveStartKey",params,undefined,true); 
			copyArg(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArg(msg,"ProjectionExpression",params,undefined,false); 
			copyArg(msg,"FilterExpression",params,undefined,false); 
			copyArg(msg,"KeyConditionExpression",params,undefined,false); 
			copyArg(msg,"ExpressionAttributeNames",params,undefined,true); 
			copyArg(msg,"ExpressionAttributeValues",params,undefined,true); 
			

			svc.query(params,cb);
		}

		
		service.RestoreTableFromBackup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TargetTableName",params,undefined,false); 
			copyArg(n,"BackupArn",params,undefined,false); 
			
			copyArg(msg,"TargetTableName",params,undefined,false); 
			copyArg(msg,"BackupArn",params,undefined,false); 
			copyArg(msg,"BillingModeOverride",params,undefined,false); 
			copyArg(msg,"GlobalSecondaryIndexOverride",params,undefined,true); 
			copyArg(msg,"LocalSecondaryIndexOverride",params,undefined,true); 
			copyArg(msg,"ProvisionedThroughputOverride",params,undefined,true); 
			copyArg(msg,"SSESpecificationOverride",params,undefined,true); 
			

			svc.restoreTableFromBackup(params,cb);
		}

		
		service.RestoreTableToPointInTime=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TargetTableName",params,undefined,false); 
			
			copyArg(msg,"SourceTableArn",params,undefined,false); 
			copyArg(msg,"SourceTableName",params,undefined,false); 
			copyArg(msg,"TargetTableName",params,undefined,false); 
			copyArg(msg,"UseLatestRestorableTime",params,undefined,false); 
			copyArg(msg,"RestoreDateTime",params,undefined,false); 
			copyArg(msg,"BillingModeOverride",params,undefined,false); 
			copyArg(msg,"GlobalSecondaryIndexOverride",params,undefined,true); 
			copyArg(msg,"LocalSecondaryIndexOverride",params,undefined,true); 
			copyArg(msg,"ProvisionedThroughputOverride",params,undefined,true); 
			copyArg(msg,"SSESpecificationOverride",params,undefined,true); 
			

			svc.restoreTableToPointInTime(params,cb);
		}

		
		service.Scan=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"IndexName",params,undefined,false); 
			copyArg(msg,"AttributesToGet",params,undefined,true); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Select",params,undefined,false); 
			copyArg(msg,"ScanFilter",params,undefined,true); 
			copyArg(msg,"ConditionalOperator",params,undefined,false); 
			copyArg(msg,"ExclusiveStartKey",params,undefined,true); 
			copyArg(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArg(msg,"TotalSegments",params,undefined,false); 
			copyArg(msg,"Segment",params,undefined,false); 
			copyArg(msg,"ProjectionExpression",params,undefined,false); 
			copyArg(msg,"FilterExpression",params,undefined,false); 
			copyArg(msg,"ExpressionAttributeNames",params,undefined,true); 
			copyArg(msg,"ExpressionAttributeValues",params,undefined,true); 
			copyArg(msg,"ConsistentRead",params,undefined,false); 
			

			svc.scan(params,cb);
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

		
		service.TransactGetItems=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransactItems",params,undefined,false); 
			
			copyArg(msg,"TransactItems",params,undefined,false); 
			copyArg(msg,"ReturnConsumedCapacity",params,undefined,false); 
			

			svc.transactGetItems(params,cb);
		}

		
		service.TransactWriteItems=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TransactItems",params,undefined,false); 
			
			copyArg(msg,"TransactItems",params,undefined,false); 
			copyArg(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArg(msg,"ReturnItemCollectionMetrics",params,undefined,false); 
			copyArg(msg,"ClientRequestToken",params,undefined,false); 
			

			svc.transactWriteItems(params,cb);
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

		
		service.UpdateContinuousBackups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"PointInTimeRecoverySpecification",params,undefined,false); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"PointInTimeRecoverySpecification",params,undefined,false); 
			

			svc.updateContinuousBackups(params,cb);
		}

		
		service.UpdateContributorInsights=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"ContributorInsightsAction",params,undefined,false); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"IndexName",params,undefined,false); 
			copyArg(msg,"ContributorInsightsAction",params,undefined,false); 
			

			svc.updateContributorInsights(params,cb);
		}

		
		service.UpdateGlobalTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalTableName",params,undefined,false); 
			copyArg(n,"ReplicaUpdates",params,undefined,false); 
			
			copyArg(msg,"GlobalTableName",params,undefined,false); 
			copyArg(msg,"ReplicaUpdates",params,undefined,false); 
			

			svc.updateGlobalTable(params,cb);
		}

		
		service.UpdateGlobalTableSettings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GlobalTableName",params,undefined,false); 
			
			copyArg(msg,"GlobalTableName",params,undefined,false); 
			copyArg(msg,"GlobalTableBillingMode",params,undefined,false); 
			copyArg(msg,"GlobalTableProvisionedWriteCapacityUnits",params,undefined,false); 
			copyArg(msg,"GlobalTableProvisionedWriteCapacityAutoScalingSettingsUpdate",params,undefined,true); 
			copyArg(msg,"GlobalTableGlobalSecondaryIndexSettingsUpdate",params,undefined,false); 
			copyArg(msg,"ReplicaSettingsUpdate",params,undefined,false); 
			

			svc.updateGlobalTableSettings(params,cb);
		}

		
		service.UpdateItem=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"Key",params,undefined,true); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,true); 
			copyArg(msg,"AttributeUpdates",params,undefined,false); 
			copyArg(msg,"Expected",params,undefined,true); 
			copyArg(msg,"ConditionalOperator",params,undefined,false); 
			copyArg(msg,"ReturnValues",params,undefined,false); 
			copyArg(msg,"ReturnConsumedCapacity",params,undefined,false); 
			copyArg(msg,"ReturnItemCollectionMetrics",params,undefined,false); 
			copyArg(msg,"UpdateExpression",params,undefined,false); 
			copyArg(msg,"ConditionExpression",params,undefined,false); 
			copyArg(msg,"ExpressionAttributeNames",params,undefined,true); 
			copyArg(msg,"ExpressionAttributeValues",params,undefined,true); 
			

			svc.updateItem(params,cb);
		}

		
		service.UpdateTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"AttributeDefinitions",params,undefined,true); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"BillingMode",params,undefined,false); 
			copyArg(msg,"ProvisionedThroughput",params,undefined,true); 
			copyArg(msg,"GlobalSecondaryIndexUpdates",params,undefined,false); 
			copyArg(msg,"StreamSpecification",params,undefined,true); 
			copyArg(msg,"SSESpecification",params,undefined,true); 
			copyArg(msg,"ReplicaUpdates",params,undefined,false); 
			

			svc.updateTable(params,cb);
		}

		
		service.UpdateTableReplicaAutoScaling=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			
			copyArg(msg,"GlobalSecondaryIndexUpdates",params,undefined,false); 
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"ProvisionedWriteCapacityAutoScalingUpdate",params,undefined,true); 
			copyArg(msg,"ReplicaUpdates",params,undefined,false); 
			

			svc.updateTableReplicaAutoScaling(params,cb);
		}

		
		service.UpdateTimeToLive=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TableName",params,undefined,false); 
			copyArg(n,"TimeToLiveSpecification",params,undefined,true); 
			
			copyArg(msg,"TableName",params,undefined,false); 
			copyArg(msg,"TimeToLiveSpecification",params,undefined,true); 
			

			svc.updateTimeToLive(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS DynamoDB", AmazonAPINode);

};
