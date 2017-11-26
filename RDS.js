
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

		var awsService = new AWS.RDS( { 'region': node.region } );

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

		
		service.AddRoleToDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params); 
			copyArg(n,"RoleArn",params); 
			
			copyArg(msg,"DBClusterIdentifier",params); 
			copyArg(msg,"RoleArn",params); 
			

			svc.addRoleToDBCluster(params,cb);
		}

		
		service.AddSourceIdentifierToSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionName",params); 
			copyArg(n,"SourceIdentifier",params); 
			
			copyArg(msg,"SubscriptionName",params); 
			copyArg(msg,"SourceIdentifier",params); 
			

			svc.addSourceIdentifierToSubscription(params,cb);
		}

		
		service.AddTagsToResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params); 
			copyArg(n,"Tags",params); 
			
			copyArg(msg,"ResourceName",params); 
			copyArg(msg,"Tags",params); 
			

			svc.addTagsToResource(params,cb);
		}

		
		service.ApplyPendingMaintenanceAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceIdentifier",params); 
			copyArg(n,"ApplyAction",params); 
			copyArg(n,"OptInType",params); 
			
			copyArg(msg,"ResourceIdentifier",params); 
			copyArg(msg,"ApplyAction",params); 
			copyArg(msg,"OptInType",params); 
			

			svc.applyPendingMaintenanceAction(params,cb);
		}

		
		service.AuthorizeDBSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSecurityGroupName",params); 
			
			copyArg(msg,"DBSecurityGroupName",params); 
			copyArg(msg,"CIDRIP",params); 
			copyArg(msg,"EC2SecurityGroupName",params); 
			copyArg(msg,"EC2SecurityGroupId",params); 
			copyArg(msg,"EC2SecurityGroupOwnerId",params); 
			

			svc.authorizeDBSecurityGroupIngress(params,cb);
		}

		
		service.CopyDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceDBClusterParameterGroupIdentifier",params); 
			copyArg(n,"TargetDBClusterParameterGroupIdentifier",params); 
			copyArg(n,"TargetDBClusterParameterGroupDescription",params); 
			
			copyArg(msg,"SourceDBClusterParameterGroupIdentifier",params); 
			copyArg(msg,"TargetDBClusterParameterGroupIdentifier",params); 
			copyArg(msg,"TargetDBClusterParameterGroupDescription",params); 
			copyArg(msg,"Tags",params); 
			

			svc.copyDBClusterParameterGroup(params,cb);
		}

		
		service.CopyDBClusterSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceDBClusterSnapshotIdentifier",params); 
			copyArg(n,"TargetDBClusterSnapshotIdentifier",params); 
			
			copyArg(msg,"SourceDBClusterSnapshotIdentifier",params); 
			copyArg(msg,"TargetDBClusterSnapshotIdentifier",params); 
			copyArg(msg,"KmsKeyId",params); 
			copyArg(msg,"PreSignedUrl",params); 
			copyArg(msg,"CopyTags",params); 
			copyArg(msg,"Tags",params); 
			copyArg(msg,"SourceRegion",params); 
			

			svc.copyDBClusterSnapshot(params,cb);
		}

		
		service.CopyDBParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceDBParameterGroupIdentifier",params); 
			copyArg(n,"TargetDBParameterGroupIdentifier",params); 
			copyArg(n,"TargetDBParameterGroupDescription",params); 
			
			copyArg(msg,"SourceDBParameterGroupIdentifier",params); 
			copyArg(msg,"TargetDBParameterGroupIdentifier",params); 
			copyArg(msg,"TargetDBParameterGroupDescription",params); 
			copyArg(msg,"Tags",params); 
			

			svc.copyDBParameterGroup(params,cb);
		}

		
		service.CopyDBSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceDBSnapshotIdentifier",params); 
			copyArg(n,"TargetDBSnapshotIdentifier",params); 
			
			copyArg(msg,"SourceDBSnapshotIdentifier",params); 
			copyArg(msg,"TargetDBSnapshotIdentifier",params); 
			copyArg(msg,"KmsKeyId",params); 
			copyArg(msg,"Tags",params); 
			copyArg(msg,"CopyTags",params); 
			copyArg(msg,"PreSignedUrl",params); 
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"SourceRegion",params); 
			

			svc.copyDBSnapshot(params,cb);
		}

		
		service.CopyOptionGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceOptionGroupIdentifier",params); 
			copyArg(n,"TargetOptionGroupIdentifier",params); 
			copyArg(n,"TargetOptionGroupDescription",params); 
			
			copyArg(msg,"SourceOptionGroupIdentifier",params); 
			copyArg(msg,"TargetOptionGroupIdentifier",params); 
			copyArg(msg,"TargetOptionGroupDescription",params); 
			copyArg(msg,"Tags",params); 
			

			svc.copyOptionGroup(params,cb);
		}

		
		service.CreateDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params); 
			copyArg(n,"Engine",params); 
			
			copyArg(msg,"AvailabilityZones",params); 
			copyArg(msg,"BackupRetentionPeriod",params); 
			copyArg(msg,"CharacterSetName",params); 
			copyArg(msg,"DatabaseName",params); 
			copyArg(msg,"DBClusterIdentifier",params); 
			copyArg(msg,"DBClusterParameterGroupName",params); 
			copyArg(msg,"VpcSecurityGroupIds",params); 
			copyArg(msg,"DBSubnetGroupName",params); 
			copyArg(msg,"Engine",params); 
			copyArg(msg,"EngineVersion",params); 
			copyArg(msg,"Port",params); 
			copyArg(msg,"MasterUsername",params); 
			copyArg(msg,"MasterUserPassword",params); 
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"PreferredBackupWindow",params); 
			copyArg(msg,"PreferredMaintenanceWindow",params); 
			copyArg(msg,"ReplicationSourceIdentifier",params); 
			copyArg(msg,"Tags",params); 
			copyArg(msg,"StorageEncrypted",params); 
			copyArg(msg,"KmsKeyId",params); 
			copyArg(msg,"PreSignedUrl",params); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params); 
			copyArg(msg,"SourceRegion",params); 
			

			svc.createDBCluster(params,cb);
		}

		
		service.CreateDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterParameterGroupName",params); 
			copyArg(n,"DBParameterGroupFamily",params); 
			copyArg(n,"Description",params); 
			
			copyArg(msg,"DBClusterParameterGroupName",params); 
			copyArg(msg,"DBParameterGroupFamily",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"Tags",params); 
			

			svc.createDBClusterParameterGroup(params,cb);
		}

		
		service.CreateDBClusterSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterSnapshotIdentifier",params); 
			copyArg(n,"DBClusterIdentifier",params); 
			
			copyArg(msg,"DBClusterSnapshotIdentifier",params); 
			copyArg(msg,"DBClusterIdentifier",params); 
			copyArg(msg,"Tags",params); 
			

			svc.createDBClusterSnapshot(params,cb);
		}

		
		service.CreateDBInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params); 
			copyArg(n,"DBInstanceClass",params); 
			copyArg(n,"Engine",params); 
			
			copyArg(msg,"DBName",params); 
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"AllocatedStorage",params); 
			copyArg(msg,"DBInstanceClass",params); 
			copyArg(msg,"Engine",params); 
			copyArg(msg,"MasterUsername",params); 
			copyArg(msg,"MasterUserPassword",params); 
			copyArg(msg,"DBSecurityGroups",params); 
			copyArg(msg,"VpcSecurityGroupIds",params); 
			copyArg(msg,"AvailabilityZone",params); 
			copyArg(msg,"DBSubnetGroupName",params); 
			copyArg(msg,"PreferredMaintenanceWindow",params); 
			copyArg(msg,"DBParameterGroupName",params); 
			copyArg(msg,"BackupRetentionPeriod",params); 
			copyArg(msg,"PreferredBackupWindow",params); 
			copyArg(msg,"Port",params); 
			copyArg(msg,"MultiAZ",params); 
			copyArg(msg,"EngineVersion",params); 
			copyArg(msg,"AutoMinorVersionUpgrade",params); 
			copyArg(msg,"LicenseModel",params); 
			copyArg(msg,"Iops",params); 
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"CharacterSetName",params); 
			copyArg(msg,"PubliclyAccessible",params); 
			copyArg(msg,"Tags",params); 
			copyArg(msg,"DBClusterIdentifier",params); 
			copyArg(msg,"StorageType",params); 
			copyArg(msg,"TdeCredentialArn",params); 
			copyArg(msg,"TdeCredentialPassword",params); 
			copyArg(msg,"StorageEncrypted",params); 
			copyArg(msg,"KmsKeyId",params); 
			copyArg(msg,"Domain",params); 
			copyArg(msg,"CopyTagsToSnapshot",params); 
			copyArg(msg,"MonitoringInterval",params); 
			copyArg(msg,"MonitoringRoleArn",params); 
			copyArg(msg,"DomainIAMRoleName",params); 
			copyArg(msg,"PromotionTier",params); 
			copyArg(msg,"Timezone",params); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params); 
			copyArg(msg,"EnablePerformanceInsights",params); 
			copyArg(msg,"PerformanceInsightsKMSKeyId",params); 
			

			svc.createDBInstance(params,cb);
		}

		
		service.CreateDBInstanceReadReplica=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params); 
			copyArg(n,"SourceDBInstanceIdentifier",params); 
			
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"SourceDBInstanceIdentifier",params); 
			copyArg(msg,"DBInstanceClass",params); 
			copyArg(msg,"AvailabilityZone",params); 
			copyArg(msg,"Port",params); 
			copyArg(msg,"AutoMinorVersionUpgrade",params); 
			copyArg(msg,"Iops",params); 
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"PubliclyAccessible",params); 
			copyArg(msg,"Tags",params); 
			copyArg(msg,"DBSubnetGroupName",params); 
			copyArg(msg,"StorageType",params); 
			copyArg(msg,"CopyTagsToSnapshot",params); 
			copyArg(msg,"MonitoringInterval",params); 
			copyArg(msg,"MonitoringRoleArn",params); 
			copyArg(msg,"KmsKeyId",params); 
			copyArg(msg,"PreSignedUrl",params); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params); 
			copyArg(msg,"EnablePerformanceInsights",params); 
			copyArg(msg,"PerformanceInsightsKMSKeyId",params); 
			copyArg(msg,"SourceRegion",params); 
			

			svc.createDBInstanceReadReplica(params,cb);
		}

		
		service.CreateDBParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupName",params); 
			copyArg(n,"DBParameterGroupFamily",params); 
			copyArg(n,"Description",params); 
			
			copyArg(msg,"DBParameterGroupName",params); 
			copyArg(msg,"DBParameterGroupFamily",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"Tags",params); 
			

			svc.createDBParameterGroup(params,cb);
		}

		
		service.CreateDBSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSecurityGroupName",params); 
			copyArg(n,"DBSecurityGroupDescription",params); 
			
			copyArg(msg,"DBSecurityGroupName",params); 
			copyArg(msg,"DBSecurityGroupDescription",params); 
			copyArg(msg,"Tags",params); 
			

			svc.createDBSecurityGroup(params,cb);
		}

		
		service.CreateDBSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSnapshotIdentifier",params); 
			copyArg(n,"DBInstanceIdentifier",params); 
			
			copyArg(msg,"DBSnapshotIdentifier",params); 
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"Tags",params); 
			

			svc.createDBSnapshot(params,cb);
		}

		
		service.CreateDBSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSubnetGroupName",params); 
			copyArg(n,"DBSubnetGroupDescription",params); 
			copyArg(n,"SubnetIds",params); 
			
			copyArg(msg,"DBSubnetGroupName",params); 
			copyArg(msg,"DBSubnetGroupDescription",params); 
			copyArg(msg,"SubnetIds",params); 
			copyArg(msg,"Tags",params); 
			

			svc.createDBSubnetGroup(params,cb);
		}

		
		service.CreateEventSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionName",params); 
			copyArg(n,"SnsTopicArn",params); 
			
			copyArg(msg,"SubscriptionName",params); 
			copyArg(msg,"SnsTopicArn",params); 
			copyArg(msg,"SourceType",params); 
			copyArg(msg,"EventCategories",params); 
			copyArg(msg,"SourceIds",params); 
			copyArg(msg,"Enabled",params); 
			copyArg(msg,"Tags",params); 
			

			svc.createEventSubscription(params,cb);
		}

		
		service.CreateOptionGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OptionGroupName",params); 
			copyArg(n,"EngineName",params); 
			copyArg(n,"MajorEngineVersion",params); 
			copyArg(n,"OptionGroupDescription",params); 
			
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"EngineName",params); 
			copyArg(msg,"MajorEngineVersion",params); 
			copyArg(msg,"OptionGroupDescription",params); 
			copyArg(msg,"Tags",params); 
			

			svc.createOptionGroup(params,cb);
		}

		
		service.DeleteDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params); 
			
			copyArg(msg,"DBClusterIdentifier",params); 
			copyArg(msg,"SkipFinalSnapshot",params); 
			copyArg(msg,"FinalDBSnapshotIdentifier",params); 
			

			svc.deleteDBCluster(params,cb);
		}

		
		service.DeleteDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterParameterGroupName",params); 
			
			copyArg(msg,"DBClusterParameterGroupName",params); 
			

			svc.deleteDBClusterParameterGroup(params,cb);
		}

		
		service.DeleteDBClusterSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterSnapshotIdentifier",params); 
			
			copyArg(msg,"DBClusterSnapshotIdentifier",params); 
			

			svc.deleteDBClusterSnapshot(params,cb);
		}

		
		service.DeleteDBInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params); 
			
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"SkipFinalSnapshot",params); 
			copyArg(msg,"FinalDBSnapshotIdentifier",params); 
			

			svc.deleteDBInstance(params,cb);
		}

		
		service.DeleteDBParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupName",params); 
			
			copyArg(msg,"DBParameterGroupName",params); 
			

			svc.deleteDBParameterGroup(params,cb);
		}

		
		service.DeleteDBSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSecurityGroupName",params); 
			
			copyArg(msg,"DBSecurityGroupName",params); 
			

			svc.deleteDBSecurityGroup(params,cb);
		}

		
		service.DeleteDBSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSnapshotIdentifier",params); 
			
			copyArg(msg,"DBSnapshotIdentifier",params); 
			

			svc.deleteDBSnapshot(params,cb);
		}

		
		service.DeleteDBSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSubnetGroupName",params); 
			
			copyArg(msg,"DBSubnetGroupName",params); 
			

			svc.deleteDBSubnetGroup(params,cb);
		}

		
		service.DeleteEventSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionName",params); 
			
			copyArg(msg,"SubscriptionName",params); 
			

			svc.deleteEventSubscription(params,cb);
		}

		
		service.DeleteOptionGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OptionGroupName",params); 
			
			copyArg(msg,"OptionGroupName",params); 
			

			svc.deleteOptionGroup(params,cb);
		}

		
		service.DescribeAccountAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeAccountAttributes(params,cb);
		}

		
		service.DescribeCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CertificateIdentifier",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeCertificates(params,cb);
		}

		
		service.DescribeDBClusterParameterGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBClusterParameterGroupName",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeDBClusterParameterGroups(params,cb);
		}

		
		service.DescribeDBClusterParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterParameterGroupName",params); 
			
			copyArg(msg,"DBClusterParameterGroupName",params); 
			copyArg(msg,"Source",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeDBClusterParameters(params,cb);
		}

		
		service.DescribeDBClusterSnapshotAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterSnapshotIdentifier",params); 
			
			copyArg(msg,"DBClusterSnapshotIdentifier",params); 
			

			svc.describeDBClusterSnapshotAttributes(params,cb);
		}

		
		service.DescribeDBClusterSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBClusterIdentifier",params); 
			copyArg(msg,"DBClusterSnapshotIdentifier",params); 
			copyArg(msg,"SnapshotType",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"IncludeShared",params); 
			copyArg(msg,"IncludePublic",params); 
			

			svc.describeDBClusterSnapshots(params,cb);
		}

		
		service.DescribeDBClusters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBClusterIdentifier",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeDBClusters(params,cb);
		}

		
		service.DescribeDBEngineVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Engine",params); 
			copyArg(msg,"EngineVersion",params); 
			copyArg(msg,"DBParameterGroupFamily",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"DefaultOnly",params); 
			copyArg(msg,"ListSupportedCharacterSets",params); 
			copyArg(msg,"ListSupportedTimezones",params); 
			

			svc.describeDBEngineVersions(params,cb);
		}

		
		service.DescribeDBInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeDBInstances(params,cb);
		}

		
		service.DescribeDBLogFiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params); 
			
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"FilenameContains",params); 
			copyArg(msg,"FileLastWritten",params); 
			copyArg(msg,"FileSize",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeDBLogFiles(params,cb);
		}

		
		service.DescribeDBParameterGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBParameterGroupName",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeDBParameterGroups(params,cb);
		}

		
		service.DescribeDBParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupName",params); 
			
			copyArg(msg,"DBParameterGroupName",params); 
			copyArg(msg,"Source",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeDBParameters(params,cb);
		}

		
		service.DescribeDBSecurityGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBSecurityGroupName",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeDBSecurityGroups(params,cb);
		}

		
		service.DescribeDBSnapshotAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSnapshotIdentifier",params); 
			
			copyArg(msg,"DBSnapshotIdentifier",params); 
			

			svc.describeDBSnapshotAttributes(params,cb);
		}

		
		service.DescribeDBSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"DBSnapshotIdentifier",params); 
			copyArg(msg,"SnapshotType",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"IncludeShared",params); 
			copyArg(msg,"IncludePublic",params); 
			

			svc.describeDBSnapshots(params,cb);
		}

		
		service.DescribeDBSubnetGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBSubnetGroupName",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeDBSubnetGroups(params,cb);
		}

		
		service.DescribeEngineDefaultClusterParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupFamily",params); 
			
			copyArg(msg,"DBParameterGroupFamily",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeEngineDefaultClusterParameters(params,cb);
		}

		
		service.DescribeEngineDefaultParameters=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupFamily",params); 
			
			copyArg(msg,"DBParameterGroupFamily",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeEngineDefaultParameters(params,cb);
		}

		
		service.DescribeEventCategories=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SourceType",params); 
			copyArg(msg,"Filters",params); 
			

			svc.describeEventCategories(params,cb);
		}

		
		service.DescribeEventSubscriptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SubscriptionName",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeEventSubscriptions(params,cb);
		}

		
		service.DescribeEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"SourceIdentifier",params); 
			copyArg(msg,"SourceType",params); 
			copyArg(msg,"StartTime",params); 
			copyArg(msg,"EndTime",params); 
			copyArg(msg,"Duration",params); 
			copyArg(msg,"EventCategories",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeEvents(params,cb);
		}

		
		service.DescribeOptionGroupOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EngineName",params); 
			
			copyArg(msg,"EngineName",params); 
			copyArg(msg,"MajorEngineVersion",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeOptionGroupOptions(params,cb);
		}

		
		service.DescribeOptionGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"EngineName",params); 
			copyArg(msg,"MajorEngineVersion",params); 
			

			svc.describeOptionGroups(params,cb);
		}

		
		service.DescribeOrderableDBInstanceOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Engine",params); 
			
			copyArg(msg,"Engine",params); 
			copyArg(msg,"EngineVersion",params); 
			copyArg(msg,"DBInstanceClass",params); 
			copyArg(msg,"LicenseModel",params); 
			copyArg(msg,"Vpc",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeOrderableDBInstanceOptions(params,cb);
		}

		
		service.DescribePendingMaintenanceActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ResourceIdentifier",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"MaxRecords",params); 
			

			svc.describePendingMaintenanceActions(params,cb);
		}

		
		service.DescribeReservedDBInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ReservedDBInstanceId",params); 
			copyArg(msg,"ReservedDBInstancesOfferingId",params); 
			copyArg(msg,"DBInstanceClass",params); 
			copyArg(msg,"Duration",params); 
			copyArg(msg,"ProductDescription",params); 
			copyArg(msg,"OfferingType",params); 
			copyArg(msg,"MultiAZ",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeReservedDBInstances(params,cb);
		}

		
		service.DescribeReservedDBInstancesOfferings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ReservedDBInstancesOfferingId",params); 
			copyArg(msg,"DBInstanceClass",params); 
			copyArg(msg,"Duration",params); 
			copyArg(msg,"ProductDescription",params); 
			copyArg(msg,"OfferingType",params); 
			copyArg(msg,"MultiAZ",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			

			svc.describeReservedDBInstancesOfferings(params,cb);
		}

		
		service.DescribeSourceRegions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"RegionName",params); 
			copyArg(msg,"MaxRecords",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"Filters",params); 
			

			svc.describeSourceRegions(params,cb);
		}

		
		service.DescribeValidDBInstanceModifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params); 
			
			copyArg(msg,"DBInstanceIdentifier",params); 
			

			svc.describeValidDBInstanceModifications(params,cb);
		}

		
		service.DownloadDBLogFilePortion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params); 
			copyArg(n,"LogFileName",params); 
			
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"LogFileName",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"NumberOfLines",params); 
			

			svc.downloadDBLogFilePortion(params,cb);
		}

		
		service.FailoverDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DBClusterIdentifier",params); 
			copyArg(msg,"TargetDBInstanceIdentifier",params); 
			

			svc.failoverDBCluster(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params); 
			
			copyArg(msg,"ResourceName",params); 
			copyArg(msg,"Filters",params); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ModifyDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params); 
			
			copyArg(msg,"DBClusterIdentifier",params); 
			copyArg(msg,"NewDBClusterIdentifier",params); 
			copyArg(msg,"ApplyImmediately",params); 
			copyArg(msg,"BackupRetentionPeriod",params); 
			copyArg(msg,"DBClusterParameterGroupName",params); 
			copyArg(msg,"VpcSecurityGroupIds",params); 
			copyArg(msg,"Port",params); 
			copyArg(msg,"MasterUserPassword",params); 
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"PreferredBackupWindow",params); 
			copyArg(msg,"PreferredMaintenanceWindow",params); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params); 
			

			svc.modifyDBCluster(params,cb);
		}

		
		service.ModifyDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterParameterGroupName",params); 
			copyArg(n,"Parameters",params); 
			
			copyArg(msg,"DBClusterParameterGroupName",params); 
			copyArg(msg,"Parameters",params); 
			

			svc.modifyDBClusterParameterGroup(params,cb);
		}

		
		service.ModifyDBClusterSnapshotAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterSnapshotIdentifier",params); 
			copyArg(n,"AttributeName",params); 
			
			copyArg(msg,"DBClusterSnapshotIdentifier",params); 
			copyArg(msg,"AttributeName",params); 
			copyArg(msg,"ValuesToAdd",params); 
			copyArg(msg,"ValuesToRemove",params); 
			

			svc.modifyDBClusterSnapshotAttribute(params,cb);
		}

		
		service.ModifyDBInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params); 
			
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"AllocatedStorage",params); 
			copyArg(msg,"DBInstanceClass",params); 
			copyArg(msg,"DBSubnetGroupName",params); 
			copyArg(msg,"DBSecurityGroups",params); 
			copyArg(msg,"VpcSecurityGroupIds",params); 
			copyArg(msg,"ApplyImmediately",params); 
			copyArg(msg,"MasterUserPassword",params); 
			copyArg(msg,"DBParameterGroupName",params); 
			copyArg(msg,"BackupRetentionPeriod",params); 
			copyArg(msg,"PreferredBackupWindow",params); 
			copyArg(msg,"PreferredMaintenanceWindow",params); 
			copyArg(msg,"MultiAZ",params); 
			copyArg(msg,"EngineVersion",params); 
			copyArg(msg,"AllowMajorVersionUpgrade",params); 
			copyArg(msg,"AutoMinorVersionUpgrade",params); 
			copyArg(msg,"LicenseModel",params); 
			copyArg(msg,"Iops",params); 
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"NewDBInstanceIdentifier",params); 
			copyArg(msg,"StorageType",params); 
			copyArg(msg,"TdeCredentialArn",params); 
			copyArg(msg,"TdeCredentialPassword",params); 
			copyArg(msg,"CACertificateIdentifier",params); 
			copyArg(msg,"Domain",params); 
			copyArg(msg,"CopyTagsToSnapshot",params); 
			copyArg(msg,"MonitoringInterval",params); 
			copyArg(msg,"DBPortNumber",params); 
			copyArg(msg,"PubliclyAccessible",params); 
			copyArg(msg,"MonitoringRoleArn",params); 
			copyArg(msg,"DomainIAMRoleName",params); 
			copyArg(msg,"PromotionTier",params); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params); 
			copyArg(msg,"EnablePerformanceInsights",params); 
			copyArg(msg,"PerformanceInsightsKMSKeyId",params); 
			

			svc.modifyDBInstance(params,cb);
		}

		
		service.ModifyDBParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupName",params); 
			copyArg(n,"Parameters",params); 
			
			copyArg(msg,"DBParameterGroupName",params); 
			copyArg(msg,"Parameters",params); 
			

			svc.modifyDBParameterGroup(params,cb);
		}

		
		service.ModifyDBSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSnapshotIdentifier",params); 
			
			copyArg(msg,"DBSnapshotIdentifier",params); 
			copyArg(msg,"EngineVersion",params); 
			copyArg(msg,"OptionGroupName",params); 
			

			svc.modifyDBSnapshot(params,cb);
		}

		
		service.ModifyDBSnapshotAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSnapshotIdentifier",params); 
			copyArg(n,"AttributeName",params); 
			
			copyArg(msg,"DBSnapshotIdentifier",params); 
			copyArg(msg,"AttributeName",params); 
			copyArg(msg,"ValuesToAdd",params); 
			copyArg(msg,"ValuesToRemove",params); 
			

			svc.modifyDBSnapshotAttribute(params,cb);
		}

		
		service.ModifyDBSubnetGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSubnetGroupName",params); 
			copyArg(n,"SubnetIds",params); 
			
			copyArg(msg,"DBSubnetGroupName",params); 
			copyArg(msg,"DBSubnetGroupDescription",params); 
			copyArg(msg,"SubnetIds",params); 
			

			svc.modifyDBSubnetGroup(params,cb);
		}

		
		service.ModifyEventSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionName",params); 
			
			copyArg(msg,"SubscriptionName",params); 
			copyArg(msg,"SnsTopicArn",params); 
			copyArg(msg,"SourceType",params); 
			copyArg(msg,"EventCategories",params); 
			copyArg(msg,"Enabled",params); 
			

			svc.modifyEventSubscription(params,cb);
		}

		
		service.ModifyOptionGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OptionGroupName",params); 
			
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"OptionsToInclude",params); 
			copyArg(msg,"OptionsToRemove",params); 
			copyArg(msg,"ApplyImmediately",params); 
			

			svc.modifyOptionGroup(params,cb);
		}

		
		service.PromoteReadReplica=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params); 
			
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"BackupRetentionPeriod",params); 
			copyArg(msg,"PreferredBackupWindow",params); 
			

			svc.promoteReadReplica(params,cb);
		}

		
		service.PromoteReadReplicaDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params); 
			
			copyArg(msg,"DBClusterIdentifier",params); 
			

			svc.promoteReadReplicaDBCluster(params,cb);
		}

		
		service.PurchaseReservedDBInstancesOffering=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedDBInstancesOfferingId",params); 
			
			copyArg(msg,"ReservedDBInstancesOfferingId",params); 
			copyArg(msg,"ReservedDBInstanceId",params); 
			copyArg(msg,"DBInstanceCount",params); 
			copyArg(msg,"Tags",params); 
			

			svc.purchaseReservedDBInstancesOffering(params,cb);
		}

		
		service.RebootDBInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params); 
			
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"ForceFailover",params); 
			

			svc.rebootDBInstance(params,cb);
		}

		
		service.RemoveRoleFromDBCluster=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params); 
			copyArg(n,"RoleArn",params); 
			
			copyArg(msg,"DBClusterIdentifier",params); 
			copyArg(msg,"RoleArn",params); 
			

			svc.removeRoleFromDBCluster(params,cb);
		}

		
		service.RemoveSourceIdentifierFromSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubscriptionName",params); 
			copyArg(n,"SourceIdentifier",params); 
			
			copyArg(msg,"SubscriptionName",params); 
			copyArg(msg,"SourceIdentifier",params); 
			

			svc.removeSourceIdentifierFromSubscription(params,cb);
		}

		
		service.RemoveTagsFromResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceName",params); 
			copyArg(n,"TagKeys",params); 
			
			copyArg(msg,"ResourceName",params); 
			copyArg(msg,"TagKeys",params); 
			

			svc.removeTagsFromResource(params,cb);
		}

		
		service.ResetDBClusterParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterParameterGroupName",params); 
			
			copyArg(msg,"DBClusterParameterGroupName",params); 
			copyArg(msg,"ResetAllParameters",params); 
			copyArg(msg,"Parameters",params); 
			

			svc.resetDBClusterParameterGroup(params,cb);
		}

		
		service.ResetDBParameterGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBParameterGroupName",params); 
			
			copyArg(msg,"DBParameterGroupName",params); 
			copyArg(msg,"ResetAllParameters",params); 
			copyArg(msg,"Parameters",params); 
			

			svc.resetDBParameterGroup(params,cb);
		}

		
		service.RestoreDBClusterFromS3=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params); 
			copyArg(n,"Engine",params); 
			copyArg(n,"MasterUsername",params); 
			copyArg(n,"MasterUserPassword",params); 
			copyArg(n,"SourceEngine",params); 
			copyArg(n,"SourceEngineVersion",params); 
			copyArg(n,"S3BucketName",params); 
			copyArg(n,"S3IngestionRoleArn",params); 
			
			copyArg(msg,"AvailabilityZones",params); 
			copyArg(msg,"BackupRetentionPeriod",params); 
			copyArg(msg,"CharacterSetName",params); 
			copyArg(msg,"DatabaseName",params); 
			copyArg(msg,"DBClusterIdentifier",params); 
			copyArg(msg,"DBClusterParameterGroupName",params); 
			copyArg(msg,"VpcSecurityGroupIds",params); 
			copyArg(msg,"DBSubnetGroupName",params); 
			copyArg(msg,"Engine",params); 
			copyArg(msg,"EngineVersion",params); 
			copyArg(msg,"Port",params); 
			copyArg(msg,"MasterUsername",params); 
			copyArg(msg,"MasterUserPassword",params); 
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"PreferredBackupWindow",params); 
			copyArg(msg,"PreferredMaintenanceWindow",params); 
			copyArg(msg,"Tags",params); 
			copyArg(msg,"StorageEncrypted",params); 
			copyArg(msg,"KmsKeyId",params); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params); 
			copyArg(msg,"SourceEngine",params); 
			copyArg(msg,"SourceEngineVersion",params); 
			copyArg(msg,"S3BucketName",params); 
			copyArg(msg,"S3Prefix",params); 
			copyArg(msg,"S3IngestionRoleArn",params); 
			

			svc.restoreDBClusterFromS3(params,cb);
		}

		
		service.RestoreDBClusterFromSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params); 
			copyArg(n,"SnapshotIdentifier",params); 
			copyArg(n,"Engine",params); 
			
			copyArg(msg,"AvailabilityZones",params); 
			copyArg(msg,"DBClusterIdentifier",params); 
			copyArg(msg,"SnapshotIdentifier",params); 
			copyArg(msg,"Engine",params); 
			copyArg(msg,"EngineVersion",params); 
			copyArg(msg,"Port",params); 
			copyArg(msg,"DBSubnetGroupName",params); 
			copyArg(msg,"DatabaseName",params); 
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"VpcSecurityGroupIds",params); 
			copyArg(msg,"Tags",params); 
			copyArg(msg,"KmsKeyId",params); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params); 
			

			svc.restoreDBClusterFromSnapshot(params,cb);
		}

		
		service.RestoreDBClusterToPointInTime=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBClusterIdentifier",params); 
			copyArg(n,"SourceDBClusterIdentifier",params); 
			
			copyArg(msg,"DBClusterIdentifier",params); 
			copyArg(msg,"RestoreType",params); 
			copyArg(msg,"SourceDBClusterIdentifier",params); 
			copyArg(msg,"RestoreToTime",params); 
			copyArg(msg,"UseLatestRestorableTime",params); 
			copyArg(msg,"Port",params); 
			copyArg(msg,"DBSubnetGroupName",params); 
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"VpcSecurityGroupIds",params); 
			copyArg(msg,"Tags",params); 
			copyArg(msg,"KmsKeyId",params); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params); 
			

			svc.restoreDBClusterToPointInTime(params,cb);
		}

		
		service.RestoreDBInstanceFromDBSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params); 
			copyArg(n,"DBSnapshotIdentifier",params); 
			
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"DBSnapshotIdentifier",params); 
			copyArg(msg,"DBInstanceClass",params); 
			copyArg(msg,"Port",params); 
			copyArg(msg,"AvailabilityZone",params); 
			copyArg(msg,"DBSubnetGroupName",params); 
			copyArg(msg,"MultiAZ",params); 
			copyArg(msg,"PubliclyAccessible",params); 
			copyArg(msg,"AutoMinorVersionUpgrade",params); 
			copyArg(msg,"LicenseModel",params); 
			copyArg(msg,"DBName",params); 
			copyArg(msg,"Engine",params); 
			copyArg(msg,"Iops",params); 
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"Tags",params); 
			copyArg(msg,"StorageType",params); 
			copyArg(msg,"TdeCredentialArn",params); 
			copyArg(msg,"TdeCredentialPassword",params); 
			copyArg(msg,"Domain",params); 
			copyArg(msg,"CopyTagsToSnapshot",params); 
			copyArg(msg,"DomainIAMRoleName",params); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params); 
			

			svc.restoreDBInstanceFromDBSnapshot(params,cb);
		}

		
		service.RestoreDBInstanceFromS3=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params); 
			copyArg(n,"DBInstanceClass",params); 
			copyArg(n,"Engine",params); 
			copyArg(n,"SourceEngine",params); 
			copyArg(n,"SourceEngineVersion",params); 
			copyArg(n,"S3BucketName",params); 
			copyArg(n,"S3IngestionRoleArn",params); 
			
			copyArg(msg,"DBName",params); 
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"AllocatedStorage",params); 
			copyArg(msg,"DBInstanceClass",params); 
			copyArg(msg,"Engine",params); 
			copyArg(msg,"MasterUsername",params); 
			copyArg(msg,"MasterUserPassword",params); 
			copyArg(msg,"DBSecurityGroups",params); 
			copyArg(msg,"VpcSecurityGroupIds",params); 
			copyArg(msg,"AvailabilityZone",params); 
			copyArg(msg,"DBSubnetGroupName",params); 
			copyArg(msg,"PreferredMaintenanceWindow",params); 
			copyArg(msg,"DBParameterGroupName",params); 
			copyArg(msg,"BackupRetentionPeriod",params); 
			copyArg(msg,"PreferredBackupWindow",params); 
			copyArg(msg,"Port",params); 
			copyArg(msg,"MultiAZ",params); 
			copyArg(msg,"EngineVersion",params); 
			copyArg(msg,"AutoMinorVersionUpgrade",params); 
			copyArg(msg,"LicenseModel",params); 
			copyArg(msg,"Iops",params); 
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"PubliclyAccessible",params); 
			copyArg(msg,"Tags",params); 
			copyArg(msg,"StorageType",params); 
			copyArg(msg,"StorageEncrypted",params); 
			copyArg(msg,"KmsKeyId",params); 
			copyArg(msg,"CopyTagsToSnapshot",params); 
			copyArg(msg,"MonitoringInterval",params); 
			copyArg(msg,"MonitoringRoleArn",params); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params); 
			copyArg(msg,"SourceEngine",params); 
			copyArg(msg,"SourceEngineVersion",params); 
			copyArg(msg,"S3BucketName",params); 
			copyArg(msg,"S3Prefix",params); 
			copyArg(msg,"S3IngestionRoleArn",params); 
			copyArg(msg,"EnablePerformanceInsights",params); 
			copyArg(msg,"PerformanceInsightsKMSKeyId",params); 
			

			svc.restoreDBInstanceFromS3(params,cb);
		}

		
		service.RestoreDBInstanceToPointInTime=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceDBInstanceIdentifier",params); 
			copyArg(n,"TargetDBInstanceIdentifier",params); 
			
			copyArg(msg,"SourceDBInstanceIdentifier",params); 
			copyArg(msg,"TargetDBInstanceIdentifier",params); 
			copyArg(msg,"RestoreTime",params); 
			copyArg(msg,"UseLatestRestorableTime",params); 
			copyArg(msg,"DBInstanceClass",params); 
			copyArg(msg,"Port",params); 
			copyArg(msg,"AvailabilityZone",params); 
			copyArg(msg,"DBSubnetGroupName",params); 
			copyArg(msg,"MultiAZ",params); 
			copyArg(msg,"PubliclyAccessible",params); 
			copyArg(msg,"AutoMinorVersionUpgrade",params); 
			copyArg(msg,"LicenseModel",params); 
			copyArg(msg,"DBName",params); 
			copyArg(msg,"Engine",params); 
			copyArg(msg,"Iops",params); 
			copyArg(msg,"OptionGroupName",params); 
			copyArg(msg,"CopyTagsToSnapshot",params); 
			copyArg(msg,"Tags",params); 
			copyArg(msg,"StorageType",params); 
			copyArg(msg,"TdeCredentialArn",params); 
			copyArg(msg,"TdeCredentialPassword",params); 
			copyArg(msg,"Domain",params); 
			copyArg(msg,"DomainIAMRoleName",params); 
			copyArg(msg,"EnableIAMDatabaseAuthentication",params); 
			

			svc.restoreDBInstanceToPointInTime(params,cb);
		}

		
		service.RevokeDBSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBSecurityGroupName",params); 
			
			copyArg(msg,"DBSecurityGroupName",params); 
			copyArg(msg,"CIDRIP",params); 
			copyArg(msg,"EC2SecurityGroupName",params); 
			copyArg(msg,"EC2SecurityGroupId",params); 
			copyArg(msg,"EC2SecurityGroupOwnerId",params); 
			

			svc.revokeDBSecurityGroupIngress(params,cb);
		}

		
		service.StartDBInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params); 
			
			copyArg(msg,"DBInstanceIdentifier",params); 
			

			svc.startDBInstance(params,cb);
		}

		
		service.StopDBInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DBInstanceIdentifier",params); 
			
			copyArg(msg,"DBInstanceIdentifier",params); 
			copyArg(msg,"DBSnapshotIdentifier",params); 
			

			svc.stopDBInstance(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS RDS", AmazonAPINode);

};
