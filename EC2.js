
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

		var awsService = new AWS.EC2( { 'region': node.region } );

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

		
		service.AcceptReservedInstancesExchangeQuote=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedInstanceIds",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"ReservedInstanceIds",params); 
			copyArg(msg,"TargetConfigurations",params); 
			

			svc.acceptReservedInstancesExchangeQuote(params,cb);
		}

		
		service.AcceptVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcPeeringConnectionId",params); 
			

			svc.acceptVpcPeeringConnection(params,cb);
		}

		
		service.AllocateAddress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Domain",params); 
			copyArg(msg,"Address",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.allocateAddress(params,cb);
		}

		
		service.AllocateHosts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AvailabilityZone",params); 
			copyArg(n,"InstanceType",params); 
			copyArg(n,"Quantity",params); 
			
			copyArg(msg,"AutoPlacement",params); 
			copyArg(msg,"AvailabilityZone",params); 
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"InstanceType",params); 
			copyArg(msg,"Quantity",params); 
			

			svc.allocateHosts(params,cb);
		}

		
		service.AssignIpv6Addresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params); 
			
			copyArg(msg,"Ipv6AddressCount",params); 
			copyArg(msg,"Ipv6Addresses",params); 
			copyArg(msg,"NetworkInterfaceId",params); 
			

			svc.assignIpv6Addresses(params,cb);
		}

		
		service.AssignPrivateIpAddresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params); 
			
			copyArg(msg,"AllowReassignment",params); 
			copyArg(msg,"NetworkInterfaceId",params); 
			copyArg(msg,"PrivateIpAddresses",params); 
			copyArg(msg,"SecondaryPrivateIpAddressCount",params); 
			

			svc.assignPrivateIpAddresses(params,cb);
		}

		
		service.AssociateAddress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AllocationId",params); 
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"PublicIp",params); 
			copyArg(msg,"AllowReassociation",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"NetworkInterfaceId",params); 
			copyArg(msg,"PrivateIpAddress",params); 
			

			svc.associateAddress(params,cb);
		}

		
		service.AssociateDhcpOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DhcpOptionsId",params); 
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"DhcpOptionsId",params); 
			copyArg(msg,"VpcId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.associateDhcpOptions(params,cb);
		}

		
		service.AssociateIamInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IamInstanceProfile",params); 
			copyArg(n,"InstanceId",params); 
			
			copyArg(msg,"IamInstanceProfile",params); 
			copyArg(msg,"InstanceId",params); 
			

			svc.associateIamInstanceProfile(params,cb);
		}

		
		service.AssociateRouteTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteTableId",params); 
			copyArg(n,"SubnetId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"RouteTableId",params); 
			copyArg(msg,"SubnetId",params); 
			

			svc.associateRouteTable(params,cb);
		}

		
		service.AssociateSubnetCidrBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Ipv6CidrBlock",params); 
			copyArg(n,"SubnetId",params); 
			
			copyArg(msg,"Ipv6CidrBlock",params); 
			copyArg(msg,"SubnetId",params); 
			

			svc.associateSubnetCidrBlock(params,cb);
		}

		
		service.AssociateVpcCidrBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"AmazonProvidedIpv6CidrBlock",params); 
			copyArg(msg,"CidrBlock",params); 
			copyArg(msg,"VpcId",params); 
			

			svc.associateVpcCidrBlock(params,cb);
		}

		
		service.AttachClassicLinkVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Groups",params); 
			copyArg(n,"InstanceId",params); 
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Groups",params); 
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"VpcId",params); 
			

			svc.attachClassicLinkVpc(params,cb);
		}

		
		service.AttachInternetGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InternetGatewayId",params); 
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InternetGatewayId",params); 
			copyArg(msg,"VpcId",params); 
			

			svc.attachInternetGateway(params,cb);
		}

		
		service.AttachNetworkInterface=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeviceIndex",params); 
			copyArg(n,"InstanceId",params); 
			copyArg(n,"NetworkInterfaceId",params); 
			
			copyArg(msg,"DeviceIndex",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"NetworkInterfaceId",params); 
			

			svc.attachNetworkInterface(params,cb);
		}

		
		service.AttachVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Device",params); 
			copyArg(n,"InstanceId",params); 
			copyArg(n,"VolumeId",params); 
			
			copyArg(msg,"Device",params); 
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"VolumeId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.attachVolume(params,cb);
		}

		
		service.AttachVpnGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params); 
			copyArg(n,"VpnGatewayId",params); 
			
			copyArg(msg,"VpcId",params); 
			copyArg(msg,"VpnGatewayId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.attachVpnGateway(params,cb);
		}

		
		service.AuthorizeSecurityGroupEgress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"GroupId",params); 
			copyArg(msg,"IpPermissions",params); 
			copyArg(msg,"CidrIp",params); 
			copyArg(msg,"FromPort",params); 
			copyArg(msg,"IpProtocol",params); 
			copyArg(msg,"ToPort",params); 
			copyArg(msg,"SourceSecurityGroupName",params); 
			copyArg(msg,"SourceSecurityGroupOwnerId",params); 
			

			svc.authorizeSecurityGroupEgress(params,cb);
		}

		
		service.AuthorizeSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CidrIp",params); 
			copyArg(msg,"FromPort",params); 
			copyArg(msg,"GroupId",params); 
			copyArg(msg,"GroupName",params); 
			copyArg(msg,"IpPermissions",params); 
			copyArg(msg,"IpProtocol",params); 
			copyArg(msg,"SourceSecurityGroupName",params); 
			copyArg(msg,"SourceSecurityGroupOwnerId",params); 
			copyArg(msg,"ToPort",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.authorizeSecurityGroupIngress(params,cb);
		}

		
		service.BundleInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params); 
			copyArg(n,"Storage",params); 
			
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"Storage",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.bundleInstance(params,cb);
		}

		
		service.CancelBundleTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BundleId",params); 
			
			copyArg(msg,"BundleId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.cancelBundleTask(params,cb);
		}

		
		service.CancelConversionTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ConversionTaskId",params); 
			
			copyArg(msg,"ConversionTaskId",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"ReasonMessage",params); 
			

			svc.cancelConversionTask(params,cb);
		}

		
		service.CancelExportTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ExportTaskId",params); 
			
			copyArg(msg,"ExportTaskId",params); 
			

			svc.cancelExportTask(params,cb);
		}

		
		service.CancelImportTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CancelReason",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"ImportTaskId",params); 
			

			svc.cancelImportTask(params,cb);
		}

		
		service.CancelReservedInstancesListing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedInstancesListingId",params); 
			
			copyArg(msg,"ReservedInstancesListingId",params); 
			

			svc.cancelReservedInstancesListing(params,cb);
		}

		
		service.CancelSpotFleetRequests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SpotFleetRequestIds",params); 
			copyArg(n,"TerminateInstances",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"SpotFleetRequestIds",params); 
			copyArg(msg,"TerminateInstances",params); 
			

			svc.cancelSpotFleetRequests(params,cb);
		}

		
		service.CancelSpotInstanceRequests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SpotInstanceRequestIds",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"SpotInstanceRequestIds",params); 
			

			svc.cancelSpotInstanceRequests(params,cb);
		}

		
		service.ConfirmProductInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params); 
			copyArg(n,"ProductCode",params); 
			
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"ProductCode",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.confirmProductInstance(params,cb);
		}

		
		service.CopyFpgaImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceFpgaImageId",params); 
			copyArg(n,"SourceRegion",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"SourceFpgaImageId",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"Name",params); 
			copyArg(msg,"SourceRegion",params); 
			copyArg(msg,"ClientToken",params); 
			

			svc.copyFpgaImage(params,cb);
		}

		
		service.CopyImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params); 
			copyArg(n,"SourceImageId",params); 
			copyArg(n,"SourceRegion",params); 
			
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"Encrypted",params); 
			copyArg(msg,"KmsKeyId",params); 
			copyArg(msg,"Name",params); 
			copyArg(msg,"SourceImageId",params); 
			copyArg(msg,"SourceRegion",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.copyImage(params,cb);
		}

		
		service.CopySnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceRegion",params); 
			copyArg(n,"SourceSnapshotId",params); 
			
			copyArg(msg,"Description",params); 
			copyArg(msg,"DestinationRegion",params); 
			copyArg(msg,"Encrypted",params); 
			copyArg(msg,"KmsKeyId",params); 
			copyArg(msg,"PresignedUrl",params); 
			copyArg(msg,"SourceRegion",params); 
			copyArg(msg,"SourceSnapshotId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.copySnapshot(params,cb);
		}

		
		service.CreateCustomerGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"BgpAsn",params); 
			copyArg(n,"PublicIp",params); 
			copyArg(n,"Type",params); 
			
			copyArg(msg,"BgpAsn",params); 
			copyArg(msg,"PublicIp",params); 
			copyArg(msg,"Type",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.createCustomerGateway(params,cb);
		}

		
		service.CreateDefaultSubnet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AvailabilityZone",params); 
			
			copyArg(msg,"AvailabilityZone",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.createDefaultSubnet(params,cb);
		}

		
		service.CreateDefaultVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			

			svc.createDefaultVpc(params,cb);
		}

		
		service.CreateDhcpOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DhcpConfigurations",params); 
			
			copyArg(msg,"DhcpConfigurations",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.createDhcpOptions(params,cb);
		}

		
		service.CreateEgressOnlyInternetGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcId",params); 
			

			svc.createEgressOnlyInternetGateway(params,cb);
		}

		
		service.CreateFlowLogs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DeliverLogsPermissionArn",params); 
			copyArg(n,"LogGroupName",params); 
			copyArg(n,"ResourceIds",params); 
			copyArg(n,"ResourceType",params); 
			copyArg(n,"TrafficType",params); 
			
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"DeliverLogsPermissionArn",params); 
			copyArg(msg,"LogGroupName",params); 
			copyArg(msg,"ResourceIds",params); 
			copyArg(msg,"ResourceType",params); 
			copyArg(msg,"TrafficType",params); 
			

			svc.createFlowLogs(params,cb);
		}

		
		service.CreateFpgaImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InputStorageLocation",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InputStorageLocation",params); 
			copyArg(msg,"LogsStorageLocation",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"Name",params); 
			copyArg(msg,"ClientToken",params); 
			

			svc.createFpgaImage(params,cb);
		}

		
		service.CreateImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params); 
			copyArg(n,"Name",params); 
			
			copyArg(msg,"BlockDeviceMappings",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"Name",params); 
			copyArg(msg,"NoReboot",params); 
			

			svc.createImage(params,cb);
		}

		
		service.CreateInstanceExportTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params); 
			
			copyArg(msg,"Description",params); 
			copyArg(msg,"ExportToS3Task",params); 
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"TargetEnvironment",params); 
			

			svc.createInstanceExportTask(params,cb);
		}

		
		service.CreateInternetGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			

			svc.createInternetGateway(params,cb);
		}

		
		service.CreateKeyPair=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyName",params); 
			
			copyArg(msg,"KeyName",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.createKeyPair(params,cb);
		}

		
		service.CreateNatGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AllocationId",params); 
			copyArg(n,"SubnetId",params); 
			
			copyArg(msg,"AllocationId",params); 
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"SubnetId",params); 
			

			svc.createNatGateway(params,cb);
		}

		
		service.CreateNetworkAcl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcId",params); 
			

			svc.createNetworkAcl(params,cb);
		}

		
		service.CreateNetworkAclEntry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Egress",params); 
			copyArg(n,"NetworkAclId",params); 
			copyArg(n,"Protocol",params); 
			copyArg(n,"RuleAction",params); 
			copyArg(n,"RuleNumber",params); 
			
			copyArg(msg,"CidrBlock",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Egress",params); 
			copyArg(msg,"IcmpTypeCode",params); 
			copyArg(msg,"Ipv6CidrBlock",params); 
			copyArg(msg,"NetworkAclId",params); 
			copyArg(msg,"PortRange",params); 
			copyArg(msg,"Protocol",params); 
			copyArg(msg,"RuleAction",params); 
			copyArg(msg,"RuleNumber",params); 
			

			svc.createNetworkAclEntry(params,cb);
		}

		
		service.CreateNetworkInterface=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetId",params); 
			
			copyArg(msg,"Description",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Groups",params); 
			copyArg(msg,"Ipv6AddressCount",params); 
			copyArg(msg,"Ipv6Addresses",params); 
			copyArg(msg,"PrivateIpAddress",params); 
			copyArg(msg,"PrivateIpAddresses",params); 
			copyArg(msg,"SecondaryPrivateIpAddressCount",params); 
			copyArg(msg,"SubnetId",params); 
			

			svc.createNetworkInterface(params,cb);
		}

		
		service.CreateNetworkInterfacePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params); 
			copyArg(n,"Permission",params); 
			
			copyArg(msg,"NetworkInterfaceId",params); 
			copyArg(msg,"AwsAccountId",params); 
			copyArg(msg,"AwsService",params); 
			copyArg(msg,"Permission",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.createNetworkInterfacePermission(params,cb);
		}

		
		service.CreatePlacementGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params); 
			copyArg(n,"Strategy",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"GroupName",params); 
			copyArg(msg,"Strategy",params); 
			

			svc.createPlacementGroup(params,cb);
		}

		
		service.CreateReservedInstancesListing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ClientToken",params); 
			copyArg(n,"InstanceCount",params); 
			copyArg(n,"PriceSchedules",params); 
			copyArg(n,"ReservedInstancesId",params); 
			
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"InstanceCount",params); 
			copyArg(msg,"PriceSchedules",params); 
			copyArg(msg,"ReservedInstancesId",params); 
			

			svc.createReservedInstancesListing(params,cb);
		}

		
		service.CreateRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteTableId",params); 
			
			copyArg(msg,"DestinationCidrBlock",params); 
			copyArg(msg,"DestinationIpv6CidrBlock",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"EgressOnlyInternetGatewayId",params); 
			copyArg(msg,"GatewayId",params); 
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"NatGatewayId",params); 
			copyArg(msg,"NetworkInterfaceId",params); 
			copyArg(msg,"RouteTableId",params); 
			copyArg(msg,"VpcPeeringConnectionId",params); 
			

			svc.createRoute(params,cb);
		}

		
		service.CreateRouteTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcId",params); 
			

			svc.createRouteTable(params,cb);
		}

		
		service.CreateSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Description",params); 
			copyArg(n,"GroupName",params); 
			
			copyArg(msg,"Description",params); 
			copyArg(msg,"GroupName",params); 
			copyArg(msg,"VpcId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.createSecurityGroup(params,cb);
		}

		
		service.CreateSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params); 
			
			copyArg(msg,"Description",params); 
			copyArg(msg,"VolumeId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.createSnapshot(params,cb);
		}

		
		service.CreateSpotDatafeedSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Prefix",params); 
			

			svc.createSpotDatafeedSubscription(params,cb);
		}

		
		service.CreateSubnet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CidrBlock",params); 
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"AvailabilityZone",params); 
			copyArg(msg,"CidrBlock",params); 
			copyArg(msg,"Ipv6CidrBlock",params); 
			copyArg(msg,"VpcId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.createSubnet(params,cb);
		}

		
		service.CreateTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resources",params); 
			copyArg(n,"Tags",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Resources",params); 
			copyArg(msg,"Tags",params); 
			

			svc.createTags(params,cb);
		}

		
		service.CreateVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AvailabilityZone",params); 
			
			copyArg(msg,"AvailabilityZone",params); 
			copyArg(msg,"Encrypted",params); 
			copyArg(msg,"Iops",params); 
			copyArg(msg,"KmsKeyId",params); 
			copyArg(msg,"Size",params); 
			copyArg(msg,"SnapshotId",params); 
			copyArg(msg,"VolumeType",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"TagSpecifications",params); 
			

			svc.createVolume(params,cb);
		}

		
		service.CreateVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CidrBlock",params); 
			
			copyArg(msg,"CidrBlock",params); 
			copyArg(msg,"AmazonProvidedIpv6CidrBlock",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InstanceTenancy",params); 
			

			svc.createVpc(params,cb);
		}

		
		service.CreateVpcEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params); 
			copyArg(n,"ServiceName",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcEndpointType",params); 
			copyArg(msg,"VpcId",params); 
			copyArg(msg,"ServiceName",params); 
			copyArg(msg,"PolicyDocument",params); 
			copyArg(msg,"RouteTableIds",params); 
			copyArg(msg,"SubnetIds",params); 
			copyArg(msg,"SecurityGroupIds",params); 
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"PrivateDnsEnabled",params); 
			

			svc.createVpcEndpoint(params,cb);
		}

		
		service.CreateVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"PeerOwnerId",params); 
			copyArg(msg,"PeerVpcId",params); 
			copyArg(msg,"VpcId",params); 
			

			svc.createVpcPeeringConnection(params,cb);
		}

		
		service.CreateVpnConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CustomerGatewayId",params); 
			copyArg(n,"Type",params); 
			copyArg(n,"VpnGatewayId",params); 
			
			copyArg(msg,"CustomerGatewayId",params); 
			copyArg(msg,"Type",params); 
			copyArg(msg,"VpnGatewayId",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Options",params); 
			

			svc.createVpnConnection(params,cb);
		}

		
		service.CreateVpnConnectionRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DestinationCidrBlock",params); 
			copyArg(n,"VpnConnectionId",params); 
			
			copyArg(msg,"DestinationCidrBlock",params); 
			copyArg(msg,"VpnConnectionId",params); 
			

			svc.createVpnConnectionRoute(params,cb);
		}

		
		service.CreateVpnGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Type",params); 
			
			copyArg(msg,"AvailabilityZone",params); 
			copyArg(msg,"Type",params); 
			copyArg(msg,"AmazonSideAsn",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.createVpnGateway(params,cb);
		}

		
		service.DeleteCustomerGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CustomerGatewayId",params); 
			
			copyArg(msg,"CustomerGatewayId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.deleteCustomerGateway(params,cb);
		}

		
		service.DeleteDhcpOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DhcpOptionsId",params); 
			
			copyArg(msg,"DhcpOptionsId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.deleteDhcpOptions(params,cb);
		}

		
		service.DeleteEgressOnlyInternetGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"EgressOnlyInternetGatewayId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"EgressOnlyInternetGatewayId",params); 
			

			svc.deleteEgressOnlyInternetGateway(params,cb);
		}

		
		service.DeleteFlowLogs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FlowLogIds",params); 
			
			copyArg(msg,"FlowLogIds",params); 
			

			svc.deleteFlowLogs(params,cb);
		}

		
		service.DeleteFpgaImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FpgaImageId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"FpgaImageId",params); 
			

			svc.deleteFpgaImage(params,cb);
		}

		
		service.DeleteInternetGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InternetGatewayId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InternetGatewayId",params); 
			

			svc.deleteInternetGateway(params,cb);
		}

		
		service.DeleteKeyPair=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyName",params); 
			
			copyArg(msg,"KeyName",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.deleteKeyPair(params,cb);
		}

		
		service.DeleteNatGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NatGatewayId",params); 
			
			copyArg(msg,"NatGatewayId",params); 
			

			svc.deleteNatGateway(params,cb);
		}

		
		service.DeleteNetworkAcl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkAclId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"NetworkAclId",params); 
			

			svc.deleteNetworkAcl(params,cb);
		}

		
		service.DeleteNetworkAclEntry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Egress",params); 
			copyArg(n,"NetworkAclId",params); 
			copyArg(n,"RuleNumber",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Egress",params); 
			copyArg(msg,"NetworkAclId",params); 
			copyArg(msg,"RuleNumber",params); 
			

			svc.deleteNetworkAclEntry(params,cb);
		}

		
		service.DeleteNetworkInterface=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"NetworkInterfaceId",params); 
			

			svc.deleteNetworkInterface(params,cb);
		}

		
		service.DeleteNetworkInterfacePermission=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfacePermissionId",params); 
			
			copyArg(msg,"NetworkInterfacePermissionId",params); 
			copyArg(msg,"Force",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.deleteNetworkInterfacePermission(params,cb);
		}

		
		service.DeletePlacementGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupName",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"GroupName",params); 
			

			svc.deletePlacementGroup(params,cb);
		}

		
		service.DeleteRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteTableId",params); 
			
			copyArg(msg,"DestinationCidrBlock",params); 
			copyArg(msg,"DestinationIpv6CidrBlock",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"RouteTableId",params); 
			

			svc.deleteRoute(params,cb);
		}

		
		service.DeleteRouteTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteTableId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"RouteTableId",params); 
			

			svc.deleteRouteTable(params,cb);
		}

		
		service.DeleteSecurityGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GroupId",params); 
			copyArg(msg,"GroupName",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.deleteSecurityGroup(params,cb);
		}

		
		service.DeleteSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotId",params); 
			
			copyArg(msg,"SnapshotId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.deleteSnapshot(params,cb);
		}

		
		service.DeleteSpotDatafeedSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			

			svc.deleteSpotDatafeedSubscription(params,cb);
		}

		
		service.DeleteSubnet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetId",params); 
			
			copyArg(msg,"SubnetId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.deleteSubnet(params,cb);
		}

		
		service.DeleteTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resources",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Resources",params); 
			copyArg(msg,"Tags",params); 
			

			svc.deleteTags(params,cb);
		}

		
		service.DeleteVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params); 
			
			copyArg(msg,"VolumeId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.deleteVolume(params,cb);
		}

		
		service.DeleteVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"VpcId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.deleteVpc(params,cb);
		}

		
		service.DeleteVpcEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcEndpointIds",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcEndpointIds",params); 
			

			svc.deleteVpcEndpoints(params,cb);
		}

		
		service.DeleteVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcPeeringConnectionId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcPeeringConnectionId",params); 
			

			svc.deleteVpcPeeringConnection(params,cb);
		}

		
		service.DeleteVpnConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpnConnectionId",params); 
			
			copyArg(msg,"VpnConnectionId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.deleteVpnConnection(params,cb);
		}

		
		service.DeleteVpnConnectionRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DestinationCidrBlock",params); 
			copyArg(n,"VpnConnectionId",params); 
			
			copyArg(msg,"DestinationCidrBlock",params); 
			copyArg(msg,"VpnConnectionId",params); 
			

			svc.deleteVpnConnectionRoute(params,cb);
		}

		
		service.DeleteVpnGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpnGatewayId",params); 
			
			copyArg(msg,"VpnGatewayId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.deleteVpnGateway(params,cb);
		}

		
		service.DeregisterImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageId",params); 
			
			copyArg(msg,"ImageId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.deregisterImage(params,cb);
		}

		
		service.DescribeAccountAttributes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AttributeNames",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeAccountAttributes(params,cb);
		}

		
		service.DescribeAddresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"PublicIps",params); 
			copyArg(msg,"AllocationIds",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeAddresses(params,cb);
		}

		
		service.DescribeAvailabilityZones=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"ZoneNames",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeAvailabilityZones(params,cb);
		}

		
		service.DescribeBundleTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"BundleIds",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeBundleTasks(params,cb);
		}

		
		service.DescribeClassicLinkInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InstanceIds",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeClassicLinkInstances(params,cb);
		}

		
		service.DescribeConversionTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ConversionTaskIds",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeConversionTasks(params,cb);
		}

		
		service.DescribeCustomerGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CustomerGatewayIds",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeCustomerGateways(params,cb);
		}

		
		service.DescribeDhcpOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DhcpOptionsIds",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeDhcpOptions(params,cb);
		}

		
		service.DescribeEgressOnlyInternetGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"EgressOnlyInternetGatewayIds",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeEgressOnlyInternetGateways(params,cb);
		}

		
		service.DescribeElasticGpus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ElasticGpuIds",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeElasticGpus(params,cb);
		}

		
		service.DescribeExportTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ExportTaskIds",params); 
			

			svc.describeExportTasks(params,cb);
		}

		
		service.DescribeFlowLogs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params); 
			copyArg(msg,"FlowLogIds",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeFlowLogs(params,cb);
		}

		
		service.DescribeFpgaImageAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FpgaImageId",params); 
			copyArg(n,"Attribute",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"FpgaImageId",params); 
			copyArg(msg,"Attribute",params); 
			

			svc.describeFpgaImageAttribute(params,cb);
		}

		
		service.DescribeFpgaImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"FpgaImageIds",params); 
			copyArg(msg,"Owners",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"MaxResults",params); 
			

			svc.describeFpgaImages(params,cb);
		}

		
		service.DescribeHostReservationOfferings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params); 
			copyArg(msg,"MaxDuration",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"MinDuration",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"OfferingId",params); 
			

			svc.describeHostReservationOfferings(params,cb);
		}

		
		service.DescribeHostReservations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params); 
			copyArg(msg,"HostReservationIdSet",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeHostReservations(params,cb);
		}

		
		service.DescribeHosts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params); 
			copyArg(msg,"HostIds",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeHosts(params,cb);
		}

		
		service.DescribeIamInstanceProfileAssociations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AssociationIds",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeIamInstanceProfileAssociations(params,cb);
		}

		
		service.DescribeIdFormat=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Resource",params); 
			

			svc.describeIdFormat(params,cb);
		}

		
		service.DescribeIdentityIdFormat=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PrincipalArn",params); 
			
			copyArg(msg,"PrincipalArn",params); 
			copyArg(msg,"Resource",params); 
			

			svc.describeIdentityIdFormat(params,cb);
		}

		
		service.DescribeImageAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params); 
			copyArg(n,"ImageId",params); 
			
			copyArg(msg,"Attribute",params); 
			copyArg(msg,"ImageId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeImageAttribute(params,cb);
		}

		
		service.DescribeImages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ExecutableUsers",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"ImageIds",params); 
			copyArg(msg,"Owners",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeImages(params,cb);
		}

		
		service.DescribeImportImageTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"ImportTaskIds",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeImportImageTasks(params,cb);
		}

		
		service.DescribeImportSnapshotTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"ImportTaskIds",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeImportSnapshotTasks(params,cb);
		}

		
		service.DescribeInstanceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params); 
			copyArg(n,"InstanceId",params); 
			
			copyArg(msg,"Attribute",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InstanceId",params); 
			

			svc.describeInstanceAttribute(params,cb);
		}

		
		service.DescribeInstanceStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"InstanceIds",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"IncludeAllInstances",params); 
			

			svc.describeInstanceStatus(params,cb);
		}

		
		service.DescribeInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"InstanceIds",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeInstances(params,cb);
		}

		
		service.DescribeInternetGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InternetGatewayIds",params); 
			

			svc.describeInternetGateways(params,cb);
		}

		
		service.DescribeKeyPairs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"KeyNames",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeKeyPairs(params,cb);
		}

		
		service.DescribeMovingAddresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"PublicIps",params); 
			

			svc.describeMovingAddresses(params,cb);
		}

		
		service.DescribeNatGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filter",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NatGatewayIds",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeNatGateways(params,cb);
		}

		
		service.DescribeNetworkAcls=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"NetworkAclIds",params); 
			

			svc.describeNetworkAcls(params,cb);
		}

		
		service.DescribeNetworkInterfaceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params); 
			
			copyArg(msg,"Attribute",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"NetworkInterfaceId",params); 
			

			svc.describeNetworkInterfaceAttribute(params,cb);
		}

		
		service.DescribeNetworkInterfacePermissions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NetworkInterfacePermissionIds",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"MaxResults",params); 
			

			svc.describeNetworkInterfacePermissions(params,cb);
		}

		
		service.DescribeNetworkInterfaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"NetworkInterfaceIds",params); 
			

			svc.describeNetworkInterfaces(params,cb);
		}

		
		service.DescribePlacementGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"GroupNames",params); 
			

			svc.describePlacementGroups(params,cb);
		}

		
		service.DescribePrefixLists=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"PrefixListIds",params); 
			

			svc.describePrefixLists(params,cb);
		}

		
		service.DescribeRegions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"RegionNames",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeRegions(params,cb);
		}

		
		service.DescribeReservedInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"OfferingClass",params); 
			copyArg(msg,"ReservedInstancesIds",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"OfferingType",params); 
			

			svc.describeReservedInstances(params,cb);
		}

		
		service.DescribeReservedInstancesListings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"ReservedInstancesId",params); 
			copyArg(msg,"ReservedInstancesListingId",params); 
			

			svc.describeReservedInstancesListings(params,cb);
		}

		
		service.DescribeReservedInstancesModifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"ReservedInstancesModificationIds",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeReservedInstancesModifications(params,cb);
		}

		
		service.DescribeReservedInstancesOfferings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AvailabilityZone",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"IncludeMarketplace",params); 
			copyArg(msg,"InstanceType",params); 
			copyArg(msg,"MaxDuration",params); 
			copyArg(msg,"MaxInstanceCount",params); 
			copyArg(msg,"MinDuration",params); 
			copyArg(msg,"OfferingClass",params); 
			copyArg(msg,"ProductDescription",params); 
			copyArg(msg,"ReservedInstancesOfferingIds",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InstanceTenancy",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"OfferingType",params); 
			

			svc.describeReservedInstancesOfferings(params,cb);
		}

		
		service.DescribeRouteTables=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"RouteTableIds",params); 
			

			svc.describeRouteTables(params,cb);
		}

		
		service.DescribeScheduledInstanceAvailability=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FirstSlotStartTimeRange",params); 
			copyArg(n,"Recurrence",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"FirstSlotStartTimeRange",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"MaxSlotDurationInHours",params); 
			copyArg(msg,"MinSlotDurationInHours",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"Recurrence",params); 
			

			svc.describeScheduledInstanceAvailability(params,cb);
		}

		
		service.DescribeScheduledInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"ScheduledInstanceIds",params); 
			copyArg(msg,"SlotStartTimeRange",params); 
			

			svc.describeScheduledInstances(params,cb);
		}

		
		service.DescribeSecurityGroupReferences=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"GroupId",params); 
			

			svc.describeSecurityGroupReferences(params,cb);
		}

		
		service.DescribeSecurityGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"GroupIds",params); 
			copyArg(msg,"GroupNames",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"MaxResults",params); 
			

			svc.describeSecurityGroups(params,cb);
		}

		
		service.DescribeSnapshotAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params); 
			copyArg(n,"SnapshotId",params); 
			
			copyArg(msg,"Attribute",params); 
			copyArg(msg,"SnapshotId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeSnapshotAttribute(params,cb);
		}

		
		service.DescribeSnapshots=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"OwnerIds",params); 
			copyArg(msg,"RestorableByUserIds",params); 
			copyArg(msg,"SnapshotIds",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeSnapshots(params,cb);
		}

		
		service.DescribeSpotDatafeedSubscription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			

			svc.describeSpotDatafeedSubscription(params,cb);
		}

		
		service.DescribeSpotFleetInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SpotFleetRequestId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"SpotFleetRequestId",params); 
			

			svc.describeSpotFleetInstances(params,cb);
		}

		
		service.DescribeSpotFleetRequestHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SpotFleetRequestId",params); 
			copyArg(n,"StartTime",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"EventType",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"SpotFleetRequestId",params); 
			copyArg(msg,"StartTime",params); 
			

			svc.describeSpotFleetRequestHistory(params,cb);
		}

		
		service.DescribeSpotFleetRequests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"SpotFleetRequestIds",params); 
			

			svc.describeSpotFleetRequests(params,cb);
		}

		
		service.DescribeSpotInstanceRequests=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"SpotInstanceRequestIds",params); 
			

			svc.describeSpotInstanceRequests(params,cb);
		}

		
		service.DescribeSpotPriceHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"AvailabilityZone",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"EndTime",params); 
			copyArg(msg,"InstanceTypes",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"ProductDescriptions",params); 
			copyArg(msg,"StartTime",params); 
			

			svc.describeSpotPriceHistory(params,cb);
		}

		
		service.DescribeStaleSecurityGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"VpcId",params); 
			

			svc.describeStaleSecurityGroups(params,cb);
		}

		
		service.DescribeSubnets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"SubnetIds",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeSubnets(params,cb);
		}

		
		service.DescribeTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeTags(params,cb);
		}

		
		service.DescribeVolumeAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params); 
			
			copyArg(msg,"Attribute",params); 
			copyArg(msg,"VolumeId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeVolumeAttribute(params,cb);
		}

		
		service.DescribeVolumeStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"VolumeIds",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeVolumeStatus(params,cb);
		}

		
		service.DescribeVolumes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"VolumeIds",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeVolumes(params,cb);
		}

		
		service.DescribeVolumesModifications=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VolumeIds",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"MaxResults",params); 
			

			svc.describeVolumesModifications(params,cb);
		}

		
		service.DescribeVpcAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params); 
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"Attribute",params); 
			copyArg(msg,"VpcId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeVpcAttribute(params,cb);
		}

		
		service.DescribeVpcClassicLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcIds",params); 
			

			svc.describeVpcClassicLink(params,cb);
		}

		
		service.DescribeVpcClassicLinkDnsSupport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"VpcIds",params); 
			

			svc.describeVpcClassicLinkDnsSupport(params,cb);
		}

		
		service.DescribeVpcEndpointServices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"ServiceNames",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeVpcEndpointServices(params,cb);
		}

		
		service.DescribeVpcEndpoints=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcEndpointIds",params); 
			copyArg(msg,"Filters",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeVpcEndpoints(params,cb);
		}

		
		service.DescribeVpcPeeringConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcPeeringConnectionIds",params); 
			

			svc.describeVpcPeeringConnections(params,cb);
		}

		
		service.DescribeVpcs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"VpcIds",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeVpcs(params,cb);
		}

		
		service.DescribeVpnConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"VpnConnectionIds",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeVpnConnections(params,cb);
		}

		
		service.DescribeVpnGateways=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params); 
			copyArg(msg,"VpnGatewayIds",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.describeVpnGateways(params,cb);
		}

		
		service.DetachClassicLinkVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params); 
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"VpcId",params); 
			

			svc.detachClassicLinkVpc(params,cb);
		}

		
		service.DetachInternetGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InternetGatewayId",params); 
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InternetGatewayId",params); 
			copyArg(msg,"VpcId",params); 
			

			svc.detachInternetGateway(params,cb);
		}

		
		service.DetachNetworkInterface=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AttachmentId",params); 
			
			copyArg(msg,"AttachmentId",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Force",params); 
			

			svc.detachNetworkInterface(params,cb);
		}

		
		service.DetachVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params); 
			
			copyArg(msg,"Device",params); 
			copyArg(msg,"Force",params); 
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"VolumeId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.detachVolume(params,cb);
		}

		
		service.DetachVpnGateway=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params); 
			copyArg(n,"VpnGatewayId",params); 
			
			copyArg(msg,"VpcId",params); 
			copyArg(msg,"VpnGatewayId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.detachVpnGateway(params,cb);
		}

		
		service.DisableVgwRoutePropagation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayId",params); 
			copyArg(n,"RouteTableId",params); 
			
			copyArg(msg,"GatewayId",params); 
			copyArg(msg,"RouteTableId",params); 
			

			svc.disableVgwRoutePropagation(params,cb);
		}

		
		service.DisableVpcClassicLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcId",params); 
			

			svc.disableVpcClassicLink(params,cb);
		}

		
		service.DisableVpcClassicLinkDnsSupport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"VpcId",params); 
			

			svc.disableVpcClassicLinkDnsSupport(params,cb);
		}

		
		service.DisassociateAddress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AssociationId",params); 
			copyArg(msg,"PublicIp",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.disassociateAddress(params,cb);
		}

		
		service.DisassociateIamInstanceProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params); 
			
			copyArg(msg,"AssociationId",params); 
			

			svc.disassociateIamInstanceProfile(params,cb);
		}

		
		service.DisassociateRouteTable=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params); 
			
			copyArg(msg,"AssociationId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.disassociateRouteTable(params,cb);
		}

		
		service.DisassociateSubnetCidrBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params); 
			
			copyArg(msg,"AssociationId",params); 
			

			svc.disassociateSubnetCidrBlock(params,cb);
		}

		
		service.DisassociateVpcCidrBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params); 
			
			copyArg(msg,"AssociationId",params); 
			

			svc.disassociateVpcCidrBlock(params,cb);
		}

		
		service.EnableVgwRoutePropagation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GatewayId",params); 
			copyArg(n,"RouteTableId",params); 
			
			copyArg(msg,"GatewayId",params); 
			copyArg(msg,"RouteTableId",params); 
			

			svc.enableVgwRoutePropagation(params,cb);
		}

		
		service.EnableVolumeIO=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VolumeId",params); 
			

			svc.enableVolumeIO(params,cb);
		}

		
		service.EnableVpcClassicLink=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcId",params); 
			

			svc.enableVpcClassicLink(params,cb);
		}

		
		service.EnableVpcClassicLinkDnsSupport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"VpcId",params); 
			

			svc.enableVpcClassicLinkDnsSupport(params,cb);
		}

		
		service.GetConsoleOutput=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params); 
			
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.getConsoleOutput(params,cb);
		}

		
		service.GetConsoleScreenshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"WakeUp",params); 
			

			svc.getConsoleScreenshot(params,cb);
		}

		
		service.GetHostReservationPurchasePreview=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostIdSet",params); 
			copyArg(n,"OfferingId",params); 
			
			copyArg(msg,"HostIdSet",params); 
			copyArg(msg,"OfferingId",params); 
			

			svc.getHostReservationPurchasePreview(params,cb);
		}

		
		service.GetPasswordData=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params); 
			
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.getPasswordData(params,cb);
		}

		
		service.GetReservedInstancesExchangeQuote=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedInstanceIds",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"ReservedInstanceIds",params); 
			copyArg(msg,"TargetConfigurations",params); 
			

			svc.getReservedInstancesExchangeQuote(params,cb);
		}

		
		service.ImportImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Architecture",params); 
			copyArg(msg,"ClientData",params); 
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"DiskContainers",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Hypervisor",params); 
			copyArg(msg,"LicenseType",params); 
			copyArg(msg,"Platform",params); 
			copyArg(msg,"RoleName",params); 
			

			svc.importImage(params,cb);
		}

		
		service.ImportInstance=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Platform",params); 
			
			copyArg(msg,"Description",params); 
			copyArg(msg,"DiskImages",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"LaunchSpecification",params); 
			copyArg(msg,"Platform",params); 
			

			svc.importInstance(params,cb);
		}

		
		service.ImportKeyPair=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyName",params); 
			copyArg(n,"PublicKeyMaterial",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"KeyName",params); 
			copyArg(msg,"PublicKeyMaterial",params); 
			

			svc.importKeyPair(params,cb);
		}

		
		service.ImportSnapshot=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ClientData",params); 
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"DiskContainer",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"RoleName",params); 
			

			svc.importSnapshot(params,cb);
		}

		
		service.ImportVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AvailabilityZone",params); 
			copyArg(n,"Image",params); 
			copyArg(n,"Volume",params); 
			
			copyArg(msg,"AvailabilityZone",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Image",params); 
			copyArg(msg,"Volume",params); 
			

			svc.importVolume(params,cb);
		}

		
		service.ModifyFpgaImageAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FpgaImageId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"FpgaImageId",params); 
			copyArg(msg,"Attribute",params); 
			copyArg(msg,"OperationType",params); 
			copyArg(msg,"UserIds",params); 
			copyArg(msg,"UserGroups",params); 
			copyArg(msg,"ProductCodes",params); 
			copyArg(msg,"LoadPermission",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"Name",params); 
			

			svc.modifyFpgaImageAttribute(params,cb);
		}

		
		service.ModifyHosts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AutoPlacement",params); 
			copyArg(n,"HostIds",params); 
			
			copyArg(msg,"AutoPlacement",params); 
			copyArg(msg,"HostIds",params); 
			

			svc.modifyHosts(params,cb);
		}

		
		service.ModifyIdFormat=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Resource",params); 
			copyArg(n,"UseLongIds",params); 
			
			copyArg(msg,"Resource",params); 
			copyArg(msg,"UseLongIds",params); 
			

			svc.modifyIdFormat(params,cb);
		}

		
		service.ModifyIdentityIdFormat=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PrincipalArn",params); 
			copyArg(n,"Resource",params); 
			copyArg(n,"UseLongIds",params); 
			
			copyArg(msg,"PrincipalArn",params); 
			copyArg(msg,"Resource",params); 
			copyArg(msg,"UseLongIds",params); 
			

			svc.modifyIdentityIdFormat(params,cb);
		}

		
		service.ModifyImageAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageId",params); 
			
			copyArg(msg,"Attribute",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"ImageId",params); 
			copyArg(msg,"LaunchPermission",params); 
			copyArg(msg,"OperationType",params); 
			copyArg(msg,"ProductCodes",params); 
			copyArg(msg,"UserGroups",params); 
			copyArg(msg,"UserIds",params); 
			copyArg(msg,"Value",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.modifyImageAttribute(params,cb);
		}

		
		service.ModifyInstanceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params); 
			
			copyArg(msg,"SourceDestCheck",params); 
			copyArg(msg,"Attribute",params); 
			copyArg(msg,"BlockDeviceMappings",params); 
			copyArg(msg,"DisableApiTermination",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"EbsOptimized",params); 
			copyArg(msg,"EnaSupport",params); 
			copyArg(msg,"Groups",params); 
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"InstanceInitiatedShutdownBehavior",params); 
			copyArg(msg,"InstanceType",params); 
			copyArg(msg,"Kernel",params); 
			copyArg(msg,"Ramdisk",params); 
			copyArg(msg,"SriovNetSupport",params); 
			copyArg(msg,"UserData",params); 
			copyArg(msg,"Value",params); 
			

			svc.modifyInstanceAttribute(params,cb);
		}

		
		service.ModifyInstancePlacement=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceId",params); 
			
			copyArg(msg,"Affinity",params); 
			copyArg(msg,"HostId",params); 
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"Tenancy",params); 
			

			svc.modifyInstancePlacement(params,cb);
		}

		
		service.ModifyNetworkInterfaceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params); 
			
			copyArg(msg,"Attachment",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Groups",params); 
			copyArg(msg,"NetworkInterfaceId",params); 
			copyArg(msg,"SourceDestCheck",params); 
			

			svc.modifyNetworkInterfaceAttribute(params,cb);
		}

		
		service.ModifyReservedInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedInstancesIds",params); 
			copyArg(n,"TargetConfigurations",params); 
			
			copyArg(msg,"ReservedInstancesIds",params); 
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"TargetConfigurations",params); 
			

			svc.modifyReservedInstances(params,cb);
		}

		
		service.ModifySnapshotAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SnapshotId",params); 
			
			copyArg(msg,"Attribute",params); 
			copyArg(msg,"CreateVolumePermission",params); 
			copyArg(msg,"GroupNames",params); 
			copyArg(msg,"OperationType",params); 
			copyArg(msg,"SnapshotId",params); 
			copyArg(msg,"UserIds",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.modifySnapshotAttribute(params,cb);
		}

		
		service.ModifySpotFleetRequest=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SpotFleetRequestId",params); 
			
			copyArg(msg,"ExcessCapacityTerminationPolicy",params); 
			copyArg(msg,"SpotFleetRequestId",params); 
			copyArg(msg,"TargetCapacity",params); 
			

			svc.modifySpotFleetRequest(params,cb);
		}

		
		service.ModifySubnetAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SubnetId",params); 
			
			copyArg(msg,"AssignIpv6AddressOnCreation",params); 
			copyArg(msg,"MapPublicIpOnLaunch",params); 
			copyArg(msg,"SubnetId",params); 
			

			svc.modifySubnetAttribute(params,cb);
		}

		
		service.ModifyVolume=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VolumeId",params); 
			copyArg(msg,"Size",params); 
			copyArg(msg,"VolumeType",params); 
			copyArg(msg,"Iops",params); 
			

			svc.modifyVolume(params,cb);
		}

		
		service.ModifyVolumeAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VolumeId",params); 
			
			copyArg(msg,"AutoEnableIO",params); 
			copyArg(msg,"VolumeId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.modifyVolumeAttribute(params,cb);
		}

		
		service.ModifyVpcAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params); 
			
			copyArg(msg,"EnableDnsHostnames",params); 
			copyArg(msg,"EnableDnsSupport",params); 
			copyArg(msg,"VpcId",params); 
			

			svc.modifyVpcAttribute(params,cb);
		}

		
		service.ModifyVpcEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcEndpointId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcEndpointId",params); 
			copyArg(msg,"ResetPolicy",params); 
			copyArg(msg,"PolicyDocument",params); 
			copyArg(msg,"AddRouteTableIds",params); 
			copyArg(msg,"RemoveRouteTableIds",params); 
			copyArg(msg,"AddSubnetIds",params); 
			copyArg(msg,"RemoveSubnetIds",params); 
			copyArg(msg,"AddSecurityGroupIds",params); 
			copyArg(msg,"RemoveSecurityGroupIds",params); 
			copyArg(msg,"PrivateDnsEnabled",params); 
			

			svc.modifyVpcEndpoint(params,cb);
		}

		
		service.ModifyVpcPeeringConnectionOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcPeeringConnectionId",params); 
			
			copyArg(msg,"AccepterPeeringConnectionOptions",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"RequesterPeeringConnectionOptions",params); 
			copyArg(msg,"VpcPeeringConnectionId",params); 
			

			svc.modifyVpcPeeringConnectionOptions(params,cb);
		}

		
		service.ModifyVpcTenancy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcId",params); 
			copyArg(n,"InstanceTenancy",params); 
			
			copyArg(msg,"VpcId",params); 
			copyArg(msg,"InstanceTenancy",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.modifyVpcTenancy(params,cb);
		}

		
		service.MonitorInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params); 
			
			copyArg(msg,"InstanceIds",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.monitorInstances(params,cb);
		}

		
		service.MoveAddressToVpc=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PublicIp",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"PublicIp",params); 
			

			svc.moveAddressToVpc(params,cb);
		}

		
		service.PurchaseHostReservation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostIdSet",params); 
			copyArg(n,"OfferingId",params); 
			
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"CurrencyCode",params); 
			copyArg(msg,"HostIdSet",params); 
			copyArg(msg,"LimitPrice",params); 
			copyArg(msg,"OfferingId",params); 
			

			svc.purchaseHostReservation(params,cb);
		}

		
		service.PurchaseReservedInstancesOffering=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceCount",params); 
			copyArg(n,"ReservedInstancesOfferingId",params); 
			
			copyArg(msg,"InstanceCount",params); 
			copyArg(msg,"ReservedInstancesOfferingId",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"LimitPrice",params); 
			

			svc.purchaseReservedInstancesOffering(params,cb);
		}

		
		service.PurchaseScheduledInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PurchaseRequests",params); 
			
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"PurchaseRequests",params); 
			

			svc.purchaseScheduledInstances(params,cb);
		}

		
		service.RebootInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params); 
			
			copyArg(msg,"InstanceIds",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.rebootInstances(params,cb);
		}

		
		service.RegisterImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params); 
			
			copyArg(msg,"ImageLocation",params); 
			copyArg(msg,"Architecture",params); 
			copyArg(msg,"BlockDeviceMappings",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"EnaSupport",params); 
			copyArg(msg,"KernelId",params); 
			copyArg(msg,"Name",params); 
			copyArg(msg,"BillingProducts",params); 
			copyArg(msg,"RamdiskId",params); 
			copyArg(msg,"RootDeviceName",params); 
			copyArg(msg,"SriovNetSupport",params); 
			copyArg(msg,"VirtualizationType",params); 
			

			svc.registerImage(params,cb);
		}

		
		service.RejectVpcPeeringConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"VpcPeeringConnectionId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"VpcPeeringConnectionId",params); 
			

			svc.rejectVpcPeeringConnection(params,cb);
		}

		
		service.ReleaseAddress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"AllocationId",params); 
			copyArg(msg,"PublicIp",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.releaseAddress(params,cb);
		}

		
		service.ReleaseHosts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"HostIds",params); 
			
			copyArg(msg,"HostIds",params); 
			

			svc.releaseHosts(params,cb);
		}

		
		service.ReplaceIamInstanceProfileAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IamInstanceProfile",params); 
			copyArg(n,"AssociationId",params); 
			
			copyArg(msg,"IamInstanceProfile",params); 
			copyArg(msg,"AssociationId",params); 
			

			svc.replaceIamInstanceProfileAssociation(params,cb);
		}

		
		service.ReplaceNetworkAclAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params); 
			copyArg(n,"NetworkAclId",params); 
			
			copyArg(msg,"AssociationId",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"NetworkAclId",params); 
			

			svc.replaceNetworkAclAssociation(params,cb);
		}

		
		service.ReplaceNetworkAclEntry=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Egress",params); 
			copyArg(n,"NetworkAclId",params); 
			copyArg(n,"Protocol",params); 
			copyArg(n,"RuleAction",params); 
			copyArg(n,"RuleNumber",params); 
			
			copyArg(msg,"CidrBlock",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Egress",params); 
			copyArg(msg,"IcmpTypeCode",params); 
			copyArg(msg,"Ipv6CidrBlock",params); 
			copyArg(msg,"NetworkAclId",params); 
			copyArg(msg,"PortRange",params); 
			copyArg(msg,"Protocol",params); 
			copyArg(msg,"RuleAction",params); 
			copyArg(msg,"RuleNumber",params); 
			

			svc.replaceNetworkAclEntry(params,cb);
		}

		
		service.ReplaceRoute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RouteTableId",params); 
			
			copyArg(msg,"DestinationCidrBlock",params); 
			copyArg(msg,"DestinationIpv6CidrBlock",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"EgressOnlyInternetGatewayId",params); 
			copyArg(msg,"GatewayId",params); 
			copyArg(msg,"InstanceId",params); 
			copyArg(msg,"NatGatewayId",params); 
			copyArg(msg,"NetworkInterfaceId",params); 
			copyArg(msg,"RouteTableId",params); 
			copyArg(msg,"VpcPeeringConnectionId",params); 
			

			svc.replaceRoute(params,cb);
		}

		
		service.ReplaceRouteTableAssociation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AssociationId",params); 
			copyArg(n,"RouteTableId",params); 
			
			copyArg(msg,"AssociationId",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"RouteTableId",params); 
			

			svc.replaceRouteTableAssociation(params,cb);
		}

		
		service.ReportInstanceStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Instances",params); 
			copyArg(n,"ReasonCodes",params); 
			copyArg(n,"Status",params); 
			
			copyArg(msg,"Description",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"EndTime",params); 
			copyArg(msg,"Instances",params); 
			copyArg(msg,"ReasonCodes",params); 
			copyArg(msg,"StartTime",params); 
			copyArg(msg,"Status",params); 
			

			svc.reportInstanceStatus(params,cb);
		}

		
		service.RequestSpotFleet=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SpotFleetRequestConfig",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"SpotFleetRequestConfig",params); 
			

			svc.requestSpotFleet(params,cb);
		}

		
		service.RequestSpotInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SpotPrice",params); 
			
			copyArg(msg,"AvailabilityZoneGroup",params); 
			copyArg(msg,"BlockDurationMinutes",params); 
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InstanceCount",params); 
			copyArg(msg,"LaunchGroup",params); 
			copyArg(msg,"LaunchSpecification",params); 
			copyArg(msg,"SpotPrice",params); 
			copyArg(msg,"Type",params); 
			copyArg(msg,"ValidFrom",params); 
			copyArg(msg,"ValidUntil",params); 
			copyArg(msg,"InstanceInterruptionBehavior",params); 
			

			svc.requestSpotInstances(params,cb);
		}

		
		service.ResetFpgaImageAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"FpgaImageId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"FpgaImageId",params); 
			copyArg(msg,"Attribute",params); 
			

			svc.resetFpgaImageAttribute(params,cb);
		}

		
		service.ResetImageAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params); 
			copyArg(n,"ImageId",params); 
			
			copyArg(msg,"Attribute",params); 
			copyArg(msg,"ImageId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.resetImageAttribute(params,cb);
		}

		
		service.ResetInstanceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params); 
			copyArg(n,"InstanceId",params); 
			
			copyArg(msg,"Attribute",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InstanceId",params); 
			

			svc.resetInstanceAttribute(params,cb);
		}

		
		service.ResetNetworkInterfaceAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"NetworkInterfaceId",params); 
			copyArg(msg,"SourceDestCheck",params); 
			

			svc.resetNetworkInterfaceAttribute(params,cb);
		}

		
		service.ResetSnapshotAttribute=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Attribute",params); 
			copyArg(n,"SnapshotId",params); 
			
			copyArg(msg,"Attribute",params); 
			copyArg(msg,"SnapshotId",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.resetSnapshotAttribute(params,cb);
		}

		
		service.RestoreAddressToClassic=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PublicIp",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"PublicIp",params); 
			

			svc.restoreAddressToClassic(params,cb);
		}

		
		service.RevokeSecurityGroupEgress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"GroupId",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"GroupId",params); 
			copyArg(msg,"IpPermissions",params); 
			copyArg(msg,"CidrIp",params); 
			copyArg(msg,"FromPort",params); 
			copyArg(msg,"IpProtocol",params); 
			copyArg(msg,"ToPort",params); 
			copyArg(msg,"SourceSecurityGroupName",params); 
			copyArg(msg,"SourceSecurityGroupOwnerId",params); 
			

			svc.revokeSecurityGroupEgress(params,cb);
		}

		
		service.RevokeSecurityGroupIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CidrIp",params); 
			copyArg(msg,"FromPort",params); 
			copyArg(msg,"GroupId",params); 
			copyArg(msg,"GroupName",params); 
			copyArg(msg,"IpPermissions",params); 
			copyArg(msg,"IpProtocol",params); 
			copyArg(msg,"SourceSecurityGroupName",params); 
			copyArg(msg,"SourceSecurityGroupOwnerId",params); 
			copyArg(msg,"ToPort",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.revokeSecurityGroupIngress(params,cb);
		}

		
		service.RunInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ImageId",params); 
			copyArg(n,"MaxCount",params); 
			copyArg(n,"MinCount",params); 
			
			copyArg(msg,"BlockDeviceMappings",params); 
			copyArg(msg,"ImageId",params); 
			copyArg(msg,"InstanceType",params); 
			copyArg(msg,"Ipv6AddressCount",params); 
			copyArg(msg,"Ipv6Addresses",params); 
			copyArg(msg,"KernelId",params); 
			copyArg(msg,"KeyName",params); 
			copyArg(msg,"MaxCount",params); 
			copyArg(msg,"MinCount",params); 
			copyArg(msg,"Monitoring",params); 
			copyArg(msg,"Placement",params); 
			copyArg(msg,"RamdiskId",params); 
			copyArg(msg,"SecurityGroupIds",params); 
			copyArg(msg,"SecurityGroups",params); 
			copyArg(msg,"SubnetId",params); 
			copyArg(msg,"UserData",params); 
			copyArg(msg,"AdditionalInfo",params); 
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"DisableApiTermination",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"EbsOptimized",params); 
			copyArg(msg,"IamInstanceProfile",params); 
			copyArg(msg,"InstanceInitiatedShutdownBehavior",params); 
			copyArg(msg,"NetworkInterfaces",params); 
			copyArg(msg,"PrivateIpAddress",params); 
			copyArg(msg,"ElasticGpuSpecification",params); 
			copyArg(msg,"TagSpecifications",params); 
			

			svc.runInstances(params,cb);
		}

		
		service.RunScheduledInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"LaunchSpecification",params); 
			copyArg(n,"ScheduledInstanceId",params); 
			
			copyArg(msg,"ClientToken",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"InstanceCount",params); 
			copyArg(msg,"LaunchSpecification",params); 
			copyArg(msg,"ScheduledInstanceId",params); 
			

			svc.runScheduledInstances(params,cb);
		}

		
		service.StartInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params); 
			
			copyArg(msg,"InstanceIds",params); 
			copyArg(msg,"AdditionalInfo",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.startInstances(params,cb);
		}

		
		service.StopInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params); 
			
			copyArg(msg,"InstanceIds",params); 
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"Force",params); 
			

			svc.stopInstances(params,cb);
		}

		
		service.TerminateInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params); 
			
			copyArg(msg,"InstanceIds",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.terminateInstances(params,cb);
		}

		
		service.UnassignIpv6Addresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Ipv6Addresses",params); 
			copyArg(n,"NetworkInterfaceId",params); 
			
			copyArg(msg,"Ipv6Addresses",params); 
			copyArg(msg,"NetworkInterfaceId",params); 
			

			svc.unassignIpv6Addresses(params,cb);
		}

		
		service.UnassignPrivateIpAddresses=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"NetworkInterfaceId",params); 
			copyArg(n,"PrivateIpAddresses",params); 
			
			copyArg(msg,"NetworkInterfaceId",params); 
			copyArg(msg,"PrivateIpAddresses",params); 
			

			svc.unassignPrivateIpAddresses(params,cb);
		}

		
		service.UnmonitorInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceIds",params); 
			
			copyArg(msg,"InstanceIds",params); 
			copyArg(msg,"DryRun",params); 
			

			svc.unmonitorInstances(params,cb);
		}

		
		service.UpdateSecurityGroupRuleDescriptionsEgress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IpPermissions",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"GroupId",params); 
			copyArg(msg,"GroupName",params); 
			copyArg(msg,"IpPermissions",params); 
			

			svc.updateSecurityGroupRuleDescriptionsEgress(params,cb);
		}

		
		service.UpdateSecurityGroupRuleDescriptionsIngress=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"IpPermissions",params); 
			
			copyArg(msg,"DryRun",params); 
			copyArg(msg,"GroupId",params); 
			copyArg(msg,"GroupName",params); 
			copyArg(msg,"IpPermissions",params); 
			

			svc.updateSecurityGroupRuleDescriptionsIngress(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS EC2", AmazonAPINode);

};
