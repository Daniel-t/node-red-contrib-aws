
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

		var awsService = new AWS.Rekognition( { 'region': node.region } );

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

		
		service.CompareFaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"SourceImage",params); 
			copyArg(n,"TargetImage",params); 
			
			copyArg(msg,"SourceImage",params); 
			copyArg(msg,"TargetImage",params); 
			copyArg(msg,"SimilarityThreshold",params); 
			

			svc.compareFaces(params,cb);
		}

		
		service.CreateCollection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			
			copyArg(msg,"CollectionId",params); 
			

			svc.createCollection(params,cb);
		}

		
		service.DeleteCollection=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			
			copyArg(msg,"CollectionId",params); 
			

			svc.deleteCollection(params,cb);
		}

		
		service.DeleteFaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			copyArg(n,"FaceIds",params); 
			
			copyArg(msg,"CollectionId",params); 
			copyArg(msg,"FaceIds",params); 
			

			svc.deleteFaces(params,cb);
		}

		
		service.DetectFaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Image",params); 
			
			copyArg(msg,"Image",params); 
			copyArg(msg,"Attributes",params); 
			

			svc.detectFaces(params,cb);
		}

		
		service.DetectLabels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Image",params); 
			
			copyArg(msg,"Image",params); 
			copyArg(msg,"MaxLabels",params); 
			copyArg(msg,"MinConfidence",params); 
			

			svc.detectLabels(params,cb);
		}

		
		service.DetectModerationLabels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Image",params); 
			
			copyArg(msg,"Image",params); 
			copyArg(msg,"MinConfidence",params); 
			

			svc.detectModerationLabels(params,cb);
		}

		
		service.GetCelebrityInfo=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Id",params); 
			
			copyArg(msg,"Id",params); 
			

			svc.getCelebrityInfo(params,cb);
		}

		
		service.IndexFaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			copyArg(n,"Image",params); 
			
			copyArg(msg,"CollectionId",params); 
			copyArg(msg,"Image",params); 
			copyArg(msg,"ExternalImageId",params); 
			copyArg(msg,"DetectionAttributes",params); 
			

			svc.indexFaces(params,cb);
		}

		
		service.ListCollections=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"MaxResults",params); 
			

			svc.listCollections(params,cb);
		}

		
		service.ListFaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			
			copyArg(msg,"CollectionId",params); 
			copyArg(msg,"NextToken",params); 
			copyArg(msg,"MaxResults",params); 
			

			svc.listFaces(params,cb);
		}

		
		service.RecognizeCelebrities=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Image",params); 
			
			copyArg(msg,"Image",params); 
			

			svc.recognizeCelebrities(params,cb);
		}

		
		service.SearchFaces=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			copyArg(n,"FaceId",params); 
			
			copyArg(msg,"CollectionId",params); 
			copyArg(msg,"FaceId",params); 
			copyArg(msg,"MaxFaces",params); 
			copyArg(msg,"FaceMatchThreshold",params); 
			

			svc.searchFaces(params,cb);
		}

		
		service.SearchFacesByImage=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CollectionId",params); 
			copyArg(n,"Image",params); 
			
			copyArg(msg,"CollectionId",params); 
			copyArg(msg,"Image",params); 
			copyArg(msg,"MaxFaces",params); 
			copyArg(msg,"FaceMatchThreshold",params); 
			

			svc.searchFacesByImage(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Rekognition", AmazonAPINode);

};
