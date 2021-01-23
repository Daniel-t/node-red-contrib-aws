
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

		var awsService = new AWS.ResourceGroupsTaggingAPI( { 'region': node.region } );

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

		
		service.DescribeReportCreation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeReportCreation(params,cb);
		}

		
		service.GetComplianceSummary=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"TargetIdFilters",params,undefined,false); 
			copyArg(msg,"RegionFilters",params,undefined,false); 
			copyArg(msg,"ResourceTypeFilters",params,undefined,true); 
			copyArg(msg,"TagKeyFilters",params,undefined,false); 
			copyArg(msg,"GroupBy",params,undefined,false); 
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"PaginationToken",params,undefined,false); 
			

			svc.getComplianceSummary(params,cb);
		}

		
		service.GetResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PaginationToken",params,undefined,false); 
			copyArg(msg,"TagFilters",params,undefined,false); 
			copyArg(msg,"ResourcesPerPage",params,undefined,false); 
			copyArg(msg,"TagsPerPage",params,undefined,false); 
			copyArg(msg,"ResourceTypeFilters",params,undefined,true); 
			copyArg(msg,"IncludeComplianceDetails",params,undefined,false); 
			copyArg(msg,"ExcludeCompliantResources",params,undefined,false); 
			

			svc.getResources(params,cb);
		}

		
		service.GetTagKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"PaginationToken",params,undefined,false); 
			

			svc.getTagKeys(params,cb);
		}

		
		service.GetTagValues=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"PaginationToken",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			

			svc.getTagValues(params,cb);
		}

		
		service.StartReportCreation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"S3Bucket",params,undefined,false); 
			
			copyArg(msg,"S3Bucket",params,undefined,false); 
			

			svc.startReportCreation(params,cb);
		}

		
		service.TagResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARNList",params,undefined,true); 
			copyArg(n,"Tags",params,undefined,false); 
			
			copyArg(msg,"ResourceARNList",params,undefined,true); 
			copyArg(msg,"Tags",params,undefined,false); 
			

			svc.tagResources(params,cb);
		}

		
		service.UntagResources=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ResourceARNList",params,undefined,true); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"ResourceARNList",params,undefined,true); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResources(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS ResourceGroupsTaggingAPI", AmazonAPINode);

};
