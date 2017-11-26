
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

		var awsService = new AWS.S3( { 'region': node.region } );

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

		
		service.AbortMultipartUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			copyArg(n,"UploadId",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"UploadId",params); 
			copyArg(msg,"RequestPayer",params); 
			

			svc.abortMultipartUpload(params,cb);
		}

		
		service.CompleteMultipartUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			copyArg(n,"UploadId",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"MultipartUpload",params); 
			copyArg(msg,"UploadId",params); 
			copyArg(msg,"RequestPayer",params); 
			

			svc.completeMultipartUpload(params,cb);
		}

		
		service.CopyObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"CopySource",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"ACL",params); 
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"CacheControl",params); 
			copyArg(msg,"ContentDisposition",params); 
			copyArg(msg,"ContentEncoding",params); 
			copyArg(msg,"ContentLanguage",params); 
			copyArg(msg,"ContentType",params); 
			copyArg(msg,"CopySource",params); 
			copyArg(msg,"CopySourceIfMatch",params); 
			copyArg(msg,"CopySourceIfModifiedSince",params); 
			copyArg(msg,"CopySourceIfNoneMatch",params); 
			copyArg(msg,"CopySourceIfUnmodifiedSince",params); 
			copyArg(msg,"Expires",params); 
			copyArg(msg,"GrantFullControl",params); 
			copyArg(msg,"GrantRead",params); 
			copyArg(msg,"GrantReadACP",params); 
			copyArg(msg,"GrantWriteACP",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"Metadata",params); 
			copyArg(msg,"MetadataDirective",params); 
			copyArg(msg,"TaggingDirective",params); 
			copyArg(msg,"ServerSideEncryption",params); 
			copyArg(msg,"StorageClass",params); 
			copyArg(msg,"WebsiteRedirectLocation",params); 
			copyArg(msg,"SSECustomerAlgorithm",params); 
			copyArg(msg,"SSECustomerKey",params); 
			copyArg(msg,"SSECustomerKeyMD5",params); 
			copyArg(msg,"SSEKMSKeyId",params); 
			copyArg(msg,"CopySourceSSECustomerAlgorithm",params); 
			copyArg(msg,"CopySourceSSECustomerKey",params); 
			copyArg(msg,"CopySourceSSECustomerKeyMD5",params); 
			copyArg(msg,"RequestPayer",params); 
			copyArg(msg,"Tagging",params); 
			

			svc.copyObject(params,cb);
		}

		
		service.CreateBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"ACL",params); 
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"CreateBucketConfiguration",params); 
			copyArg(msg,"GrantFullControl",params); 
			copyArg(msg,"GrantRead",params); 
			copyArg(msg,"GrantReadACP",params); 
			copyArg(msg,"GrantWrite",params); 
			copyArg(msg,"GrantWriteACP",params); 
			

			svc.createBucket(params,cb);
		}

		
		service.CreateMultipartUpload=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"ACL",params); 
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"CacheControl",params); 
			copyArg(msg,"ContentDisposition",params); 
			copyArg(msg,"ContentEncoding",params); 
			copyArg(msg,"ContentLanguage",params); 
			copyArg(msg,"ContentType",params); 
			copyArg(msg,"Expires",params); 
			copyArg(msg,"GrantFullControl",params); 
			copyArg(msg,"GrantRead",params); 
			copyArg(msg,"GrantReadACP",params); 
			copyArg(msg,"GrantWriteACP",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"Metadata",params); 
			copyArg(msg,"ServerSideEncryption",params); 
			copyArg(msg,"StorageClass",params); 
			copyArg(msg,"WebsiteRedirectLocation",params); 
			copyArg(msg,"SSECustomerAlgorithm",params); 
			copyArg(msg,"SSECustomerKey",params); 
			copyArg(msg,"SSECustomerKeyMD5",params); 
			copyArg(msg,"SSEKMSKeyId",params); 
			copyArg(msg,"RequestPayer",params); 
			copyArg(msg,"Tagging",params); 
			

			svc.createMultipartUpload(params,cb);
		}

		
		service.DeleteBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.deleteBucket(params,cb);
		}

		
		service.DeleteBucketAnalyticsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Id",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Id",params); 
			

			svc.deleteBucketAnalyticsConfiguration(params,cb);
		}

		
		service.DeleteBucketCors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.deleteBucketCors(params,cb);
		}

		
		service.DeleteBucketEncryption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.deleteBucketEncryption(params,cb);
		}

		
		service.DeleteBucketInventoryConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Id",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Id",params); 
			

			svc.deleteBucketInventoryConfiguration(params,cb);
		}

		
		service.DeleteBucketLifecycle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.deleteBucketLifecycle(params,cb);
		}

		
		service.DeleteBucketMetricsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Id",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Id",params); 
			

			svc.deleteBucketMetricsConfiguration(params,cb);
		}

		
		service.DeleteBucketPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.deleteBucketPolicy(params,cb);
		}

		
		service.DeleteBucketReplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.deleteBucketReplication(params,cb);
		}

		
		service.DeleteBucketTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.deleteBucketTagging(params,cb);
		}

		
		service.DeleteBucketWebsite=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.deleteBucketWebsite(params,cb);
		}

		
		service.DeleteObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"MFA",params); 
			copyArg(msg,"VersionId",params); 
			copyArg(msg,"RequestPayer",params); 
			

			svc.deleteObject(params,cb);
		}

		
		service.DeleteObjectTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"VersionId",params); 
			

			svc.deleteObjectTagging(params,cb);
		}

		
		service.DeleteObjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Delete",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Delete",params); 
			copyArg(msg,"MFA",params); 
			copyArg(msg,"RequestPayer",params); 
			

			svc.deleteObjects(params,cb);
		}

		
		service.GetBucketAccelerateConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketAccelerateConfiguration(params,cb);
		}

		
		service.GetBucketAcl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketAcl(params,cb);
		}

		
		service.GetBucketAnalyticsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Id",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Id",params); 
			

			svc.getBucketAnalyticsConfiguration(params,cb);
		}

		
		service.GetBucketCors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketCors(params,cb);
		}

		
		service.GetBucketEncryption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketEncryption(params,cb);
		}

		
		service.GetBucketInventoryConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Id",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Id",params); 
			

			svc.getBucketInventoryConfiguration(params,cb);
		}

		
		service.GetBucketLifecycle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketLifecycle(params,cb);
		}

		
		service.GetBucketLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketLifecycleConfiguration(params,cb);
		}

		
		service.GetBucketLocation=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketLocation(params,cb);
		}

		
		service.GetBucketLogging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketLogging(params,cb);
		}

		
		service.GetBucketMetricsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Id",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Id",params); 
			

			svc.getBucketMetricsConfiguration(params,cb);
		}

		
		service.GetBucketNotification=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			
			copyArg(msg,"Bucket",params); 

			svc.getBucketNotification(params,cb);
		}

		
		service.GetBucketNotificationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			
			copyArg(msg,"Bucket",params); 

			svc.getBucketNotificationConfiguration(params,cb);
		}

		
		service.GetBucketPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketPolicy(params,cb);
		}

		
		service.GetBucketReplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketReplication(params,cb);
		}

		
		service.GetBucketRequestPayment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketRequestPayment(params,cb);
		}

		
		service.GetBucketTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketTagging(params,cb);
		}

		
		service.GetBucketVersioning=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketVersioning(params,cb);
		}

		
		service.GetBucketWebsite=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.getBucketWebsite(params,cb);
		}

		
		service.GetObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"IfMatch",params); 
			copyArg(msg,"IfModifiedSince",params); 
			copyArg(msg,"IfNoneMatch",params); 
			copyArg(msg,"IfUnmodifiedSince",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"Range",params); 
			copyArg(msg,"ResponseCacheControl",params); 
			copyArg(msg,"ResponseContentDisposition",params); 
			copyArg(msg,"ResponseContentEncoding",params); 
			copyArg(msg,"ResponseContentLanguage",params); 
			copyArg(msg,"ResponseContentType",params); 
			copyArg(msg,"ResponseExpires",params); 
			copyArg(msg,"VersionId",params); 
			copyArg(msg,"SSECustomerAlgorithm",params); 
			copyArg(msg,"SSECustomerKey",params); 
			copyArg(msg,"SSECustomerKeyMD5",params); 
			copyArg(msg,"RequestPayer",params); 
			copyArg(msg,"PartNumber",params); 
			

			svc.getObject(params,cb);
		}

		
		service.GetObjectAcl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"VersionId",params); 
			copyArg(msg,"RequestPayer",params); 
			

			svc.getObjectAcl(params,cb);
		}

		
		service.GetObjectTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"VersionId",params); 
			

			svc.getObjectTagging(params,cb);
		}

		
		service.GetObjectTorrent=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"RequestPayer",params); 
			

			svc.getObjectTorrent(params,cb);
		}

		
		service.HeadBucket=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			

			svc.headBucket(params,cb);
		}

		
		service.HeadObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"IfMatch",params); 
			copyArg(msg,"IfModifiedSince",params); 
			copyArg(msg,"IfNoneMatch",params); 
			copyArg(msg,"IfUnmodifiedSince",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"Range",params); 
			copyArg(msg,"VersionId",params); 
			copyArg(msg,"SSECustomerAlgorithm",params); 
			copyArg(msg,"SSECustomerKey",params); 
			copyArg(msg,"SSECustomerKeyMD5",params); 
			copyArg(msg,"RequestPayer",params); 
			copyArg(msg,"PartNumber",params); 
			

			svc.headObject(params,cb);
		}

		
		service.ListBucketAnalyticsConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContinuationToken",params); 
			

			svc.listBucketAnalyticsConfigurations(params,cb);
		}

		
		service.ListBucketInventoryConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContinuationToken",params); 
			

			svc.listBucketInventoryConfigurations(params,cb);
		}

		
		service.ListBucketMetricsConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContinuationToken",params); 
			

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
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Delimiter",params); 
			copyArg(msg,"EncodingType",params); 
			copyArg(msg,"KeyMarker",params); 
			copyArg(msg,"MaxUploads",params); 
			copyArg(msg,"Prefix",params); 
			copyArg(msg,"UploadIdMarker",params); 
			

			svc.listMultipartUploads(params,cb);
		}

		
		service.ListObjectVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Delimiter",params); 
			copyArg(msg,"EncodingType",params); 
			copyArg(msg,"KeyMarker",params); 
			copyArg(msg,"MaxKeys",params); 
			copyArg(msg,"Prefix",params); 
			copyArg(msg,"VersionIdMarker",params); 
			

			svc.listObjectVersions(params,cb);
		}

		
		service.ListObjects=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Delimiter",params); 
			copyArg(msg,"EncodingType",params); 
			copyArg(msg,"Marker",params); 
			copyArg(msg,"MaxKeys",params); 
			copyArg(msg,"Prefix",params); 
			copyArg(msg,"RequestPayer",params); 
			

			svc.listObjects(params,cb);
		}

		
		service.ListObjectsV2=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Delimiter",params); 
			copyArg(msg,"EncodingType",params); 
			copyArg(msg,"MaxKeys",params); 
			copyArg(msg,"Prefix",params); 
			copyArg(msg,"ContinuationToken",params); 
			copyArg(msg,"FetchOwner",params); 
			copyArg(msg,"StartAfter",params); 
			copyArg(msg,"RequestPayer",params); 
			

			svc.listObjectsV2(params,cb);
		}

		
		service.ListParts=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			copyArg(n,"UploadId",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"MaxParts",params); 
			copyArg(msg,"PartNumberMarker",params); 
			copyArg(msg,"UploadId",params); 
			copyArg(msg,"RequestPayer",params); 
			

			svc.listParts(params,cb);
		}

		
		service.PutBucketAccelerateConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"AccelerateConfiguration",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"AccelerateConfiguration",params); 
			

			svc.putBucketAccelerateConfiguration(params,cb);
		}

		
		service.PutBucketAcl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"ACL",params); 
			copyArg(msg,"AccessControlPolicy",params); 
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"GrantFullControl",params); 
			copyArg(msg,"GrantRead",params); 
			copyArg(msg,"GrantReadACP",params); 
			copyArg(msg,"GrantWrite",params); 
			copyArg(msg,"GrantWriteACP",params); 
			

			svc.putBucketAcl(params,cb);
		}

		
		service.PutBucketAnalyticsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Id",params); 
			copyArg(n,"AnalyticsConfiguration",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Id",params); 
			copyArg(msg,"AnalyticsConfiguration",params); 
			

			svc.putBucketAnalyticsConfiguration(params,cb);
		}

		
		service.PutBucketCors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"CORSConfiguration",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"CORSConfiguration",params); 
			copyArg(msg,"ContentMD5",params); 
			

			svc.putBucketCors(params,cb);
		}

		
		service.PutBucketEncryption=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"ServerSideEncryptionConfiguration",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"ServerSideEncryptionConfiguration",params); 
			

			svc.putBucketEncryption(params,cb);
		}

		
		service.PutBucketInventoryConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Id",params); 
			copyArg(n,"InventoryConfiguration",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Id",params); 
			copyArg(msg,"InventoryConfiguration",params); 
			

			svc.putBucketInventoryConfiguration(params,cb);
		}

		
		service.PutBucketLifecycle=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"LifecycleConfiguration",params); 
			

			svc.putBucketLifecycle(params,cb);
		}

		
		service.PutBucketLifecycleConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"LifecycleConfiguration",params); 
			

			svc.putBucketLifecycleConfiguration(params,cb);
		}

		
		service.PutBucketLogging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"BucketLoggingStatus",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"BucketLoggingStatus",params); 
			copyArg(msg,"ContentMD5",params); 
			

			svc.putBucketLogging(params,cb);
		}

		
		service.PutBucketMetricsConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Id",params); 
			copyArg(n,"MetricsConfiguration",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Id",params); 
			copyArg(msg,"MetricsConfiguration",params); 
			

			svc.putBucketMetricsConfiguration(params,cb);
		}

		
		service.PutBucketNotification=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"NotificationConfiguration",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"NotificationConfiguration",params); 
			

			svc.putBucketNotification(params,cb);
		}

		
		service.PutBucketNotificationConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"NotificationConfiguration",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"NotificationConfiguration",params); 
			

			svc.putBucketNotificationConfiguration(params,cb);
		}

		
		service.PutBucketPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Policy",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"ConfirmRemoveSelfBucketAccess",params); 
			copyArg(msg,"Policy",params); 
			

			svc.putBucketPolicy(params,cb);
		}

		
		service.PutBucketReplication=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"ReplicationConfiguration",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"ReplicationConfiguration",params); 
			

			svc.putBucketReplication(params,cb);
		}

		
		service.PutBucketRequestPayment=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"RequestPaymentConfiguration",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"RequestPaymentConfiguration",params); 
			

			svc.putBucketRequestPayment(params,cb);
		}

		
		service.PutBucketTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Tagging",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"Tagging",params); 
			

			svc.putBucketTagging(params,cb);
		}

		
		service.PutBucketVersioning=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"VersioningConfiguration",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"MFA",params); 
			copyArg(msg,"VersioningConfiguration",params); 
			

			svc.putBucketVersioning(params,cb);
		}

		
		service.PutBucketWebsite=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"WebsiteConfiguration",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"WebsiteConfiguration",params); 
			

			svc.putBucketWebsite(params,cb);
		}

		
		service.PutObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"ACL",params); 
			copyArg(msg,"Body",params); 
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"CacheControl",params); 
			copyArg(msg,"ContentDisposition",params); 
			copyArg(msg,"ContentEncoding",params); 
			copyArg(msg,"ContentLanguage",params); 
			copyArg(msg,"ContentLength",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"ContentType",params); 
			copyArg(msg,"Expires",params); 
			copyArg(msg,"GrantFullControl",params); 
			copyArg(msg,"GrantRead",params); 
			copyArg(msg,"GrantReadACP",params); 
			copyArg(msg,"GrantWriteACP",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"Metadata",params); 
			copyArg(msg,"ServerSideEncryption",params); 
			copyArg(msg,"StorageClass",params); 
			copyArg(msg,"WebsiteRedirectLocation",params); 
			copyArg(msg,"SSECustomerAlgorithm",params); 
			copyArg(msg,"SSECustomerKey",params); 
			copyArg(msg,"SSECustomerKeyMD5",params); 
			copyArg(msg,"SSEKMSKeyId",params); 
			copyArg(msg,"RequestPayer",params); 
			copyArg(msg,"Tagging",params); 
			

			svc.putObject(params,cb);
		}

		
		service.PutObjectAcl=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"ACL",params); 
			copyArg(msg,"AccessControlPolicy",params); 
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"GrantFullControl",params); 
			copyArg(msg,"GrantRead",params); 
			copyArg(msg,"GrantReadACP",params); 
			copyArg(msg,"GrantWrite",params); 
			copyArg(msg,"GrantWriteACP",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"RequestPayer",params); 
			copyArg(msg,"VersionId",params); 
			

			svc.putObjectAcl(params,cb);
		}

		
		service.PutObjectTagging=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			copyArg(n,"Tagging",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"VersionId",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"Tagging",params); 
			

			svc.putObjectTagging(params,cb);
		}

		
		service.RestoreObject=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"VersionId",params); 
			copyArg(msg,"RestoreRequest",params); 
			copyArg(msg,"RequestPayer",params); 
			

			svc.restoreObject(params,cb);
		}

		
		service.UploadPart=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"Key",params); 
			copyArg(n,"PartNumber",params); 
			copyArg(n,"UploadId",params); 
			
			copyArg(msg,"Body",params); 
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"ContentLength",params); 
			copyArg(msg,"ContentMD5",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"PartNumber",params); 
			copyArg(msg,"UploadId",params); 
			copyArg(msg,"SSECustomerAlgorithm",params); 
			copyArg(msg,"SSECustomerKey",params); 
			copyArg(msg,"SSECustomerKeyMD5",params); 
			copyArg(msg,"RequestPayer",params); 
			

			svc.uploadPart(params,cb);
		}

		
		service.UploadPartCopy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"Bucket",params); 
			copyArg(n,"CopySource",params); 
			copyArg(n,"Key",params); 
			copyArg(n,"PartNumber",params); 
			copyArg(n,"UploadId",params); 
			
			copyArg(msg,"Bucket",params); 
			copyArg(msg,"CopySource",params); 
			copyArg(msg,"CopySourceIfMatch",params); 
			copyArg(msg,"CopySourceIfModifiedSince",params); 
			copyArg(msg,"CopySourceIfNoneMatch",params); 
			copyArg(msg,"CopySourceIfUnmodifiedSince",params); 
			copyArg(msg,"CopySourceRange",params); 
			copyArg(msg,"Key",params); 
			copyArg(msg,"PartNumber",params); 
			copyArg(msg,"UploadId",params); 
			copyArg(msg,"SSECustomerAlgorithm",params); 
			copyArg(msg,"SSECustomerKey",params); 
			copyArg(msg,"SSECustomerKeyMD5",params); 
			copyArg(msg,"CopySourceSSECustomerAlgorithm",params); 
			copyArg(msg,"CopySourceSSECustomerKey",params); 
			copyArg(msg,"CopySourceSSECustomerKeyMD5",params); 
			copyArg(msg,"RequestPayer",params); 
			

			svc.uploadPartCopy(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS S3", AmazonAPINode);

};
