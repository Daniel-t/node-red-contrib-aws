
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

		var awsService = new AWS.KMS( { 'region': node.region } );

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

		
		service.CancelKeyDeletion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"KeyId",params); 
			

			svc.cancelKeyDeletion(params,cb);
		}

		
		service.CreateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasName",params); 
			copyArg(n,"TargetKeyId",params); 
			
			copyArg(msg,"AliasName",params); 
			copyArg(msg,"TargetKeyId",params); 
			

			svc.createAlias(params,cb);
		}

		
		service.CreateGrant=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			copyArg(n,"GranteePrincipal",params); 
			copyArg(n,"Operations",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"GranteePrincipal",params); 
			copyArg(msg,"RetiringPrincipal",params); 
			copyArg(msg,"Operations",params); 
			copyArg(msg,"Constraints",params); 
			copyArg(msg,"GrantTokens",params); 
			copyArg(msg,"Name",params); 
			

			svc.createGrant(params,cb);
		}

		
		service.CreateKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Policy",params); 
			copyArg(msg,"Description",params); 
			copyArg(msg,"KeyUsage",params); 
			copyArg(msg,"Origin",params); 
			copyArg(msg,"BypassPolicyLockoutSafetyCheck",params); 
			copyArg(msg,"Tags",params); 
			

			svc.createKey(params,cb);
		}

		
		service.Decrypt=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CiphertextBlob",params); 
			
			copyArg(msg,"CiphertextBlob",params); 
			copyArg(msg,"EncryptionContext",params); 
			copyArg(msg,"GrantTokens",params); 
			

			svc.decrypt(params,cb);
		}

		
		service.DeleteAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasName",params); 
			
			copyArg(msg,"AliasName",params); 
			

			svc.deleteAlias(params,cb);
		}

		
		service.DeleteImportedKeyMaterial=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"KeyId",params); 
			

			svc.deleteImportedKeyMaterial(params,cb);
		}

		
		service.DescribeKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"GrantTokens",params); 
			

			svc.describeKey(params,cb);
		}

		
		service.DisableKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"KeyId",params); 
			

			svc.disableKey(params,cb);
		}

		
		service.DisableKeyRotation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"KeyId",params); 
			

			svc.disableKeyRotation(params,cb);
		}

		
		service.EnableKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"KeyId",params); 
			

			svc.enableKey(params,cb);
		}

		
		service.EnableKeyRotation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"KeyId",params); 
			

			svc.enableKeyRotation(params,cb);
		}

		
		service.Encrypt=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			copyArg(n,"Plaintext",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"Plaintext",params); 
			copyArg(msg,"EncryptionContext",params); 
			copyArg(msg,"GrantTokens",params); 
			

			svc.encrypt(params,cb);
		}

		
		service.GenerateDataKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"EncryptionContext",params); 
			copyArg(msg,"NumberOfBytes",params); 
			copyArg(msg,"KeySpec",params); 
			copyArg(msg,"GrantTokens",params); 
			

			svc.generateDataKey(params,cb);
		}

		
		service.GenerateDataKeyWithoutPlaintext=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"EncryptionContext",params); 
			copyArg(msg,"KeySpec",params); 
			copyArg(msg,"NumberOfBytes",params); 
			copyArg(msg,"GrantTokens",params); 
			

			svc.generateDataKeyWithoutPlaintext(params,cb);
		}

		
		service.GenerateRandom=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NumberOfBytes",params); 
			

			svc.generateRandom(params,cb);
		}

		
		service.GetKeyPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			copyArg(n,"PolicyName",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"PolicyName",params); 
			

			svc.getKeyPolicy(params,cb);
		}

		
		service.GetKeyRotationStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"KeyId",params); 
			

			svc.getKeyRotationStatus(params,cb);
		}

		
		service.GetParametersForImport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			copyArg(n,"WrappingAlgorithm",params); 
			copyArg(n,"WrappingKeySpec",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"WrappingAlgorithm",params); 
			copyArg(msg,"WrappingKeySpec",params); 
			

			svc.getParametersForImport(params,cb);
		}

		
		service.ImportKeyMaterial=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			copyArg(n,"ImportToken",params); 
			copyArg(n,"EncryptedKeyMaterial",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"ImportToken",params); 
			copyArg(msg,"EncryptedKeyMaterial",params); 
			copyArg(msg,"ValidTo",params); 
			copyArg(msg,"ExpirationModel",params); 
			

			svc.importKeyMaterial(params,cb);
		}

		
		service.ListAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Limit",params); 
			copyArg(msg,"Marker",params); 
			

			svc.listAliases(params,cb);
		}

		
		service.ListGrants=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"Limit",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"KeyId",params); 
			

			svc.listGrants(params,cb);
		}

		
		service.ListKeyPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"Limit",params); 
			copyArg(msg,"Marker",params); 
			

			svc.listKeyPolicies(params,cb);
		}

		
		service.ListKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Limit",params); 
			copyArg(msg,"Marker",params); 
			

			svc.listKeys(params,cb);
		}

		
		service.ListResourceTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"Limit",params); 
			copyArg(msg,"Marker",params); 
			

			svc.listResourceTags(params,cb);
		}

		
		service.ListRetirableGrants=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RetiringPrincipal",params); 
			
			copyArg(msg,"Limit",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"RetiringPrincipal",params); 
			

			svc.listRetirableGrants(params,cb);
		}

		
		service.PutKeyPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			copyArg(n,"PolicyName",params); 
			copyArg(n,"Policy",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"PolicyName",params); 
			copyArg(msg,"Policy",params); 
			copyArg(msg,"BypassPolicyLockoutSafetyCheck",params); 
			

			svc.putKeyPolicy(params,cb);
		}

		
		service.ReEncrypt=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CiphertextBlob",params); 
			copyArg(n,"DestinationKeyId",params); 
			
			copyArg(msg,"CiphertextBlob",params); 
			copyArg(msg,"SourceEncryptionContext",params); 
			copyArg(msg,"DestinationKeyId",params); 
			copyArg(msg,"DestinationEncryptionContext",params); 
			copyArg(msg,"GrantTokens",params); 
			

			svc.reEncrypt(params,cb);
		}

		
		service.RetireGrant=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GrantToken",params); 
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"GrantId",params); 
			

			svc.retireGrant(params,cb);
		}

		
		service.RevokeGrant=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			copyArg(n,"GrantId",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"GrantId",params); 
			

			svc.revokeGrant(params,cb);
		}

		
		service.ScheduleKeyDeletion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"PendingWindowInDays",params); 
			

			svc.scheduleKeyDeletion(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			copyArg(n,"Tags",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"Tags",params); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			copyArg(n,"TagKeys",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"TagKeys",params); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasName",params); 
			copyArg(n,"TargetKeyId",params); 
			
			copyArg(msg,"AliasName",params); 
			copyArg(msg,"TargetKeyId",params); 
			

			svc.updateAlias(params,cb);
		}

		
		service.UpdateKeyDescription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params); 
			copyArg(n,"Description",params); 
			
			copyArg(msg,"KeyId",params); 
			copyArg(msg,"Description",params); 
			

			svc.updateKeyDescription(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS KMS", AmazonAPINode);

};
