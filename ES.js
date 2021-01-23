
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

		var awsService = new AWS.ES( { 'region': node.region } );

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

		
		service.AcceptInboundCrossClusterSearchConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CrossClusterSearchConnectionId",params,undefined,false); 
			
			copyArg(msg,"CrossClusterSearchConnectionId",params,undefined,false); 
			

			svc.acceptInboundCrossClusterSearchConnection(params,cb);
		}

		
		service.AddTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ARN",params,undefined,false); 
			copyArg(n,"TagList",params,undefined,true); 
			
			copyArg(msg,"ARN",params,undefined,false); 
			copyArg(msg,"TagList",params,undefined,true); 
			

			svc.addTags(params,cb);
		}

		
		service.AssociatePackage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PackageID",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"PackageID",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.associatePackage(params,cb);
		}

		
		service.CancelElasticsearchServiceSoftwareUpdate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.cancelElasticsearchServiceSoftwareUpdate(params,cb);
		}

		
		service.CreateElasticsearchDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"ElasticsearchVersion",params,undefined,false); 
			copyArg(msg,"ElasticsearchClusterConfig",params,undefined,true); 
			copyArg(msg,"EBSOptions",params,undefined,true); 
			copyArg(msg,"AccessPolicies",params,undefined,false); 
			copyArg(msg,"SnapshotOptions",params,undefined,true); 
			copyArg(msg,"VPCOptions",params,undefined,true); 
			copyArg(msg,"CognitoOptions",params,undefined,true); 
			copyArg(msg,"EncryptionAtRestOptions",params,undefined,true); 
			copyArg(msg,"NodeToNodeEncryptionOptions",params,undefined,true); 
			copyArg(msg,"AdvancedOptions",params,undefined,true); 
			copyArg(msg,"LogPublishingOptions",params,undefined,true); 
			copyArg(msg,"DomainEndpointOptions",params,undefined,true); 
			copyArg(msg,"AdvancedSecurityOptions",params,undefined,true); 
			

			svc.createElasticsearchDomain(params,cb);
		}

		
		service.CreateOutboundCrossClusterSearchConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceDomainInfo",params,undefined,true); 
			copyArg(n,"DestinationDomainInfo",params,undefined,true); 
			copyArg(n,"ConnectionAlias",params,undefined,false); 
			
			copyArg(msg,"SourceDomainInfo",params,undefined,true); 
			copyArg(msg,"DestinationDomainInfo",params,undefined,true); 
			copyArg(msg,"ConnectionAlias",params,undefined,false); 
			

			svc.createOutboundCrossClusterSearchConnection(params,cb);
		}

		
		service.CreatePackage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PackageName",params,undefined,false); 
			copyArg(n,"PackageType",params,undefined,false); 
			copyArg(n,"PackageSource",params,undefined,true); 
			
			copyArg(msg,"PackageName",params,undefined,false); 
			copyArg(msg,"PackageType",params,undefined,false); 
			copyArg(msg,"PackageDescription",params,undefined,false); 
			copyArg(msg,"PackageSource",params,undefined,true); 
			

			svc.createPackage(params,cb);
		}

		
		service.DeleteElasticsearchDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.deleteElasticsearchDomain(params,cb);
		}

		
		service.DeleteElasticsearchServiceRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.deleteElasticsearchServiceRole(params,cb);
		}

		
		service.DeleteInboundCrossClusterSearchConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CrossClusterSearchConnectionId",params,undefined,false); 
			
			copyArg(msg,"CrossClusterSearchConnectionId",params,undefined,false); 
			

			svc.deleteInboundCrossClusterSearchConnection(params,cb);
		}

		
		service.DeleteOutboundCrossClusterSearchConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CrossClusterSearchConnectionId",params,undefined,false); 
			
			copyArg(msg,"CrossClusterSearchConnectionId",params,undefined,false); 
			

			svc.deleteOutboundCrossClusterSearchConnection(params,cb);
		}

		
		service.DeletePackage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PackageID",params,undefined,false); 
			
			copyArg(msg,"PackageID",params,undefined,false); 
			

			svc.deletePackage(params,cb);
		}

		
		service.DescribeElasticsearchDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.describeElasticsearchDomain(params,cb);
		}

		
		service.DescribeElasticsearchDomainConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.describeElasticsearchDomainConfig(params,cb);
		}

		
		service.DescribeElasticsearchDomains=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainNames",params,undefined,false); 
			
			copyArg(msg,"DomainNames",params,undefined,false); 
			

			svc.describeElasticsearchDomains(params,cb);
		}

		
		service.DescribeElasticsearchInstanceTypeLimits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceType",params,undefined,false); 
			copyArg(n,"ElasticsearchVersion",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"InstanceType",params,undefined,false); 
			copyArg(msg,"ElasticsearchVersion",params,undefined,false); 
			

			svc.describeElasticsearchInstanceTypeLimits(params,cb);
		}

		
		service.DescribeInboundCrossClusterSearchConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeInboundCrossClusterSearchConnections(params,cb);
		}

		
		service.DescribeOutboundCrossClusterSearchConnections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,true); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeOutboundCrossClusterSearchConnections(params,cb);
		}

		
		service.DescribePackages=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Filters",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describePackages(params,cb);
		}

		
		service.DescribeReservedElasticsearchInstanceOfferings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ReservedElasticsearchInstanceOfferingId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeReservedElasticsearchInstanceOfferings(params,cb);
		}

		
		service.DescribeReservedElasticsearchInstances=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"ReservedElasticsearchInstanceId",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeReservedElasticsearchInstances(params,cb);
		}

		
		service.DissociatePackage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PackageID",params,undefined,false); 
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"PackageID",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.dissociatePackage(params,cb);
		}

		
		service.GetCompatibleElasticsearchVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.getCompatibleElasticsearchVersions(params,cb);
		}

		
		service.GetPackageVersionHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PackageID",params,undefined,false); 
			
			copyArg(msg,"PackageID",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getPackageVersionHistory(params,cb);
		}

		
		service.GetUpgradeHistory=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.getUpgradeHistory(params,cb);
		}

		
		service.GetUpgradeStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.getUpgradeStatus(params,cb);
		}

		
		service.ListDomainNames=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.listDomainNames(params,cb);
		}

		
		service.ListDomainsForPackage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PackageID",params,undefined,false); 
			
			copyArg(msg,"PackageID",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listDomainsForPackage(params,cb);
		}

		
		service.ListElasticsearchInstanceTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ElasticsearchVersion",params,undefined,false); 
			
			copyArg(msg,"ElasticsearchVersion",params,undefined,false); 
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listElasticsearchInstanceTypes(params,cb);
		}

		
		service.ListElasticsearchVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listElasticsearchVersions(params,cb);
		}

		
		service.ListPackagesForDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listPackagesForDomain(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ARN",params,undefined,false); 
			
			copyArg(msg,"ARN",params,undefined,false); 
			

			svc.listTags(params,cb);
		}

		
		service.PurchaseReservedElasticsearchInstanceOffering=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ReservedElasticsearchInstanceOfferingId",params,undefined,false); 
			copyArg(n,"ReservationName",params,undefined,false); 
			
			copyArg(msg,"ReservedElasticsearchInstanceOfferingId",params,undefined,false); 
			copyArg(msg,"ReservationName",params,undefined,false); 
			copyArg(msg,"InstanceCount",params,undefined,false); 
			

			svc.purchaseReservedElasticsearchInstanceOffering(params,cb);
		}

		
		service.RejectInboundCrossClusterSearchConnection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CrossClusterSearchConnectionId",params,undefined,false); 
			
			copyArg(msg,"CrossClusterSearchConnectionId",params,undefined,false); 
			

			svc.rejectInboundCrossClusterSearchConnection(params,cb);
		}

		
		service.RemoveTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ARN",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,true); 
			
			copyArg(msg,"ARN",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,true); 
			

			svc.removeTags(params,cb);
		}

		
		service.StartElasticsearchServiceSoftwareUpdate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			

			svc.startElasticsearchServiceSoftwareUpdate(params,cb);
		}

		
		service.UpdateElasticsearchDomainConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"ElasticsearchClusterConfig",params,undefined,true); 
			copyArg(msg,"EBSOptions",params,undefined,true); 
			copyArg(msg,"SnapshotOptions",params,undefined,true); 
			copyArg(msg,"VPCOptions",params,undefined,true); 
			copyArg(msg,"CognitoOptions",params,undefined,true); 
			copyArg(msg,"AdvancedOptions",params,undefined,true); 
			copyArg(msg,"AccessPolicies",params,undefined,false); 
			copyArg(msg,"LogPublishingOptions",params,undefined,true); 
			copyArg(msg,"DomainEndpointOptions",params,undefined,true); 
			copyArg(msg,"AdvancedSecurityOptions",params,undefined,true); 
			

			svc.updateElasticsearchDomainConfig(params,cb);
		}

		
		service.UpdatePackage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"PackageID",params,undefined,false); 
			copyArg(n,"PackageSource",params,undefined,true); 
			
			copyArg(msg,"PackageID",params,undefined,false); 
			copyArg(msg,"PackageSource",params,undefined,true); 
			copyArg(msg,"PackageDescription",params,undefined,false); 
			copyArg(msg,"CommitMessage",params,undefined,false); 
			

			svc.updatePackage(params,cb);
		}

		
		service.UpgradeElasticsearchDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params,undefined,false); 
			copyArg(n,"TargetVersion",params,undefined,false); 
			
			copyArg(msg,"DomainName",params,undefined,false); 
			copyArg(msg,"TargetVersion",params,undefined,false); 
			copyArg(msg,"PerformCheckOnly",params,undefined,false); 
			

			svc.upgradeElasticsearchDomain(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS ES", AmazonAPINode);

};
