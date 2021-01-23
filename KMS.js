
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

		var awsService = new AWS.KMS( { 'region': node.region } );

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

		
		service.CancelKeyDeletion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			

			svc.cancelKeyDeletion(params,cb);
		}

		
		service.ConnectCustomKeyStore=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CustomKeyStoreId",params,undefined,false); 
			
			copyArg(msg,"CustomKeyStoreId",params,undefined,false); 
			

			svc.connectCustomKeyStore(params,cb);
		}

		
		service.CreateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasName",params,undefined,false); 
			copyArg(n,"TargetKeyId",params,undefined,false); 
			
			copyArg(msg,"AliasName",params,undefined,false); 
			copyArg(msg,"TargetKeyId",params,undefined,false); 
			

			svc.createAlias(params,cb);
		}

		
		service.CreateCustomKeyStore=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CustomKeyStoreName",params,undefined,false); 
			copyArg(n,"CloudHsmClusterId",params,undefined,false); 
			copyArg(n,"TrustAnchorCertificate",params,undefined,false); 
			copyArg(n,"KeyStorePassword",params,undefined,true); 
			
			copyArg(msg,"CustomKeyStoreName",params,undefined,false); 
			copyArg(msg,"CloudHsmClusterId",params,undefined,false); 
			copyArg(msg,"TrustAnchorCertificate",params,undefined,false); 
			copyArg(msg,"KeyStorePassword",params,undefined,true); 
			

			svc.createCustomKeyStore(params,cb);
		}

		
		service.CreateGrant=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"GranteePrincipal",params,undefined,false); 
			copyArg(n,"Operations",params,undefined,true); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"GranteePrincipal",params,undefined,false); 
			copyArg(msg,"RetiringPrincipal",params,undefined,false); 
			copyArg(msg,"Operations",params,undefined,true); 
			copyArg(msg,"Constraints",params,undefined,true); 
			copyArg(msg,"GrantTokens",params,undefined,true); 
			copyArg(msg,"Name",params,undefined,false); 
			

			svc.createGrant(params,cb);
		}

		
		service.CreateKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Policy",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			copyArg(msg,"KeyUsage",params,undefined,false); 
			copyArg(msg,"CustomerMasterKeySpec",params,undefined,false); 
			copyArg(msg,"Origin",params,undefined,false); 
			copyArg(msg,"CustomKeyStoreId",params,undefined,false); 
			copyArg(msg,"BypassPolicyLockoutSafetyCheck",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.createKey(params,cb);
		}

		
		service.Decrypt=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CiphertextBlob",params,undefined,false); 
			
			copyArg(msg,"CiphertextBlob",params,undefined,false); 
			copyArg(msg,"EncryptionContext",params,undefined,true); 
			copyArg(msg,"GrantTokens",params,undefined,true); 
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"EncryptionAlgorithm",params,undefined,false); 
			

			svc.decrypt(params,cb);
		}

		
		service.DeleteAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasName",params,undefined,false); 
			
			copyArg(msg,"AliasName",params,undefined,false); 
			

			svc.deleteAlias(params,cb);
		}

		
		service.DeleteCustomKeyStore=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CustomKeyStoreId",params,undefined,false); 
			
			copyArg(msg,"CustomKeyStoreId",params,undefined,false); 
			

			svc.deleteCustomKeyStore(params,cb);
		}

		
		service.DeleteImportedKeyMaterial=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			

			svc.deleteImportedKeyMaterial(params,cb);
		}

		
		service.DescribeCustomKeyStores=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"CustomKeyStoreId",params,undefined,false); 
			copyArg(msg,"CustomKeyStoreName",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.describeCustomKeyStores(params,cb);
		}

		
		service.DescribeKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"GrantTokens",params,undefined,true); 
			

			svc.describeKey(params,cb);
		}

		
		service.DisableKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			

			svc.disableKey(params,cb);
		}

		
		service.DisableKeyRotation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			

			svc.disableKeyRotation(params,cb);
		}

		
		service.DisconnectCustomKeyStore=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CustomKeyStoreId",params,undefined,false); 
			
			copyArg(msg,"CustomKeyStoreId",params,undefined,false); 
			

			svc.disconnectCustomKeyStore(params,cb);
		}

		
		service.EnableKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			

			svc.enableKey(params,cb);
		}

		
		service.EnableKeyRotation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			

			svc.enableKeyRotation(params,cb);
		}

		
		service.Encrypt=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"Plaintext",params,undefined,true); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"Plaintext",params,undefined,true); 
			copyArg(msg,"EncryptionContext",params,undefined,true); 
			copyArg(msg,"GrantTokens",params,undefined,true); 
			copyArg(msg,"EncryptionAlgorithm",params,undefined,false); 
			

			svc.encrypt(params,cb);
		}

		
		service.GenerateDataKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"EncryptionContext",params,undefined,true); 
			copyArg(msg,"NumberOfBytes",params,undefined,false); 
			copyArg(msg,"KeySpec",params,undefined,false); 
			copyArg(msg,"GrantTokens",params,undefined,true); 
			

			svc.generateDataKey(params,cb);
		}

		
		service.GenerateDataKeyPair=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"KeyPairSpec",params,undefined,false); 
			
			copyArg(msg,"EncryptionContext",params,undefined,true); 
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"KeyPairSpec",params,undefined,false); 
			copyArg(msg,"GrantTokens",params,undefined,true); 
			

			svc.generateDataKeyPair(params,cb);
		}

		
		service.GenerateDataKeyPairWithoutPlaintext=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"KeyPairSpec",params,undefined,false); 
			
			copyArg(msg,"EncryptionContext",params,undefined,true); 
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"KeyPairSpec",params,undefined,false); 
			copyArg(msg,"GrantTokens",params,undefined,true); 
			

			svc.generateDataKeyPairWithoutPlaintext(params,cb);
		}

		
		service.GenerateDataKeyWithoutPlaintext=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"EncryptionContext",params,undefined,true); 
			copyArg(msg,"KeySpec",params,undefined,false); 
			copyArg(msg,"NumberOfBytes",params,undefined,false); 
			copyArg(msg,"GrantTokens",params,undefined,true); 
			

			svc.generateDataKeyWithoutPlaintext(params,cb);
		}

		
		service.GenerateRandom=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"NumberOfBytes",params,undefined,false); 
			copyArg(msg,"CustomKeyStoreId",params,undefined,false); 
			

			svc.generateRandom(params,cb);
		}

		
		service.GetKeyPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			

			svc.getKeyPolicy(params,cb);
		}

		
		service.GetKeyRotationStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			

			svc.getKeyRotationStatus(params,cb);
		}

		
		service.GetParametersForImport=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"WrappingAlgorithm",params,undefined,false); 
			copyArg(n,"WrappingKeySpec",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"WrappingAlgorithm",params,undefined,false); 
			copyArg(msg,"WrappingKeySpec",params,undefined,false); 
			

			svc.getParametersForImport(params,cb);
		}

		
		service.GetPublicKey=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"GrantTokens",params,undefined,true); 
			

			svc.getPublicKey(params,cb);
		}

		
		service.ImportKeyMaterial=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"ImportToken",params,undefined,false); 
			copyArg(n,"EncryptedKeyMaterial",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"ImportToken",params,undefined,false); 
			copyArg(msg,"EncryptedKeyMaterial",params,undefined,false); 
			copyArg(msg,"ValidTo",params,undefined,false); 
			copyArg(msg,"ExpirationModel",params,undefined,false); 
			

			svc.importKeyMaterial(params,cb);
		}

		
		service.ListAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listAliases(params,cb);
		}

		
		service.ListGrants=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"GrantId",params,undefined,false); 
			copyArg(msg,"GranteePrincipal",params,undefined,false); 
			

			svc.listGrants(params,cb);
		}

		
		service.ListKeyPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listKeyPolicies(params,cb);
		}

		
		service.ListKeys=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listKeys(params,cb);
		}

		
		service.ListResourceTags=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			

			svc.listResourceTags(params,cb);
		}

		
		service.ListRetirableGrants=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"RetiringPrincipal",params,undefined,false); 
			
			copyArg(msg,"Limit",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"RetiringPrincipal",params,undefined,false); 
			

			svc.listRetirableGrants(params,cb);
		}

		
		service.PutKeyPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"PolicyName",params,undefined,false); 
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"PolicyName",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			copyArg(msg,"BypassPolicyLockoutSafetyCheck",params,undefined,false); 
			

			svc.putKeyPolicy(params,cb);
		}

		
		service.ReEncrypt=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CiphertextBlob",params,undefined,false); 
			copyArg(n,"DestinationKeyId",params,undefined,false); 
			
			copyArg(msg,"CiphertextBlob",params,undefined,false); 
			copyArg(msg,"SourceEncryptionContext",params,undefined,true); 
			copyArg(msg,"SourceKeyId",params,undefined,false); 
			copyArg(msg,"DestinationKeyId",params,undefined,false); 
			copyArg(msg,"DestinationEncryptionContext",params,undefined,true); 
			copyArg(msg,"SourceEncryptionAlgorithm",params,undefined,false); 
			copyArg(msg,"DestinationEncryptionAlgorithm",params,undefined,false); 
			copyArg(msg,"GrantTokens",params,undefined,true); 
			

			svc.reEncrypt(params,cb);
		}

		
		service.RetireGrant=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"GrantToken",params,undefined,false); 
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"GrantId",params,undefined,false); 
			

			svc.retireGrant(params,cb);
		}

		
		service.RevokeGrant=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"GrantId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"GrantId",params,undefined,false); 
			

			svc.revokeGrant(params,cb);
		}

		
		service.ScheduleKeyDeletion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"PendingWindowInDays",params,undefined,false); 
			

			svc.scheduleKeyDeletion(params,cb);
		}

		
		service.Sign=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"Message",params,undefined,true); 
			copyArg(n,"SigningAlgorithm",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"Message",params,undefined,true); 
			copyArg(msg,"MessageType",params,undefined,false); 
			copyArg(msg,"GrantTokens",params,undefined,true); 
			copyArg(msg,"SigningAlgorithm",params,undefined,false); 
			

			svc.sign(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"Tags",params,undefined,true); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"Tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"TagKeys",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"TagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"AliasName",params,undefined,false); 
			copyArg(n,"TargetKeyId",params,undefined,false); 
			
			copyArg(msg,"AliasName",params,undefined,false); 
			copyArg(msg,"TargetKeyId",params,undefined,false); 
			

			svc.updateAlias(params,cb);
		}

		
		service.UpdateCustomKeyStore=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"CustomKeyStoreId",params,undefined,false); 
			
			copyArg(msg,"CustomKeyStoreId",params,undefined,false); 
			copyArg(msg,"NewCustomKeyStoreName",params,undefined,false); 
			copyArg(msg,"KeyStorePassword",params,undefined,true); 
			copyArg(msg,"CloudHsmClusterId",params,undefined,false); 
			

			svc.updateCustomKeyStore(params,cb);
		}

		
		service.UpdateKeyDescription=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"Description",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"Description",params,undefined,false); 
			

			svc.updateKeyDescription(params,cb);
		}

		
		service.Verify=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"KeyId",params,undefined,false); 
			copyArg(n,"Message",params,undefined,true); 
			copyArg(n,"Signature",params,undefined,false); 
			copyArg(n,"SigningAlgorithm",params,undefined,false); 
			
			copyArg(msg,"KeyId",params,undefined,false); 
			copyArg(msg,"Message",params,undefined,true); 
			copyArg(msg,"MessageType",params,undefined,false); 
			copyArg(msg,"Signature",params,undefined,false); 
			copyArg(msg,"SigningAlgorithm",params,undefined,false); 
			copyArg(msg,"GrantTokens",params,undefined,true); 
			

			svc.verify(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS KMS", AmazonAPINode);

};
