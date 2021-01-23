
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

		
		service.DeleteLexicon=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.deleteLexicon(params,cb);
		}

		
		service.DescribeVoices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"LanguageCode",params,undefined,false); 
			copyArg(msg,"IncludeAdditionalLanguageCodes",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.describeVoices(params,cb);
		}

		
		service.GetLexicon=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.getLexicon(params,cb);
		}

		
		service.GetSpeechSynthesisTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"TaskId",params,undefined,false); 
			
			copyArg(msg,"TaskId",params,undefined,false); 
			

			svc.getSpeechSynthesisTask(params,cb);
		}

		
		service.ListLexicons=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NextToken",params,undefined,false); 
			

			svc.listLexicons(params,cb);
		}

		
		service.ListSpeechSynthesisTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"MaxResults",params,undefined,false); 
			copyArg(msg,"NextToken",params,undefined,false); 
			copyArg(msg,"Status",params,undefined,false); 
			

			svc.listSpeechSynthesisTasks(params,cb);
		}

		
		service.PutLexicon=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Name",params,undefined,false); 
			copyArg(n,"Content",params,undefined,true); 
			
			copyArg(msg,"Name",params,undefined,false); 
			copyArg(msg,"Content",params,undefined,true); 
			

			svc.putLexicon(params,cb);
		}

		
		service.StartSpeechSynthesisTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OutputFormat",params,undefined,false); 
			copyArg(n,"OutputS3BucketName",params,undefined,false); 
			copyArg(n,"Text",params,undefined,false); 
			copyArg(n,"VoiceId",params,undefined,false); 
			
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"LanguageCode",params,undefined,false); 
			copyArg(msg,"LexiconNames",params,undefined,true); 
			copyArg(msg,"OutputFormat",params,undefined,false); 
			copyArg(msg,"OutputS3BucketName",params,undefined,false); 
			copyArg(msg,"OutputS3KeyPrefix",params,undefined,false); 
			copyArg(msg,"SampleRate",params,undefined,false); 
			copyArg(msg,"SnsTopicArn",params,undefined,false); 
			copyArg(msg,"SpeechMarkTypes",params,undefined,true); 
			copyArg(msg,"Text",params,undefined,false); 
			copyArg(msg,"TextType",params,undefined,false); 
			copyArg(msg,"VoiceId",params,undefined,false); 
			

			svc.startSpeechSynthesisTask(params,cb);
		}

		
		service.SynthesizeSpeech=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"OutputFormat",params,undefined,false); 
			copyArg(n,"Text",params,undefined,false); 
			copyArg(n,"VoiceId",params,undefined,false); 
			
			copyArg(msg,"Engine",params,undefined,false); 
			copyArg(msg,"LanguageCode",params,undefined,false); 
			copyArg(msg,"LexiconNames",params,undefined,true); 
			copyArg(msg,"OutputFormat",params,undefined,false); 
			copyArg(msg,"SampleRate",params,undefined,false); 
			copyArg(msg,"SpeechMarkTypes",params,undefined,true); 
			copyArg(msg,"Text",params,undefined,false); 
			copyArg(msg,"TextType",params,undefined,false); 
			copyArg(msg,"VoiceId",params,undefined,false); 
			

			svc.synthesizeSpeech(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Polly", AmazonAPINode);

};
