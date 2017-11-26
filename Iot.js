
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

		var awsService = new AWS.Iot( { 'region': node.region } );

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

		
		service.AcceptCertificateTransfer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			copyArg(msg,"setAsActive",params); 
			

			svc.acceptCertificateTransfer(params,cb);
		}

		
		service.AttachPrincipalPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"principal",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"principal",params); 
			

			svc.attachPrincipalPolicy(params,cb);
		}

		
		service.AttachThingPrincipal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			copyArg(n,"principal",params); 
			
			copyArg(msg,"thingName",params); 
			copyArg(msg,"principal",params); 
			

			svc.attachThingPrincipal(params,cb);
		}

		
		service.CancelCertificateTransfer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			

			svc.cancelCertificateTransfer(params,cb);
		}

		
		service.CreateCertificateFromCsr=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateSigningRequest",params); 
			
			copyArg(msg,"certificateSigningRequest",params); 
			copyArg(msg,"setAsActive",params); 
			

			svc.createCertificateFromCsr(params,cb);
		}

		
		service.CreateKeysAndCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"setAsActive",params); 
			

			svc.createKeysAndCertificate(params,cb);
		}

		
		service.CreatePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"policyDocument",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"policyDocument",params); 
			

			svc.createPolicy(params,cb);
		}

		
		service.CreatePolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"policyDocument",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"policyDocument",params); 
			copyArg(msg,"setAsDefault",params); 
			

			svc.createPolicyVersion(params,cb);
		}

		
		service.CreateThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			
			copyArg(msg,"thingName",params); 
			copyArg(msg,"thingTypeName",params); 
			copyArg(msg,"attributePayload",params); 
			

			svc.createThing(params,cb);
		}

		
		service.CreateThingType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingTypeName",params); 
			
			copyArg(msg,"thingTypeName",params); 
			copyArg(msg,"thingTypeProperties",params); 
			

			svc.createThingType(params,cb);
		}

		
		service.CreateTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params); 
			copyArg(n,"topicRulePayload",params); 
			
			copyArg(msg,"ruleName",params); 
			copyArg(msg,"topicRulePayload",params); 
			

			svc.createTopicRule(params,cb);
		}

		
		service.DeleteCACertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			

			svc.deleteCACertificate(params,cb);
		}

		
		service.DeleteCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			

			svc.deleteCertificate(params,cb);
		}

		
		service.DeletePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			
			copyArg(msg,"policyName",params); 
			

			svc.deletePolicy(params,cb);
		}

		
		service.DeletePolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"policyVersionId",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"policyVersionId",params); 
			

			svc.deletePolicyVersion(params,cb);
		}

		
		service.DeleteRegistrationCode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.deleteRegistrationCode(params,cb);
		}

		
		service.DeleteThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			
			copyArg(msg,"thingName",params); 
			copyArg(msg,"expectedVersion",params); 
			

			svc.deleteThing(params,cb);
		}

		
		service.DeleteThingType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingTypeName",params); 
			
			copyArg(msg,"thingTypeName",params); 
			

			svc.deleteThingType(params,cb);
		}

		
		service.DeleteTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params); 
			
			copyArg(msg,"ruleName",params); 
			

			svc.deleteTopicRule(params,cb);
		}

		
		service.DeprecateThingType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingTypeName",params); 
			
			copyArg(msg,"thingTypeName",params); 
			copyArg(msg,"undoDeprecate",params); 
			

			svc.deprecateThingType(params,cb);
		}

		
		service.DescribeCACertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			

			svc.describeCACertificate(params,cb);
		}

		
		service.DescribeCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			

			svc.describeCertificate(params,cb);
		}

		
		service.DescribeEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeEndpoint(params,cb);
		}

		
		service.DescribeThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			
			copyArg(msg,"thingName",params); 
			

			svc.describeThing(params,cb);
		}

		
		service.DescribeThingType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingTypeName",params); 
			
			copyArg(msg,"thingTypeName",params); 
			

			svc.describeThingType(params,cb);
		}

		
		service.DetachPrincipalPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"principal",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"principal",params); 
			

			svc.detachPrincipalPolicy(params,cb);
		}

		
		service.DetachThingPrincipal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			copyArg(n,"principal",params); 
			
			copyArg(msg,"thingName",params); 
			copyArg(msg,"principal",params); 
			

			svc.detachThingPrincipal(params,cb);
		}

		
		service.DisableTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params); 
			
			copyArg(msg,"ruleName",params); 
			

			svc.disableTopicRule(params,cb);
		}

		
		service.EnableTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params); 
			
			copyArg(msg,"ruleName",params); 
			

			svc.enableTopicRule(params,cb);
		}

		
		service.GetLoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getLoggingOptions(params,cb);
		}

		
		service.GetPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			
			copyArg(msg,"policyName",params); 
			

			svc.getPolicy(params,cb);
		}

		
		service.GetPolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"policyVersionId",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"policyVersionId",params); 
			

			svc.getPolicyVersion(params,cb);
		}

		
		service.GetRegistrationCode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getRegistrationCode(params,cb);
		}

		
		service.GetTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params); 
			
			copyArg(msg,"ruleName",params); 
			

			svc.getTopicRule(params,cb);
		}

		
		service.ListCACertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listCACertificates(params,cb);
		}

		
		service.ListCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listCertificates(params,cb);
		}

		
		service.ListCertificatesByCA=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"caCertificateId",params); 
			
			copyArg(msg,"caCertificateId",params); 
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listCertificatesByCA(params,cb);
		}

		
		service.ListOutgoingCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listOutgoingCertificates(params,cb);
		}

		
		service.ListPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"marker",params); 
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listPolicies(params,cb);
		}

		
		service.ListPolicyPrincipals=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listPolicyPrincipals(params,cb);
		}

		
		service.ListPolicyVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			
			copyArg(msg,"policyName",params); 
			

			svc.listPolicyVersions(params,cb);
		}

		
		service.ListPrincipalPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"principal",params); 
			
			copyArg(msg,"principal",params); 
			copyArg(msg,"marker",params); 
			copyArg(msg,"pageSize",params); 
			copyArg(msg,"ascendingOrder",params); 
			

			svc.listPrincipalPolicies(params,cb);
		}

		
		service.ListPrincipalThings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"principal",params); 
			
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"principal",params); 
			

			svc.listPrincipalThings(params,cb);
		}

		
		service.ListThingPrincipals=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			
			copyArg(msg,"thingName",params); 
			

			svc.listThingPrincipals(params,cb);
		}

		
		service.ListThingTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"thingTypeName",params); 
			

			svc.listThingTypes(params,cb);
		}

		
		service.ListThings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"attributeName",params); 
			copyArg(msg,"attributeValue",params); 
			copyArg(msg,"thingTypeName",params); 
			

			svc.listThings(params,cb);
		}

		
		service.ListTopicRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"topic",params); 
			copyArg(msg,"maxResults",params); 
			copyArg(msg,"nextToken",params); 
			copyArg(msg,"ruleDisabled",params); 
			

			svc.listTopicRules(params,cb);
		}

		
		service.RegisterCACertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"caCertificate",params); 
			copyArg(n,"verificationCertificate",params); 
			
			copyArg(msg,"caCertificate",params); 
			copyArg(msg,"verificationCertificate",params); 
			copyArg(msg,"setAsActive",params); 
			copyArg(msg,"allowAutoRegistration",params); 
			

			svc.registerCACertificate(params,cb);
		}

		
		service.RegisterCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificatePem",params); 
			
			copyArg(msg,"certificatePem",params); 
			copyArg(msg,"caCertificatePem",params); 
			copyArg(msg,"setAsActive",params); 
			copyArg(msg,"status",params); 
			

			svc.registerCertificate(params,cb);
		}

		
		service.RejectCertificateTransfer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			copyArg(msg,"rejectReason",params); 
			

			svc.rejectCertificateTransfer(params,cb);
		}

		
		service.ReplaceTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params); 
			copyArg(n,"topicRulePayload",params); 
			
			copyArg(msg,"ruleName",params); 
			copyArg(msg,"topicRulePayload",params); 
			

			svc.replaceTopicRule(params,cb);
		}

		
		service.SetDefaultPolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params); 
			copyArg(n,"policyVersionId",params); 
			
			copyArg(msg,"policyName",params); 
			copyArg(msg,"policyVersionId",params); 
			

			svc.setDefaultPolicyVersion(params,cb);
		}

		
		service.SetLoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loggingOptionsPayload",params); 
			
			copyArg(msg,"loggingOptionsPayload",params); 
			

			svc.setLoggingOptions(params,cb);
		}

		
		service.TransferCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			copyArg(n,"targetAwsAccount",params); 
			
			copyArg(msg,"certificateId",params); 
			copyArg(msg,"targetAwsAccount",params); 
			copyArg(msg,"transferMessage",params); 
			

			svc.transferCertificate(params,cb);
		}

		
		service.UpdateCACertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			
			copyArg(msg,"certificateId",params); 
			copyArg(msg,"newStatus",params); 
			copyArg(msg,"newAutoRegistrationStatus",params); 
			

			svc.updateCACertificate(params,cb);
		}

		
		service.UpdateCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params); 
			copyArg(n,"newStatus",params); 
			
			copyArg(msg,"certificateId",params); 
			copyArg(msg,"newStatus",params); 
			

			svc.updateCertificate(params,cb);
		}

		
		service.UpdateThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params); 
			
			copyArg(msg,"thingName",params); 
			copyArg(msg,"thingTypeName",params); 
			copyArg(msg,"attributePayload",params); 
			copyArg(msg,"expectedVersion",params); 
			copyArg(msg,"removeThingType",params); 
			

			svc.updateThing(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Iot", AmazonAPINode);

};
