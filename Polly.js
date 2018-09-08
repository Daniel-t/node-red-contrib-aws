
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

		var awsService = new AWS.Polly( { 'region': node.region } );

		node.on("input", function(msg) {
			node.sendMsg = function (err, data) {
				if (err) {
				node.status({fill:"red",shape:"ring",text:"error"});
				node.error("failed: " + err.toString(),msg);
				//return;
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

		
		service.DeleteLexicon=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,true); 
			

			svc.deleteLexicon(params,cb);
		}

		
		service.DescribeVoices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"LanguageCode",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeVoices(params,cb);
		}

		
		service.GetLexicon=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,true); 
			

			svc.getLexicon(params,cb);
		}

		
		service.ListLexicons=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listLexicons(params,cb);
		}

		
		service.PutLexicon=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,true); 
			copyArg(n,"Content",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,true); 
			copyArg(msg,"Content",params,undefined,false); 
			

			svc.putLexicon(params,cb);
		}

		
		service.SynthesizeSpeech=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OutputFormat",params,undefined,false); 
			copyArg(n,"Text",params,undefined,false); 
			copyArg(n,"VoiceId",params,undefined,false); 
			
			copyArg(msg,"LexiconNames",params,undefined,false); 
			copyArg(msg,"OutputFormat",params,undefined,false); 
			copyArg(msg,"SampleRate",params,undefined,false); 
			copyArg(msg,"SpeechMarkTypes",params,undefined,false); 
			copyArg(msg,"Text",params,undefined,false); 
			copyArg(msg,"TextType",params,undefined,false); 
			copyArg(msg,"VoiceId",params,undefined,false); 
			

			svc.synthesizeSpeech(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Polly", AmazonAPINode);

};
