
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

		var awsService = new AWS.Polly( { 'region': node.region } );

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

		
		service.DeleteLexicon=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params); 
			
			copyArg(msg,"Name",params); 
			

			svc.deleteLexicon(params,cb);
		}

		
		service.DescribeVoices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"LanguageCode",params); 
			copyArg(msg,"NextToken",params); 
			

			svc.describeVoices(params,cb);
		}

		
		service.GetLexicon=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params); 
			
			copyArg(msg,"Name",params); 
			

			svc.getLexicon(params,cb);
		}

		
		service.ListLexicons=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params); 
			

			svc.listLexicons(params,cb);
		}

		
		service.PutLexicon=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params); 
			copyArg(n,"Content",params); 
			
			copyArg(msg,"Name",params); 
			copyArg(msg,"Content",params); 
			

			svc.putLexicon(params,cb);
		}

		
		service.SynthesizeSpeech=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OutputFormat",params); 
			copyArg(n,"Text",params); 
			copyArg(n,"VoiceId",params); 
			
			copyArg(msg,"LexiconNames",params); 
			copyArg(msg,"OutputFormat",params); 
			copyArg(msg,"SampleRate",params); 
			copyArg(msg,"SpeechMarkTypes",params); 
			copyArg(msg,"Text",params); 
			copyArg(msg,"TextType",params); 
			copyArg(msg,"VoiceId",params); 
			

			svc.synthesizeSpeech(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Polly", AmazonAPINode);

};
