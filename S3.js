
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

		var awsService = new AWS.S3( { 'region': node.region } );

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

		
		service.AbortMultipartUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			copyArg(n,"UploadId",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"UploadId",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.abortMultipartUpload(params,cb);
		}

		
		service.CompleteMultipartUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			copyArg(n,"UploadId",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"MultipartUpload",params,undefined,false); 
			copyArg(msg,"UploadId",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.completeMultipartUpload(params,cb);
		}

		
		service.CopyObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"CopySource",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"ACL",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"CacheControl",params,undefined,false); 
			copyArg(msg,"ContentDisposition",params,undefined,false); 
			copyArg(msg,"ContentEncoding",params,undefined,false); 
			copyArg(msg,"ContentLanguage",params,undefined,false); 
			copyArg(msg,"ContentType",params,undefined,false); 
			copyArg(msg,"CopySource",params,undefined,false); 
			copyArg(msg,"CopySourceIfMatch",params,undefined,false); 
			copyArg(msg,"CopySourceIfModifiedSince",params,undefined,false); 
			copyArg(msg,"CopySourceIfNoneMatch",params,undefined,false); 
			copyArg(msg,"CopySourceIfUnmodifiedSince",params,undefined,false); 
			copyArg(msg,"Expires",params,undefined,false); 
			copyArg(msg,"GrantFullControl",params,undefined,false); 
			copyArg(msg,"GrantRead",params,undefined,false); 
			copyArg(msg,"GrantReadACP",params,undefined,false); 
			copyArg(msg,"GrantWriteACP",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"Metadata",params,undefined,true); 
			copyArg(msg,"MetadataDirective",params,undefined,false); 
			copyArg(msg,"TaggingDirective",params,undefined,false); 
			copyArg(msg,"ServerSideEncryption",params,undefined,false); 
			copyArg(msg,"StorageClass",params,undefined,false); 
			copyArg(msg,"WebsiteRedirectLocation",params,undefined,false); 
			copyArg(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArg(msg,"SSECustomerKey",params,undefined,true); 
			copyArg(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArg(msg,"SSEKMSKeyId",params,undefined,true); 
			copyArg(msg,"SSEKMSEncryptionContext",params,undefined,true); 
			copyArg(msg,"BucketKeyEnabled",params,undefined,false); 
			copyArg(msg,"CopySourceSSECustomerAlgorithm",params,undefined,false); 
			copyArg(msg,"CopySourceSSECustomerKey",params,undefined,true); 
			copyArg(msg,"CopySourceSSECustomerKeyMD5",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"Tagging",params,undefined,false); 
			copyArg(msg,"ObjectLockMode",params,undefined,false); 
			copyArg(msg,"ObjectLockRetainUntilDate",params,undefined,true); 
			copyArg(msg,"ObjectLockLegalHoldStatus",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			copyArg(msg,"ExpectedSourceBucketOwner",params,undefined,false); 
			

			svc.copyObject(params,cb);
		}

		
		service.CreateBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"ACL",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"CreateBucketConfiguration",params,undefined,false); 
			copyArg(msg,"GrantFullControl",params,undefined,false); 
			copyArg(msg,"GrantRead",params,undefined,false); 
			copyArg(msg,"GrantReadACP",params,undefined,false); 
			copyArg(msg,"GrantWrite",params,undefined,false); 
			copyArg(msg,"GrantWriteACP",params,undefined,false); 
			copyArg(msg,"ObjectLockEnabledForBucket",params,undefined,false); 
			

			svc.createBucket(params,cb);
		}

		
		service.CreateMultipartUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"ACL",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"CacheControl",params,undefined,false); 
			copyArg(msg,"ContentDisposition",params,undefined,false); 
			copyArg(msg,"ContentEncoding",params,undefined,false); 
			copyArg(msg,"ContentLanguage",params,undefined,false); 
			copyArg(msg,"ContentType",params,undefined,false); 
			copyArg(msg,"Expires",params,undefined,false); 
			copyArg(msg,"GrantFullControl",params,undefined,false); 
			copyArg(msg,"GrantRead",params,undefined,false); 
			copyArg(msg,"GrantReadACP",params,undefined,false); 
			copyArg(msg,"GrantWriteACP",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"Metadata",params,undefined,true); 
			copyArg(msg,"ServerSideEncryption",params,undefined,false); 
			copyArg(msg,"StorageClass",params,undefined,false); 
			copyArg(msg,"WebsiteRedirectLocation",params,undefined,false); 
			copyArg(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArg(msg,"SSECustomerKey",params,undefined,true); 
			copyArg(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArg(msg,"SSEKMSKeyId",params,undefined,true); 
			copyArg(msg,"SSEKMSEncryptionContext",params,undefined,true); 
			copyArg(msg,"BucketKeyEnabled",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"Tagging",params,undefined,false); 
			copyArg(msg,"ObjectLockMode",params,undefined,false); 
			copyArg(msg,"ObjectLockRetainUntilDate",params,undefined,true); 
			copyArg(msg,"ObjectLockLegalHoldStatus",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.createMultipartUpload(params,cb);
		}

		
		service.DeleteBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucket(params,cb);
		}

		
		service.DeleteBucketAnalyticsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketAnalyticsConfiguration(params,cb);
		}

		
		service.DeleteBucketCors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketCors(params,cb);
		}

		
		service.DeleteBucketEncryption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketEncryption(params,cb);
		}

		
		service.DeleteBucketIntelligentTieringConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.deleteBucketIntelligentTieringConfiguration(params,cb);
		}

		
		service.DeleteBucketInventoryConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketInventoryConfiguration(params,cb);
		}

		
		service.DeleteBucketLifecycle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketLifecycle(params,cb);
		}

		
		service.DeleteBucketMetricsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketMetricsConfiguration(params,cb);
		}

		
		service.DeleteBucketOwnershipControls=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketOwnershipControls(params,cb);
		}

		
		service.DeleteBucketPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketPolicy(params,cb);
		}

		
		service.DeleteBucketReplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketReplication(params,cb);
		}

		
		service.DeleteBucketTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketTagging(params,cb);
		}

		
		service.DeleteBucketWebsite=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteBucketWebsite(params,cb);
		}

		
		service.DeleteObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"MFA",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"BypassGovernanceRetention",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteObject(params,cb);
		}

		
		service.DeleteObjectTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteObjectTagging(params,cb);
		}

		
		service.DeleteObjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Delete",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Delete",params,undefined,false); 
			copyArg(msg,"MFA",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"BypassGovernanceRetention",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deleteObjects(params,cb);
		}

		
		service.DeletePublicAccessBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.deletePublicAccessBlock(params,cb);
		}

		
		service.GetBucketAccelerateConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketAccelerateConfiguration(params,cb);
		}

		
		service.GetBucketAcl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketAcl(params,cb);
		}

		
		service.GetBucketAnalyticsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketAnalyticsConfiguration(params,cb);
		}

		
		service.GetBucketCors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketCors(params,cb);
		}

		
		service.GetBucketEncryption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketEncryption(params,cb);
		}

		
		service.GetBucketIntelligentTieringConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			

			svc.getBucketIntelligentTieringConfiguration(params,cb);
		}

		
		service.GetBucketInventoryConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketInventoryConfiguration(params,cb);
		}

		
		service.GetBucketLifecycle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketLifecycle(params,cb);
		}

		
		service.GetBucketLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketLifecycleConfiguration(params,cb);
		}

		
		service.GetBucketLocation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketLocation(params,cb);
		}

		
		service.GetBucketLogging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketLogging(params,cb);
		}

		
		service.GetBucketMetricsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketMetricsConfiguration(params,cb);
		}

		
		service.GetBucketNotification=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			
			copyArg(msg,"Bucket",params,undefined,true); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,true); 

			svc.getBucketNotification(params,cb);
		}

		
		service.GetBucketNotificationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			
			copyArg(msg,"Bucket",params,undefined,true); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,true); 

			svc.getBucketNotificationConfiguration(params,cb);
		}

		
		service.GetBucketOwnershipControls=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketOwnershipControls(params,cb);
		}

		
		service.GetBucketPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketPolicy(params,cb);
		}

		
		service.GetBucketPolicyStatus=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketPolicyStatus(params,cb);
		}

		
		service.GetBucketReplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketReplication(params,cb);
		}

		
		service.GetBucketRequestPayment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketRequestPayment(params,cb);
		}

		
		service.GetBucketTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketTagging(params,cb);
		}

		
		service.GetBucketVersioning=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketVersioning(params,cb);
		}

		
		service.GetBucketWebsite=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getBucketWebsite(params,cb);
		}

		
		service.GetObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			copyArg(msg,"IfModifiedSince",params,undefined,false); 
			copyArg(msg,"IfNoneMatch",params,undefined,false); 
			copyArg(msg,"IfUnmodifiedSince",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"Range",params,undefined,false); 
			copyArg(msg,"ResponseCacheControl",params,undefined,false); 
			copyArg(msg,"ResponseContentDisposition",params,undefined,false); 
			copyArg(msg,"ResponseContentEncoding",params,undefined,false); 
			copyArg(msg,"ResponseContentLanguage",params,undefined,false); 
			copyArg(msg,"ResponseContentType",params,undefined,false); 
			copyArg(msg,"ResponseExpires",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArg(msg,"SSECustomerKey",params,undefined,true); 
			copyArg(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"PartNumber",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getObject(params,cb);
		}

		
		service.GetObjectAcl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getObjectAcl(params,cb);
		}

		
		service.GetObjectLegalHold=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getObjectLegalHold(params,cb);
		}

		
		service.GetObjectLockConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getObjectLockConfiguration(params,cb);
		}

		
		service.GetObjectRetention=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getObjectRetention(params,cb);
		}

		
		service.GetObjectTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getObjectTagging(params,cb);
		}

		
		service.GetObjectTorrent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getObjectTorrent(params,cb);
		}

		
		service.GetPublicAccessBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.getPublicAccessBlock(params,cb);
		}

		
		service.HeadBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.headBucket(params,cb);
		}

		
		service.HeadObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"IfMatch",params,undefined,false); 
			copyArg(msg,"IfModifiedSince",params,undefined,false); 
			copyArg(msg,"IfNoneMatch",params,undefined,false); 
			copyArg(msg,"IfUnmodifiedSince",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"Range",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArg(msg,"SSECustomerKey",params,undefined,true); 
			copyArg(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"PartNumber",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.headObject(params,cb);
		}

		
		service.ListBucketAnalyticsConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContinuationToken",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listBucketAnalyticsConfigurations(params,cb);
		}

		
		service.ListBucketIntelligentTieringConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContinuationToken",params,undefined,false); 
			

			svc.listBucketIntelligentTieringConfigurations(params,cb);
		}

		
		service.ListBucketInventoryConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContinuationToken",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listBucketInventoryConfigurations(params,cb);
		}

		
		service.ListBucketMetricsConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContinuationToken",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listBucketMetricsConfigurations(params,cb);
		}

		
		service.ListBuckets=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.listBuckets(params,cb);
		}

		
		service.ListMultipartUploads=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Delimiter",params,undefined,false); 
			copyArg(msg,"EncodingType",params,undefined,false); 
			copyArg(msg,"KeyMarker",params,undefined,false); 
			copyArg(msg,"MaxUploads",params,undefined,false); 
			copyArg(msg,"Prefix",params,undefined,false); 
			copyArg(msg,"UploadIdMarker",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listMultipartUploads(params,cb);
		}

		
		service.ListObjectVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Delimiter",params,undefined,false); 
			copyArg(msg,"EncodingType",params,undefined,false); 
			copyArg(msg,"KeyMarker",params,undefined,false); 
			copyArg(msg,"MaxKeys",params,undefined,false); 
			copyArg(msg,"Prefix",params,undefined,false); 
			copyArg(msg,"VersionIdMarker",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listObjectVersions(params,cb);
		}

		
		service.ListObjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Delimiter",params,undefined,false); 
			copyArg(msg,"EncodingType",params,undefined,false); 
			copyArg(msg,"Marker",params,undefined,false); 
			copyArg(msg,"MaxKeys",params,undefined,false); 
			copyArg(msg,"Prefix",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listObjects(params,cb);
		}

		
		service.ListObjectsV2=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Delimiter",params,undefined,false); 
			copyArg(msg,"EncodingType",params,undefined,false); 
			copyArg(msg,"MaxKeys",params,undefined,false); 
			copyArg(msg,"Prefix",params,undefined,false); 
			copyArg(msg,"ContinuationToken",params,undefined,false); 
			copyArg(msg,"FetchOwner",params,undefined,false); 
			copyArg(msg,"StartAfter",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listObjectsV2(params,cb);
		}

		
		service.ListParts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			copyArg(n,"UploadId",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"MaxParts",params,undefined,false); 
			copyArg(msg,"PartNumberMarker",params,undefined,false); 
			copyArg(msg,"UploadId",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.listParts(params,cb);
		}

		
		service.PutBucketAccelerateConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"AccelerateConfiguration",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"AccelerateConfiguration",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketAccelerateConfiguration(params,cb);
		}

		
		service.PutBucketAcl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"ACL",params,undefined,false); 
			copyArg(msg,"AccessControlPolicy",params,undefined,true); 
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"GrantFullControl",params,undefined,false); 
			copyArg(msg,"GrantRead",params,undefined,false); 
			copyArg(msg,"GrantReadACP",params,undefined,false); 
			copyArg(msg,"GrantWrite",params,undefined,false); 
			copyArg(msg,"GrantWriteACP",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketAcl(params,cb);
		}

		
		service.PutBucketAnalyticsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"AnalyticsConfiguration",params,undefined,true); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"AnalyticsConfiguration",params,undefined,true); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketAnalyticsConfiguration(params,cb);
		}

		
		service.PutBucketCors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"CORSConfiguration",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"CORSConfiguration",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketCors(params,cb);
		}

		
		service.PutBucketEncryption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"ServerSideEncryptionConfiguration",params,undefined,true); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"ServerSideEncryptionConfiguration",params,undefined,true); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketEncryption(params,cb);
		}

		
		service.PutBucketIntelligentTieringConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"IntelligentTieringConfiguration",params,undefined,true); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"IntelligentTieringConfiguration",params,undefined,true); 
			

			svc.putBucketIntelligentTieringConfiguration(params,cb);
		}

		
		service.PutBucketInventoryConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"InventoryConfiguration",params,undefined,true); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"InventoryConfiguration",params,undefined,true); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketInventoryConfiguration(params,cb);
		}

		
		service.PutBucketLifecycle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"LifecycleConfiguration",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketLifecycle(params,cb);
		}

		
		service.PutBucketLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"LifecycleConfiguration",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketLifecycleConfiguration(params,cb);
		}

		
		service.PutBucketLogging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"BucketLoggingStatus",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"BucketLoggingStatus",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketLogging(params,cb);
		}

		
		service.PutBucketMetricsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Id",params,undefined,false); 
			copyArg(n,"MetricsConfiguration",params,undefined,true); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Id",params,undefined,false); 
			copyArg(msg,"MetricsConfiguration",params,undefined,true); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketMetricsConfiguration(params,cb);
		}

		
		service.PutBucketNotification=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"NotificationConfiguration",params,undefined,true); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"NotificationConfiguration",params,undefined,true); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketNotification(params,cb);
		}

		
		service.PutBucketNotificationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"NotificationConfiguration",params,undefined,true); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"NotificationConfiguration",params,undefined,true); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketNotificationConfiguration(params,cb);
		}

		
		service.PutBucketOwnershipControls=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"OwnershipControls",params,undefined,true); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			copyArg(msg,"OwnershipControls",params,undefined,true); 
			

			svc.putBucketOwnershipControls(params,cb);
		}

		
		service.PutBucketPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Policy",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"ConfirmRemoveSelfBucketAccess",params,undefined,false); 
			copyArg(msg,"Policy",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketPolicy(params,cb);
		}

		
		service.PutBucketReplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"ReplicationConfiguration",params,undefined,true); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"ReplicationConfiguration",params,undefined,true); 
			copyArg(msg,"Token",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketReplication(params,cb);
		}

		
		service.PutBucketRequestPayment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"RequestPaymentConfiguration",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"RequestPaymentConfiguration",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketRequestPayment(params,cb);
		}

		
		service.PutBucketTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Tagging",params,undefined,true); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"Tagging",params,undefined,true); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketTagging(params,cb);
		}

		
		service.PutBucketVersioning=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"VersioningConfiguration",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"MFA",params,undefined,false); 
			copyArg(msg,"VersioningConfiguration",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketVersioning(params,cb);
		}

		
		service.PutBucketWebsite=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"WebsiteConfiguration",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"WebsiteConfiguration",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putBucketWebsite(params,cb);
		}

		
		service.PutObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"ACL",params,undefined,false); 
			copyArg(msg,"Body",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"CacheControl",params,undefined,false); 
			copyArg(msg,"ContentDisposition",params,undefined,false); 
			copyArg(msg,"ContentEncoding",params,undefined,false); 
			copyArg(msg,"ContentLanguage",params,undefined,false); 
			copyArg(msg,"ContentLength",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"ContentType",params,undefined,false); 
			copyArg(msg,"Expires",params,undefined,false); 
			copyArg(msg,"GrantFullControl",params,undefined,false); 
			copyArg(msg,"GrantRead",params,undefined,false); 
			copyArg(msg,"GrantReadACP",params,undefined,false); 
			copyArg(msg,"GrantWriteACP",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"Metadata",params,undefined,true); 
			copyArg(msg,"ServerSideEncryption",params,undefined,false); 
			copyArg(msg,"StorageClass",params,undefined,false); 
			copyArg(msg,"WebsiteRedirectLocation",params,undefined,false); 
			copyArg(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArg(msg,"SSECustomerKey",params,undefined,true); 
			copyArg(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArg(msg,"SSEKMSKeyId",params,undefined,true); 
			copyArg(msg,"SSEKMSEncryptionContext",params,undefined,true); 
			copyArg(msg,"BucketKeyEnabled",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"Tagging",params,undefined,false); 
			copyArg(msg,"ObjectLockMode",params,undefined,false); 
			copyArg(msg,"ObjectLockRetainUntilDate",params,undefined,true); 
			copyArg(msg,"ObjectLockLegalHoldStatus",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putObject(params,cb);
		}

		
		service.PutObjectAcl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"ACL",params,undefined,false); 
			copyArg(msg,"AccessControlPolicy",params,undefined,true); 
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"GrantFullControl",params,undefined,false); 
			copyArg(msg,"GrantRead",params,undefined,false); 
			copyArg(msg,"GrantReadACP",params,undefined,false); 
			copyArg(msg,"GrantWrite",params,undefined,false); 
			copyArg(msg,"GrantWriteACP",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putObjectAcl(params,cb);
		}

		
		service.PutObjectLegalHold=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"LegalHold",params,undefined,true); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putObjectLegalHold(params,cb);
		}

		
		service.PutObjectLockConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ObjectLockConfiguration",params,undefined,true); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"Token",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putObjectLockConfiguration(params,cb);
		}

		
		service.PutObjectRetention=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"Retention",params,undefined,true); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"BypassGovernanceRetention",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putObjectRetention(params,cb);
		}

		
		service.PutObjectTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			copyArg(n,"Tagging",params,undefined,true); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"Tagging",params,undefined,true); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putObjectTagging(params,cb);
		}

		
		service.PutPublicAccessBlock=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"PublicAccessBlockConfiguration",params,undefined,true); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"PublicAccessBlockConfiguration",params,undefined,true); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.putPublicAccessBlock(params,cb);
		}

		
		service.RestoreObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"VersionId",params,undefined,false); 
			copyArg(msg,"RestoreRequest",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.restoreObject(params,cb);
		}

		
		service.SelectObjectContent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			copyArg(n,"Expression",params,undefined,false); 
			copyArg(n,"ExpressionType",params,undefined,false); 
			copyArg(n,"InputSerialization",params,undefined,true); 
			copyArg(n,"OutputSerialization",params,undefined,true); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArg(msg,"SSECustomerKey",params,undefined,true); 
			copyArg(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArg(msg,"Expression",params,undefined,false); 
			copyArg(msg,"ExpressionType",params,undefined,false); 
			copyArg(msg,"RequestProgress",params,undefined,false); 
			copyArg(msg,"InputSerialization",params,undefined,true); 
			copyArg(msg,"OutputSerialization",params,undefined,true); 
			copyArg(msg,"ScanRange",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.selectObjectContent(params,cb);
		}

		
		service.UploadPart=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			copyArg(n,"PartNumber",params,undefined,false); 
			copyArg(n,"UploadId",params,undefined,false); 
			
			copyArg(msg,"Body",params,undefined,false); 
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"ContentLength",params,undefined,false); 
			copyArg(msg,"ContentMD5",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"PartNumber",params,undefined,false); 
			copyArg(msg,"UploadId",params,undefined,false); 
			copyArg(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArg(msg,"SSECustomerKey",params,undefined,true); 
			copyArg(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			

			svc.uploadPart(params,cb);
		}

		
		service.UploadPartCopy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params,undefined,false); 
			copyArg(n,"CopySource",params,undefined,false); 
			copyArg(n,"Key",params,undefined,false); 
			copyArg(n,"PartNumber",params,undefined,false); 
			copyArg(n,"UploadId",params,undefined,false); 
			
			copyArg(msg,"Bucket",params,undefined,false); 
			copyArg(msg,"CopySource",params,undefined,false); 
			copyArg(msg,"CopySourceIfMatch",params,undefined,false); 
			copyArg(msg,"CopySourceIfModifiedSince",params,undefined,false); 
			copyArg(msg,"CopySourceIfNoneMatch",params,undefined,false); 
			copyArg(msg,"CopySourceIfUnmodifiedSince",params,undefined,false); 
			copyArg(msg,"CopySourceRange",params,undefined,false); 
			copyArg(msg,"Key",params,undefined,false); 
			copyArg(msg,"PartNumber",params,undefined,false); 
			copyArg(msg,"UploadId",params,undefined,false); 
			copyArg(msg,"SSECustomerAlgorithm",params,undefined,false); 
			copyArg(msg,"SSECustomerKey",params,undefined,true); 
			copyArg(msg,"SSECustomerKeyMD5",params,undefined,false); 
			copyArg(msg,"CopySourceSSECustomerAlgorithm",params,undefined,false); 
			copyArg(msg,"CopySourceSSECustomerKey",params,undefined,true); 
			copyArg(msg,"CopySourceSSECustomerKeyMD5",params,undefined,false); 
			copyArg(msg,"RequestPayer",params,undefined,false); 
			copyArg(msg,"ExpectedBucketOwner",params,undefined,false); 
			copyArg(msg,"ExpectedSourceBucketOwner",params,undefined,false); 
			

			svc.uploadPartCopy(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS S3", AmazonAPINode);

};
