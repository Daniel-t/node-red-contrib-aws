
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

		var awsService = new AWS.ES( { 'region': node.region } );

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

		
		service.AddTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ARN",params); 
			copyArg(n,"TagList",params); 
			
			copyArg(msg,"ARN",params); 
			copyArg(msg,"TagList",params); 
			

			svc.addTags(params,cb);
		}

		
		service.CreateElasticsearchDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params); 
			
			copyArg(msg,"DomainName",params); 
			copyArg(msg,"ElasticsearchVersion",params); 
			copyArg(msg,"ElasticsearchClusterConfig",params); 
			copyArg(msg,"EBSOptions",params); 
			copyArg(msg,"AccessPolicies",params); 
			copyArg(msg,"SnapshotOptions",params); 
			copyArg(msg,"VPCOptions",params); 
			copyArg(msg,"AdvancedOptions",params); 
			copyArg(msg,"LogPublishingOptions",params); 
			

			svc.createElasticsearchDomain(params,cb);
		}

		
		service.DeleteElasticsearchDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params); 
			
			copyArg(msg,"DomainName",params); 
			

			svc.deleteElasticsearchDomain(params,cb);
		}

		
		service.DeleteElasticsearchServiceRole=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.deleteElasticsearchServiceRole(params,cb);
		}

		
		service.DescribeElasticsearchDomain=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params); 
			
			copyArg(msg,"DomainName",params); 
			

			svc.describeElasticsearchDomain(params,cb);
		}

		
		service.DescribeElasticsearchDomainConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params); 
			
			copyArg(msg,"DomainName",params); 
			

			svc.describeElasticsearchDomainConfig(params,cb);
		}

		
		service.DescribeElasticsearchDomains=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainNames",params); 
			
			copyArg(msg,"DomainNames",params); 
			

			svc.describeElasticsearchDomains(params,cb);
		}

		
		service.DescribeElasticsearchInstanceTypeLimits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"InstanceType",params); 
			copyArg(n,"ElasticsearchVersion",params); 
			
			copyArg(msg,"DomainName",params); 
			copyArg(msg,"InstanceType",params); 
			copyArg(msg,"ElasticsearchVersion",params); 
			

			svc.describeElasticsearchInstanceTypeLimits(params,cb);
		}

		
		service.ListDomainNames=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.listDomainNames(params,cb);
		}

		
		service.ListElasticsearchInstanceTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ElasticsearchVersion",params); 
			
			copyArg(msg,"ElasticsearchVersion",params); 
			copyArg(msg,"DomainName",params); 
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.listElasticsearchInstanceTypes(params,cb);
		}

		
		service.ListElasticsearchVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.listElasticsearchVersions(params,cb);
		}

		
		service.ListTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ARN",params); 
			
			copyArg(msg,"ARN",params); 
			

			svc.listTags(params,cb);
		}

		
		service.RemoveTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ARN",params); 
			copyArg(n,"TagKeys",params); 
			
			copyArg(msg,"ARN",params); 
			copyArg(msg,"TagKeys",params); 
			

			svc.removeTags(params,cb);
		}

		
		service.UpdateElasticsearchDomainConfig=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"DomainName",params); 
			
			copyArg(msg,"DomainName",params); 
			copyArg(msg,"ElasticsearchClusterConfig",params); 
			copyArg(msg,"EBSOptions",params); 
			copyArg(msg,"SnapshotOptions",params); 
			copyArg(msg,"VPCOptions",params); 
			copyArg(msg,"AdvancedOptions",params); 
			copyArg(msg,"AccessPolicies",params); 
			copyArg(msg,"LogPublishingOptions",params); 
			

			svc.updateElasticsearchDomainConfig(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS ES", AmazonAPINode);

};
