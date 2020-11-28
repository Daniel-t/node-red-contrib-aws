
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

		var awsService = new AWS.Rekognition( { 'region': node.region } );

		node.on("input", function(msg) {
			node.sendMsg = function (err, data, msg) {
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

			if (typeof service[node.operation] == "function"){

				node.status({fill:"blue",shape:"dot",text:node.operation});
				service[node.operation](awsService,msg,function(err,data){
  				node.sendMsg(err, data, msg);
  			});
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


		service.CompareFaces=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"SourceImage",params,undefined,true);
			copyArg(n,"TargetImage",params,undefined,true);

			copyArg(msg,"SourceImage",params,undefined,true);
			copyArg(msg,"TargetImage",params,undefined,true);
			copyArg(msg,"SimilarityThreshold",params,undefined,false);


			svc.compareFaces(params,cb);
		}


		service.CreateCollection=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"CollectionId",params,undefined,false);

			copyArg(msg,"CollectionId",params,undefined,false);


			svc.createCollection(params,cb);
		}


		service.CreateStreamProcessor=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Input",params,undefined,true);
			copyArg(n,"Output",params,undefined,true);
			copyArg(n,"Name",params,undefined,false);
			copyArg(n,"Settings",params,undefined,true);
			copyArg(n,"RoleArn",params,undefined,false);

			copyArg(msg,"Input",params,undefined,true);
			copyArg(msg,"Output",params,undefined,true);
			copyArg(msg,"Name",params,undefined,false);
			copyArg(msg,"Settings",params,undefined,true);
			copyArg(msg,"RoleArn",params,undefined,false);


			svc.createStreamProcessor(params,cb);
		}


		service.DeleteCollection=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"CollectionId",params,undefined,false);

			copyArg(msg,"CollectionId",params,undefined,false);


			svc.deleteCollection(params,cb);
		}


		service.DeleteFaces=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"CollectionId",params,undefined,false);
			copyArg(n,"FaceIds",params,undefined,true);

			copyArg(msg,"CollectionId",params,undefined,false);
			copyArg(msg,"FaceIds",params,undefined,true);


			svc.deleteFaces(params,cb);
		}


		service.DeleteStreamProcessor=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Name",params,undefined,false);

			copyArg(msg,"Name",params,undefined,false);


			svc.deleteStreamProcessor(params,cb);
		}


		service.DescribeCollection=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"CollectionId",params,undefined,false);

			copyArg(msg,"CollectionId",params,undefined,false);


			svc.describeCollection(params,cb);
		}


		service.DescribeStreamProcessor=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Name",params,undefined,false);

			copyArg(msg,"Name",params,undefined,false);


			svc.describeStreamProcessor(params,cb);
		}


		service.DetectFaces=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Image",params,undefined,true);

			copyArg(msg,"Image",params,undefined,true);
			copyArg(msg,"Attributes",params,undefined,true);


			svc.detectFaces(params,cb);
		}


		service.DetectLabels=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Image",params,undefined,true);

			copyArg(msg,"Image",params,undefined,true);
			copyArg(msg,"MaxLabels",params,undefined,false);
			copyArg(msg,"MinConfidence",params,undefined,false);


			svc.detectLabels(params,cb);
		}


		service.DetectModerationLabels=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Image",params,undefined,true);

			copyArg(msg,"Image",params,undefined,true);
			copyArg(msg,"MinConfidence",params,undefined,false);


			svc.detectModerationLabels(params,cb);
		}


		service.DetectText=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Image",params,undefined,true);

			copyArg(msg,"Image",params,undefined,true);


			svc.detectText(params,cb);
		}


		service.GetCelebrityInfo=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Id",params,undefined,false);

			copyArg(msg,"Id",params,undefined,false);


			svc.getCelebrityInfo(params,cb);
		}


		service.GetCelebrityRecognition=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"JobId",params,undefined,false);

			copyArg(msg,"JobId",params,undefined,false);
			copyArg(msg,"MaxResults",params,undefined,false);
			copyArg(msg,"NextToken",params,undefined,false);
			copyArg(msg,"SortBy",params,undefined,false);


			svc.getCelebrityRecognition(params,cb);
		}


		service.GetContentModeration=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"JobId",params,undefined,false);

			copyArg(msg,"JobId",params,undefined,false);
			copyArg(msg,"MaxResults",params,undefined,false);
			copyArg(msg,"NextToken",params,undefined,false);
			copyArg(msg,"SortBy",params,undefined,false);


			svc.getContentModeration(params,cb);
		}


		service.GetFaceDetection=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"JobId",params,undefined,false);

			copyArg(msg,"JobId",params,undefined,false);
			copyArg(msg,"MaxResults",params,undefined,false);
			copyArg(msg,"NextToken",params,undefined,false);


			svc.getFaceDetection(params,cb);
		}


		service.GetFaceSearch=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"JobId",params,undefined,false);

			copyArg(msg,"JobId",params,undefined,false);
			copyArg(msg,"MaxResults",params,undefined,false);
			copyArg(msg,"NextToken",params,undefined,false);
			copyArg(msg,"SortBy",params,undefined,false);


			svc.getFaceSearch(params,cb);
		}


		service.GetLabelDetection=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"JobId",params,undefined,false);

			copyArg(msg,"JobId",params,undefined,false);
			copyArg(msg,"MaxResults",params,undefined,false);
			copyArg(msg,"NextToken",params,undefined,false);
			copyArg(msg,"SortBy",params,undefined,false);


			svc.getLabelDetection(params,cb);
		}


		service.GetPersonTracking=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"JobId",params,undefined,false);

			copyArg(msg,"JobId",params,undefined,false);
			copyArg(msg,"MaxResults",params,undefined,false);
			copyArg(msg,"NextToken",params,undefined,false);
			copyArg(msg,"SortBy",params,undefined,false);


			svc.getPersonTracking(params,cb);
		}


		service.IndexFaces=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"CollectionId",params,undefined,false);
			copyArg(n,"Image",params,undefined,true);

			copyArg(msg,"CollectionId",params,undefined,false);
			copyArg(msg,"Image",params,undefined,true);
			copyArg(msg,"ExternalImageId",params,undefined,false);
			copyArg(msg,"DetectionAttributes",params,undefined,true);
			copyArg(msg,"MaxFaces",params,undefined,false);
			copyArg(msg,"QualityFilter",params,undefined,false);


			svc.indexFaces(params,cb);
		}


		service.ListCollections=function(svc,msg,cb){
			var params={};
			//copyArgs


			copyArg(msg,"NextToken",params,undefined,false);
			copyArg(msg,"MaxResults",params,undefined,false);


			svc.listCollections(params,cb);
		}


		service.ListFaces=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"CollectionId",params,undefined,false);

			copyArg(msg,"CollectionId",params,undefined,false);
			copyArg(msg,"NextToken",params,undefined,false);
			copyArg(msg,"MaxResults",params,undefined,false);


			svc.listFaces(params,cb);
		}


		service.ListStreamProcessors=function(svc,msg,cb){
			var params={};
			//copyArgs


			copyArg(msg,"NextToken",params,undefined,false);
			copyArg(msg,"MaxResults",params,undefined,false);


			svc.listStreamProcessors(params,cb);
		}


		service.RecognizeCelebrities=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Image",params,undefined,true);

			copyArg(msg,"Image",params,undefined,true);


			svc.recognizeCelebrities(params,cb);
		}


		service.SearchFaces=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"CollectionId",params,undefined,false);
			copyArg(n,"FaceId",params,undefined,false);

			copyArg(msg,"CollectionId",params,undefined,false);
			copyArg(msg,"FaceId",params,undefined,false);
			copyArg(msg,"MaxFaces",params,undefined,false);
			copyArg(msg,"FaceMatchThreshold",params,undefined,false);


			svc.searchFaces(params,cb);
		}


		service.SearchFacesByImage=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"CollectionId",params,undefined,false);
			copyArg(n,"Image",params,undefined,true);

			copyArg(msg,"CollectionId",params,undefined,false);
			copyArg(msg,"Image",params,undefined,true);
			copyArg(msg,"MaxFaces",params,undefined,false);
			copyArg(msg,"FaceMatchThreshold",params,undefined,false);


			svc.searchFacesByImage(params,cb);
		}


		service.StartCelebrityRecognition=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Video",params,undefined,true);

			copyArg(msg,"Video",params,undefined,true);
			copyArg(msg,"ClientRequestToken",params,undefined,false);
			copyArg(msg,"NotificationChannel",params,undefined,true);
			copyArg(msg,"JobTag",params,undefined,false);


			svc.startCelebrityRecognition(params,cb);
		}


		service.StartContentModeration=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Video",params,undefined,true);

			copyArg(msg,"Video",params,undefined,true);
			copyArg(msg,"MinConfidence",params,undefined,false);
			copyArg(msg,"ClientRequestToken",params,undefined,false);
			copyArg(msg,"NotificationChannel",params,undefined,true);
			copyArg(msg,"JobTag",params,undefined,false);


			svc.startContentModeration(params,cb);
		}


		service.StartFaceDetection=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Video",params,undefined,true);

			copyArg(msg,"Video",params,undefined,true);
			copyArg(msg,"ClientRequestToken",params,undefined,false);
			copyArg(msg,"NotificationChannel",params,undefined,true);
			copyArg(msg,"FaceAttributes",params,undefined,false);
			copyArg(msg,"JobTag",params,undefined,false);


			svc.startFaceDetection(params,cb);
		}


		service.StartFaceSearch=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Video",params,undefined,true);
			copyArg(n,"CollectionId",params,undefined,false);

			copyArg(msg,"Video",params,undefined,true);
			copyArg(msg,"ClientRequestToken",params,undefined,false);
			copyArg(msg,"FaceMatchThreshold",params,undefined,false);
			copyArg(msg,"CollectionId",params,undefined,false);
			copyArg(msg,"NotificationChannel",params,undefined,true);
			copyArg(msg,"JobTag",params,undefined,false);


			svc.startFaceSearch(params,cb);
		}


		service.StartLabelDetection=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Video",params,undefined,true);

			copyArg(msg,"Video",params,undefined,true);
			copyArg(msg,"ClientRequestToken",params,undefined,false);
			copyArg(msg,"MinConfidence",params,undefined,false);
			copyArg(msg,"NotificationChannel",params,undefined,true);
			copyArg(msg,"JobTag",params,undefined,false);


			svc.startLabelDetection(params,cb);
		}


		service.StartPersonTracking=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Video",params,undefined,true);

			copyArg(msg,"Video",params,undefined,true);
			copyArg(msg,"ClientRequestToken",params,undefined,false);
			copyArg(msg,"NotificationChannel",params,undefined,true);
			copyArg(msg,"JobTag",params,undefined,false);


			svc.startPersonTracking(params,cb);
		}


		service.StartStreamProcessor=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Name",params,undefined,false);

			copyArg(msg,"Name",params,undefined,false);


			svc.startStreamProcessor(params,cb);
		}


		service.StopStreamProcessor=function(svc,msg,cb){
			var params={};
			//copyArgs

			copyArg(n,"Name",params,undefined,false);

			copyArg(msg,"Name",params,undefined,false);


			svc.stopStreamProcessor(params,cb);
		}



	}
	RED.nodes.registerType("AWS Rekognition", AmazonAPINode);

};
