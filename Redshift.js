
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

		var awsService = new AWS.Redshift( { 'region': node.region } );

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

		
		service.AcceptReservedNodeExchange=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedNodeId",params,undefined,false); 
			copyArg(n,"TargetReservedNodeOfferingId",params,undefined,false); 
			
			copyArg(msg,"ReservedNodeId",params,undefined,false); 
			copyArg(msg,"TargetReservedNodeOfferingId",params,undefined,false); 
			

			svc.acceptReservedNodeExchange(params,cb);
		}

		
		service.AuthorizeClusterSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterSecurityGroupName",params,undefined,false); 
			
			copyArg(msg,"ClusterSecurityGroupName",params,undefined,false); 
			copyArg(msg,"CIDRIP",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupName",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupOwnerId",params,undefined,false); 
			

			svc.authorizeClusterSecurityGroupIngress(params,cb);
		}

		
		service.AuthorizeSnapshotAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotIdentifier",params,undefined,false); 
			copyArg(n,"AccountWithRestoreAccess",params,undefined,false); 
			
			copyArg(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"SnapshotClusterIdentifier",params,undefined,false); 
			copyArg(msg,"AccountWithRestoreAccess",params,undefined,false); 
			

			svc.authorizeSnapshotAccess(params,cb);
		}

		
		service.BatchDeleteClusterSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Identifiers",params,undefined,false); 
			
			copyArg(msg,"Identifiers",params,undefined,false); 
			

			svc.batchDeleteClusterSnapshots(params,cb);
		}

		
		service.BatchModifyClusterSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotIdentifierList",params,undefined,true); 
			
			copyArg(msg,"SnapshotIdentifierList",params,undefined,true); 
			copyArg(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArg(msg,"Force",params,undefined,false); 
			

			svc.batchModifyClusterSnapshots(params,cb);
		}

		
		service.CancelResize=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.cancelResize(params,cb);
		}

		
		service.CopyClusterSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceSnapshotIdentifier",params,undefined,false); 
			copyArg(n,"TargetSnapshotIdentifier",params,undefined,false); 
			
			copyArg(msg,"SourceSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"SourceSnapshotClusterIdentifier",params,undefined,false); 
			copyArg(msg,"TargetSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			

			svc.copyClusterSnapshot(params,cb);
		}

		
		service.CreateCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			copyArg(n,"NodeType",params,undefined,false); 
			copyArg(n,"MasterUsername",params,undefined,false); 
			copyArg(n,"MasterUserPassword",params,undefined,false); 
			
			copyArg(msg,"DBName",params,undefined,false); 
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"ClusterType",params,undefined,false); 
			copyArg(msg,"NodeType",params,undefined,false); 
			copyArg(msg,"MasterUsername",params,undefined,false); 
			copyArg(msg,"MasterUserPassword",params,undefined,false); 
			copyArg(msg,"ClusterSecurityGroups",params,undefined,true); 
			copyArg(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"ClusterSubnetGroupName",params,undefined,false); 
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"ClusterParameterGroupName",params,undefined,false); 
			copyArg(msg,"AutomatedSnapshotRetentionPeriod",params,undefined,false); 
			copyArg(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"ClusterVersion",params,undefined,false); 
			copyArg(msg,"AllowVersionUpgrade",params,undefined,false); 
			copyArg(msg,"NumberOfNodes",params,undefined,false); 
			copyArg(msg,"PubliclyAccessible",params,undefined,false); 
			copyArg(msg,"Encrypted",params,undefined,false); 
			copyArg(msg,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArg(msg,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArg(msg,"ElasticIp",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"EnhancedVpcRouting",params,undefined,false); 
			copyArg(msg,"AdditionalInfo",params,undefined,false); 
			copyArg(msg,"IamRoles",params,undefined,true); 
			copyArg(msg,"MaintenanceTrackName",params,undefined,false); 
			copyArg(msg,"SnapshotScheduleIdentifier",params,undefined,false); 
			copyArg(msg,"AvailabilityZoneRelocation",params,undefined,false); 
			

			svc.createCluster(params,cb);
		}

		
		service.CreateClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParameterGroupName",params,undefined,false); 
			copyArg(n,"ParameterGroupFamily",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"ParameterGroupName",params,undefined,false); 
			copyArg(msg,"ParameterGroupFamily",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createClusterParameterGroup(params,cb);
		}

		
		service.CreateClusterSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterSecurityGroupName",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"ClusterSecurityGroupName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createClusterSecurityGroup(params,cb);
		}

		
		service.CreateClusterSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotIdentifier",params,undefined,false); 
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createClusterSnapshot(params,cb);
		}

		
		service.CreateClusterSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterSubnetGroupName",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			copyArg(n,"SubnetIds",params,undefined,true); 
			
			copyArg(msg,"ClusterSubnetGroupName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createClusterSubnetGroup(params,cb);
		}

		
		service.CreateEventSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionName",params,undefined,false); 
			copyArg(n,"SnsTopicArn",params,undefined,false); 
			
			copyArg(msg,"SubscriptionName",params,undefined,false); 
			copyArg(msg,"SnsTopicArn",params,undefined,false); 
			copyArg(msg,"SourceType",params,undefined,false); 
			copyArg(msg,"SourceIds",params,undefined,true); 
			copyArg(msg,"EventCategories",params,undefined,true); 
			copyArg(msg,"Severity",params,undefined,false); 
			copyArg(msg,"Enabled",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createEventSubscription(params,cb);
		}

		
		service.CreateHsmClientCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HsmClientCertificateIdentifier",params,undefined,false); 
			
			copyArg(msg,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createHsmClientCertificate(params,cb);
		}

		
		service.CreateHsmConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			copyArg(n,"HsmIpAddress",params,undefined,false); 
			copyArg(n,"HsmPartitionName",params,undefined,false); 
			copyArg(n,"HsmPartitionPassword",params,undefined,false); 
			copyArg(n,"HsmServerPublicCertificate",params,undefined,false); 
			
			copyArg(msg,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"HsmIpAddress",params,undefined,false); 
			copyArg(msg,"HsmPartitionName",params,undefined,false); 
			copyArg(msg,"HsmPartitionPassword",params,undefined,false); 
			copyArg(msg,"HsmServerPublicCertificate",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createHsmConfiguration(params,cb);
		}

		
		service.CreateScheduledAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ScheduledActionName",params,undefined,false); 
			copyArg(n,"TargetAction",params,undefined,true); 
			copyArg(n,"Schedule",params,undefined,false); 
			copyArg(n,"IamRole",params,undefined,false); 
			
			copyArg(msg,"ScheduledActionName",params,undefined,false); 
			copyArg(msg,"TargetAction",params,undefined,true); 
			copyArg(msg,"Schedule",params,undefined,false); 
			copyArg(msg,"IamRole",params,undefined,false); 
			copyArg(msg,"ScheduledActionDescription",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Enable",params,undefined,false); 
			

			svc.createScheduledAction(params,cb);
		}

		
		service.CreateSnapshotCopyGrant=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotCopyGrantName",params,undefined,false); 
			
			copyArg(msg,"SnapshotCopyGrantName",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createSnapshotCopyGrant(params,cb);
		}

		
		service.CreateSnapshotSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ScheduleDefinitions",params,undefined,true); 
			copyArg(msg,"ScheduleIdentifier",params,undefined,false); 
			copyArg(msg,"ScheduleDescription",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			copyArg(msg,"DryRun",params,undefined,false); 
			copyArg(msg,"NextInvocations",params,undefined,false); 
			

			svc.createSnapshotSchedule(params,cb);
		}

		
		service.CreateTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"ResourceName",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createTags(params,cb);
		}

		
		service.CreateUsageLimit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			copyArg(n,"FeatureType",params,undefined,false); 
			copyArg(n,"LimitType",params,undefined,false); 
			copyArg(n,"Amount",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"FeatureType",params,undefined,false); 
			copyArg(msg,"LimitType",params,undefined,false); 
			copyArg(msg,"Amount",params,undefined,false); 
			copyArg(msg,"Period",params,undefined,false); 
			copyArg(msg,"BreachAction",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createUsageLimit(params,cb);
		}

		
		service.DeleteCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"SkipFinalClusterSnapshot",params,undefined,false); 
			copyArg(msg,"FinalClusterSnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"FinalClusterSnapshotRetentionPeriod",params,undefined,false); 
			

			svc.deleteCluster(params,cb);
		}

		
		service.DeleteClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"ParameterGroupName",params,undefined,false); 
			

			svc.deleteClusterParameterGroup(params,cb);
		}

		
		service.DeleteClusterSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterSecurityGroupName",params,undefined,false); 
			
			copyArg(msg,"ClusterSecurityGroupName",params,undefined,false); 
			

			svc.deleteClusterSecurityGroup(params,cb);
		}

		
		service.DeleteClusterSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			
			copyArg(msg,"SnapshotIdentifier",params,undefined,true); 
			copyArg(msg,"SnapshotClusterIdentifier",params,undefined,true); 

			svc.deleteClusterSnapshot(params,cb);
		}

		
		service.DeleteClusterSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterSubnetGroupName",params,undefined,false); 
			
			copyArg(msg,"ClusterSubnetGroupName",params,undefined,false); 
			

			svc.deleteClusterSubnetGroup(params,cb);
		}

		
		service.DeleteEventSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionName",params,undefined,false); 
			
			copyArg(msg,"SubscriptionName",params,undefined,false); 
			

			svc.deleteEventSubscription(params,cb);
		}

		
		service.DeleteHsmClientCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HsmClientCertificateIdentifier",params,undefined,false); 
			
			copyArg(msg,"HsmClientCertificateIdentifier",params,undefined,false); 
			

			svc.deleteHsmClientCertificate(params,cb);
		}

		
		service.DeleteHsmConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HsmConfigurationIdentifier",params,undefined,false); 
			
			copyArg(msg,"HsmConfigurationIdentifier",params,undefined,false); 
			

			svc.deleteHsmConfiguration(params,cb);
		}

		
		service.DeleteScheduledAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ScheduledActionName",params,undefined,false); 
			
			copyArg(msg,"ScheduledActionName",params,undefined,false); 
			

			svc.deleteScheduledAction(params,cb);
		}

		
		service.DeleteSnapshotCopyGrant=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotCopyGrantName",params,undefined,false); 
			
			copyArg(msg,"SnapshotCopyGrantName",params,undefined,false); 
			

			svc.deleteSnapshotCopyGrant(params,cb);
		}

		
		service.DeleteSnapshotSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ScheduleIdentifier",params,undefined,false); 
			
			copyArg(msg,"ScheduleIdentifier",params,undefined,false); 
			

			svc.deleteSnapshotSchedule(params,cb);
		}

		
		service.DeleteTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"ResourceName",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.deleteTags(params,cb);
		}

		
		service.DeleteUsageLimit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UsageLimitId",params,undefined,false); 
			
			copyArg(msg,"UsageLimitId",params,undefined,false); 
			

			svc.deleteUsageLimit(params,cb);
		}

		
		service.DescribeAccountAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AttributeNames",params,undefined,false); 
			

			svc.describeAccountAttributes(params,cb);
		}

		
		service.DescribeClusterDbRevisions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeClusterDbRevisions(params,cb);
		}

		
		service.DescribeClusterParameterGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ParameterGroupName",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			copyArg(msg,"TagValues",params,undefined,true); 
			

			svc.describeClusterParameterGroups(params,cb);
		}

		
		service.DescribeClusterParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"ParameterGroupName",params,undefined,false); 
			copyArg(msg,"Source",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeClusterParameters(params,cb);
		}

		
		service.DescribeClusterSecurityGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClusterSecurityGroupName",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			copyArg(msg,"TagValues",params,undefined,true); 
			

			svc.describeClusterSecurityGroups(params,cb);
		}

		
		service.DescribeClusterSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"SnapshotType",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"OwnerAccount",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			copyArg(msg,"TagValues",params,undefined,true); 
			copyArg(msg,"ClusterExists",params,undefined,false); 
			copyArg(msg,"SortingEntities",params,undefined,false); 
			

			svc.describeClusterSnapshots(params,cb);
		}

		
		service.DescribeClusterSubnetGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClusterSubnetGroupName",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			copyArg(msg,"TagValues",params,undefined,true); 
			

			svc.describeClusterSubnetGroups(params,cb);
		}

		
		service.DescribeClusterTracks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaintenanceTrackName",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeClusterTracks(params,cb);
		}

		
		service.DescribeClusterVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClusterVersion",params,undefined,false); 
			copyArg(msg,"ClusterParameterGroupFamily",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeClusterVersions(params,cb);
		}

		
		service.DescribeClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			copyArg(msg,"TagValues",params,undefined,true); 
			

			svc.describeClusters(params,cb);
		}

		
		service.DescribeDefaultClusterParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParameterGroupFamily",params,undefined,false); 
			
			copyArg(msg,"ParameterGroupFamily",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeDefaultClusterParameters(params,cb);
		}

		
		service.DescribeEventCategories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SourceType",params,undefined,false); 
			

			svc.describeEventCategories(params,cb);
		}

		
		service.DescribeEventSubscriptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SubscriptionName",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			copyArg(msg,"TagValues",params,undefined,true); 
			

			svc.describeEventSubscriptions(params,cb);
		}

		
		service.DescribeEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SourceIdentifier",params,undefined,false); 
			copyArg(msg,"SourceType",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Duration",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeEvents(params,cb);
		}

		
		service.DescribeHsmClientCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			copyArg(msg,"TagValues",params,undefined,true); 
			

			svc.describeHsmClientCertificates(params,cb);
		}

		
		service.DescribeHsmConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			copyArg(msg,"TagValues",params,undefined,true); 
			

			svc.describeHsmConfigurations(params,cb);
		}

		
		service.DescribeLoggingStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.describeLoggingStatus(params,cb);
		}

		
		service.DescribeNodeConfigurationOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ActionType",params,undefined,false); 
			
			copyArg(msg,"ActionType",params,undefined,false); 
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"OwnerAccount",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeNodeConfigurationOptions(params,cb);
		}

		
		service.DescribeOrderableClusterOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClusterVersion",params,undefined,false); 
			copyArg(msg,"NodeType",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeOrderableClusterOptions(params,cb);
		}

		
		service.DescribeReservedNodeOfferings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ReservedNodeOfferingId",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeReservedNodeOfferings(params,cb);
		}

		
		service.DescribeReservedNodes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ReservedNodeId",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeReservedNodes(params,cb);
		}

		
		service.DescribeResize=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.describeResize(params,cb);
		}

		
		service.DescribeScheduledActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ScheduledActionName",params,undefined,false); 
			copyArg(msg,"TargetActionType",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Active",params,undefined,false); 
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeScheduledActions(params,cb);
		}

		
		service.DescribeSnapshotCopyGrants=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SnapshotCopyGrantName",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			copyArg(msg,"TagValues",params,undefined,true); 
			

			svc.describeSnapshotCopyGrants(params,cb);
		}

		
		service.DescribeSnapshotSchedules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"ScheduleIdentifier",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			copyArg(msg,"TagValues",params,undefined,true); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			

			svc.describeSnapshotSchedules(params,cb);
		}

		
		service.DescribeStorage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeStorage(params,cb);
		}

		
		service.DescribeTableRestoreStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"TableRestoreRequestId",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeTableRestoreStatus(params,cb);
		}

		
		service.DescribeTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ResourceName",params,undefined,false); 
			copyArg(msg,"ResourceType",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			copyArg(msg,"TagValues",params,undefined,true); 
			

			svc.describeTags(params,cb);
		}

		
		service.DescribeUsageLimits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"UsageLimitId",params,undefined,false); 
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"FeatureType",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			copyArg(msg,"TagValues",params,undefined,true); 
			

			svc.describeUsageLimits(params,cb);
		}

		
		service.DisableLogging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.disableLogging(params,cb);
		}

		
		service.DisableSnapshotCopy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.disableSnapshotCopy(params,cb);
		}

		
		service.EnableLogging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			copyArg(n,"BucketName",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"BucketName",params,undefined,false); 
			copyArg(msg,"S3KeyPrefix",params,undefined,false); 
			

			svc.enableLogging(params,cb);
		}

		
		service.EnableSnapshotCopy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			copyArg(n,"DestinationRegion",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"DestinationRegion",params,undefined,false); 
			copyArg(msg,"RetentionPeriod",params,undefined,false); 
			copyArg(msg,"SnapshotCopyGrantName",params,undefined,false); 
			copyArg(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			

			svc.enableSnapshotCopy(params,cb);
		}

		
		service.GetClusterCredentials=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DbUser",params,undefined,false); 
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"DbUser",params,undefined,false); 
			copyArg(msg,"DbName",params,undefined,false); 
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"DurationSeconds",params,undefined,false); 
			copyArg(msg,"AutoCreate",params,undefined,false); 
			copyArg(msg,"DbGroups",params,undefined,false); 
			

			svc.getClusterCredentials(params,cb);
		}

		
		service.GetReservedNodeExchangeOfferings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedNodeId",params,undefined,false); 
			
			copyArg(msg,"ReservedNodeId",params,undefined,false); 
			copyArg(msg,"MaxRecords",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.getReservedNodeExchangeOfferings(params,cb);
		}

		
		service.ModifyCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"ClusterType",params,undefined,false); 
			copyArg(msg,"NodeType",params,undefined,false); 
			copyArg(msg,"NumberOfNodes",params,undefined,false); 
			copyArg(msg,"ClusterSecurityGroups",params,undefined,true); 
			copyArg(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"MasterUserPassword",params,undefined,false); 
			copyArg(msg,"ClusterParameterGroupName",params,undefined,false); 
			copyArg(msg,"AutomatedSnapshotRetentionPeriod",params,undefined,false); 
			copyArg(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"ClusterVersion",params,undefined,false); 
			copyArg(msg,"AllowVersionUpgrade",params,undefined,false); 
			copyArg(msg,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArg(msg,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArg(msg,"NewClusterIdentifier",params,undefined,false); 
			copyArg(msg,"PubliclyAccessible",params,undefined,false); 
			copyArg(msg,"ElasticIp",params,undefined,false); 
			copyArg(msg,"EnhancedVpcRouting",params,undefined,false); 
			copyArg(msg,"MaintenanceTrackName",params,undefined,false); 
			copyArg(msg,"Encrypted",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"AvailabilityZoneRelocation",params,undefined,false); 
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			

			svc.modifyCluster(params,cb);
		}

		
		service.ModifyClusterDbRevision=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			copyArg(n,"RevisionTarget",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"RevisionTarget",params,undefined,false); 
			

			svc.modifyClusterDbRevision(params,cb);
		}

		
		service.ModifyClusterIamRoles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"AddIamRoles",params,undefined,true); 
			copyArg(msg,"RemoveIamRoles",params,undefined,true); 
			

			svc.modifyClusterIamRoles(params,cb);
		}

		
		service.ModifyClusterMaintenance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"DeferMaintenance",params,undefined,false); 
			copyArg(msg,"DeferMaintenanceIdentifier",params,undefined,false); 
			copyArg(msg,"DeferMaintenanceStartTime",params,undefined,false); 
			copyArg(msg,"DeferMaintenanceEndTime",params,undefined,false); 
			copyArg(msg,"DeferMaintenanceDuration",params,undefined,false); 
			

			svc.modifyClusterMaintenance(params,cb);
		}

		
		service.ModifyClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParameterGroupName",params,undefined,false); 
			copyArg(n,"Parameters",params,undefined,true); 
			
			copyArg(msg,"ParameterGroupName",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			

			svc.modifyClusterParameterGroup(params,cb);
		}

		
		service.ModifyClusterSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotIdentifier",params,undefined,false); 
			
			copyArg(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArg(msg,"Force",params,undefined,false); 
			

			svc.modifyClusterSnapshot(params,cb);
		}

		
		service.ModifyClusterSnapshotSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"ScheduleIdentifier",params,undefined,false); 
			copyArg(msg,"DisassociateSchedule",params,undefined,false); 
			

			svc.modifyClusterSnapshotSchedule(params,cb);
		}

		
		service.ModifyClusterSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterSubnetGroupName",params,undefined,false); 
			copyArg(n,"SubnetIds",params,undefined,true); 
			
			copyArg(msg,"ClusterSubnetGroupName",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"SubnetIds",params,undefined,true); 
			

			svc.modifyClusterSubnetGroup(params,cb);
		}

		
		service.ModifyEventSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionName",params,undefined,false); 
			
			copyArg(msg,"SubscriptionName",params,undefined,false); 
			copyArg(msg,"SnsTopicArn",params,undefined,false); 
			copyArg(msg,"SourceType",params,undefined,false); 
			copyArg(msg,"SourceIds",params,undefined,true); 
			copyArg(msg,"EventCategories",params,undefined,true); 
			copyArg(msg,"Severity",params,undefined,false); 
			copyArg(msg,"Enabled",params,undefined,false); 
			

			svc.modifyEventSubscription(params,cb);
		}

		
		service.ModifyScheduledAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ScheduledActionName",params,undefined,false); 
			
			copyArg(msg,"ScheduledActionName",params,undefined,false); 
			copyArg(msg,"TargetAction",params,undefined,true); 
			copyArg(msg,"Schedule",params,undefined,false); 
			copyArg(msg,"IamRole",params,undefined,false); 
			copyArg(msg,"ScheduledActionDescription",params,undefined,false); 
			copyArg(msg,"StartTime",params,undefined,false); 
			copyArg(msg,"EndTime",params,undefined,false); 
			copyArg(msg,"Enable",params,undefined,false); 
			

			svc.modifyScheduledAction(params,cb);
		}

		
		service.ModifySnapshotCopyRetentionPeriod=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			copyArg(n,"RetentionPeriod",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"RetentionPeriod",params,undefined,false); 
			copyArg(msg,"Manual",params,undefined,false); 
			

			svc.modifySnapshotCopyRetentionPeriod(params,cb);
		}

		
		service.ModifySnapshotSchedule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ScheduleIdentifier",params,undefined,false); 
			copyArg(n,"ScheduleDefinitions",params,undefined,true); 
			
			copyArg(msg,"ScheduleIdentifier",params,undefined,false); 
			copyArg(msg,"ScheduleDefinitions",params,undefined,true); 
			

			svc.modifySnapshotSchedule(params,cb);
		}

		
		service.ModifyUsageLimit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"UsageLimitId",params,undefined,false); 
			
			copyArg(msg,"UsageLimitId",params,undefined,false); 
			copyArg(msg,"Amount",params,undefined,false); 
			copyArg(msg,"BreachAction",params,undefined,false); 
			

			svc.modifyUsageLimit(params,cb);
		}

		
		service.PauseCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			
			copyArg(msg,"ClusterIdentifier",params,undefined,true); 

			svc.pauseCluster(params,cb);
		}

		
		service.PurchaseReservedNodeOffering=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedNodeOfferingId",params,undefined,false); 
			
			copyArg(msg,"ReservedNodeOfferingId",params,undefined,false); 
			copyArg(msg,"NodeCount",params,undefined,false); 
			

			svc.purchaseReservedNodeOffering(params,cb);
		}

		
		service.RebootCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.rebootCluster(params,cb);
		}

		
		service.ResetClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ParameterGroupName",params,undefined,false); 
			
			copyArg(msg,"ParameterGroupName",params,undefined,false); 
			copyArg(msg,"ResetAllParameters",params,undefined,false); 
			copyArg(msg,"Parameters",params,undefined,true); 
			

			svc.resetClusterParameterGroup(params,cb);
		}

		
		service.ResizeCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			
			copyArg(msg,"ClusterIdentifier",params,undefined,true); 
			copyArg(msg,"ClusterType",params,undefined,true); 
			copyArg(msg,"NodeType",params,undefined,true); 
			copyArg(msg,"NumberOfNodes",params,undefined,true); 
			copyArg(msg,"Classic",params,undefined,true); 

			svc.resizeCluster(params,cb);
		}

		
		service.RestoreFromClusterSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			copyArg(n,"SnapshotIdentifier",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"SnapshotClusterIdentifier",params,undefined,false); 
			copyArg(msg,"Port",params,undefined,false); 
			copyArg(msg,"AvailabilityZone",params,undefined,false); 
			copyArg(msg,"AllowVersionUpgrade",params,undefined,false); 
			copyArg(msg,"ClusterSubnetGroupName",params,undefined,false); 
			copyArg(msg,"PubliclyAccessible",params,undefined,false); 
			copyArg(msg,"OwnerAccount",params,undefined,false); 
			copyArg(msg,"HsmClientCertificateIdentifier",params,undefined,false); 
			copyArg(msg,"HsmConfigurationIdentifier",params,undefined,false); 
			copyArg(msg,"ElasticIp",params,undefined,false); 
			copyArg(msg,"ClusterParameterGroupName",params,undefined,false); 
			copyArg(msg,"ClusterSecurityGroups",params,undefined,true); 
			copyArg(msg,"VpcSecurityGroupIds",params,undefined,true); 
			copyArg(msg,"PreferredMaintenanceWindow",params,undefined,false); 
			copyArg(msg,"AutomatedSnapshotRetentionPeriod",params,undefined,false); 
			copyArg(msg,"ManualSnapshotRetentionPeriod",params,undefined,false); 
			copyArg(msg,"KmsKeyId",params,undefined,false); 
			copyArg(msg,"NodeType",params,undefined,false); 
			copyArg(msg,"EnhancedVpcRouting",params,undefined,false); 
			copyArg(msg,"AdditionalInfo",params,undefined,false); 
			copyArg(msg,"IamRoles",params,undefined,true); 
			copyArg(msg,"MaintenanceTrackName",params,undefined,false); 
			copyArg(msg,"SnapshotScheduleIdentifier",params,undefined,false); 
			copyArg(msg,"NumberOfNodes",params,undefined,false); 
			copyArg(msg,"AvailabilityZoneRelocation",params,undefined,false); 
			

			svc.restoreFromClusterSnapshot(params,cb);
		}

		
		service.RestoreTableFromClusterSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			copyArg(n,"SnapshotIdentifier",params,undefined,false); 
			copyArg(n,"SourceDatabaseName",params,undefined,false); 
			copyArg(n,"SourceTableName",params,undefined,false); 
			copyArg(n,"NewTableName",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			copyArg(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"SourceDatabaseName",params,undefined,false); 
			copyArg(msg,"SourceSchemaName",params,undefined,false); 
			copyArg(msg,"SourceTableName",params,undefined,false); 
			copyArg(msg,"TargetDatabaseName",params,undefined,false); 
			copyArg(msg,"TargetSchemaName",params,undefined,false); 
			copyArg(msg,"NewTableName",params,undefined,false); 
			

			svc.restoreTableFromClusterSnapshot(params,cb);
		}

		
		service.ResumeCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			
			copyArg(msg,"ClusterIdentifier",params,undefined,true); 

			svc.resumeCluster(params,cb);
		}

		
		service.RevokeClusterSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterSecurityGroupName",params,undefined,false); 
			
			copyArg(msg,"ClusterSecurityGroupName",params,undefined,false); 
			copyArg(msg,"CIDRIP",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupName",params,undefined,false); 
			copyArg(msg,"EC2SecurityGroupOwnerId",params,undefined,false); 
			

			svc.revokeClusterSecurityGroupIngress(params,cb);
		}

		
		service.RevokeSnapshotAccess=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotIdentifier",params,undefined,false); 
			copyArg(n,"AccountWithRestoreAccess",params,undefined,false); 
			
			copyArg(msg,"SnapshotIdentifier",params,undefined,false); 
			copyArg(msg,"SnapshotClusterIdentifier",params,undefined,false); 
			copyArg(msg,"AccountWithRestoreAccess",params,undefined,false); 
			

			svc.revokeSnapshotAccess(params,cb);
		}

		
		service.RotateEncryptionKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClusterIdentifier",params,undefined,false); 
			
			copyArg(msg,"ClusterIdentifier",params,undefined,false); 
			

			svc.rotateEncryptionKey(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Redshift", AmazonAPINode);

};
