
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

		var awsService = new AWS.Iot( { 'region': node.region } );

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

		
		service.AcceptCertificateTransfer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params,undefined,false); 
			
			copyArg(msg,"certificateId",params,undefined,false); 
			copyArg(msg,"setAsActive",params,undefined,false); 
			

			svc.acceptCertificateTransfer(params,cb);
		}

		
		service.AddThingToBillingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"billingGroupName",params,undefined,false); 
			copyArg(msg,"billingGroupArn",params,undefined,false); 
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"thingArn",params,undefined,false); 
			

			svc.addThingToBillingGroup(params,cb);
		}

		
		service.AddThingToThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"thingGroupName",params,undefined,false); 
			copyArg(msg,"thingGroupArn",params,undefined,false); 
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"thingArn",params,undefined,false); 
			copyArg(msg,"overrideDynamicGroups",params,undefined,false); 
			

			svc.addThingToThingGroup(params,cb);
		}

		
		service.AssociateTargetsWithJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"targets",params,undefined,true); 
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"targets",params,undefined,true); 
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"comment",params,undefined,false); 
			copyArg(msg,"namespaceId",params,undefined,false); 
			

			svc.associateTargetsWithJob(params,cb);
		}

		
		service.AttachPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			copyArg(n,"target",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			copyArg(msg,"target",params,undefined,false); 
			

			svc.attachPolicy(params,cb);
		}

		
		service.AttachPrincipalPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			copyArg(n,"principal",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			copyArg(msg,"principal",params,undefined,false); 
			

			svc.attachPrincipalPolicy(params,cb);
		}

		
		service.AttachSecurityProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"securityProfileName",params,undefined,false); 
			copyArg(n,"securityProfileTargetArn",params,undefined,false); 
			
			copyArg(msg,"securityProfileName",params,undefined,false); 
			copyArg(msg,"securityProfileTargetArn",params,undefined,false); 
			

			svc.attachSecurityProfile(params,cb);
		}

		
		service.AttachThingPrincipal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params,undefined,false); 
			copyArg(n,"principal",params,undefined,false); 
			
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"principal",params,undefined,false); 
			

			svc.attachThingPrincipal(params,cb);
		}

		
		service.CancelAuditMitigationActionsTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params,undefined,false); 
			
			copyArg(msg,"taskId",params,undefined,false); 
			

			svc.cancelAuditMitigationActionsTask(params,cb);
		}

		
		service.CancelAuditTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params,undefined,false); 
			
			copyArg(msg,"taskId",params,undefined,false); 
			

			svc.cancelAuditTask(params,cb);
		}

		
		service.CancelCertificateTransfer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params,undefined,false); 
			
			copyArg(msg,"certificateId",params,undefined,false); 
			

			svc.cancelCertificateTransfer(params,cb);
		}

		
		service.CancelDetectMitigationActionsTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params,undefined,false); 
			
			copyArg(msg,"taskId",params,undefined,false); 
			

			svc.cancelDetectMitigationActionsTask(params,cb);
		}

		
		service.CancelJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"reasonCode",params,undefined,false); 
			copyArg(msg,"comment",params,undefined,false); 
			copyArg(msg,"force",params,undefined,false); 
			

			svc.cancelJob(params,cb);
		}

		
		service.CancelJobExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"thingName",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"force",params,undefined,false); 
			copyArg(msg,"expectedVersion",params,undefined,false); 
			copyArg(msg,"statusDetails",params,undefined,true); 
			

			svc.cancelJobExecution(params,cb);
		}

		
		service.ClearDefaultAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.clearDefaultAuthorizer(params,cb);
		}

		
		service.ConfirmTopicRuleDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"confirmationToken",params,undefined,false); 
			
			copyArg(msg,"confirmationToken",params,undefined,false); 
			

			svc.confirmTopicRuleDestination(params,cb);
		}

		
		service.CreateAuditSuppression=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"checkName",params,undefined,false); 
			copyArg(n,"resourceIdentifier",params,undefined,true); 
			copyArg(n,"clientRequestToken",params,undefined,false); 
			
			copyArg(msg,"checkName",params,undefined,false); 
			copyArg(msg,"resourceIdentifier",params,undefined,true); 
			copyArg(msg,"expirationDate",params,undefined,false); 
			copyArg(msg,"suppressIndefinitely",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.createAuditSuppression(params,cb);
		}

		
		service.CreateAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authorizerName",params,undefined,false); 
			copyArg(n,"authorizerFunctionArn",params,undefined,false); 
			
			copyArg(msg,"authorizerName",params,undefined,false); 
			copyArg(msg,"authorizerFunctionArn",params,undefined,false); 
			copyArg(msg,"tokenKeyName",params,undefined,false); 
			copyArg(msg,"tokenSigningPublicKeys",params,undefined,true); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"signingDisabled",params,undefined,false); 
			

			svc.createAuthorizer(params,cb);
		}

		
		service.CreateBillingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"billingGroupName",params,undefined,false); 
			
			copyArg(msg,"billingGroupName",params,undefined,false); 
			copyArg(msg,"billingGroupProperties",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createBillingGroup(params,cb);
		}

		
		service.CreateCertificateFromCsr=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateSigningRequest",params,undefined,false); 
			
			copyArg(msg,"certificateSigningRequest",params,undefined,false); 
			copyArg(msg,"setAsActive",params,undefined,false); 
			

			svc.createCertificateFromCsr(params,cb);
		}

		
		service.CreateCustomMetric=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"metricName",params,undefined,false); 
			copyArg(n,"metricType",params,undefined,false); 
			copyArg(n,"clientRequestToken",params,undefined,false); 
			
			copyArg(msg,"metricName",params,undefined,false); 
			copyArg(msg,"displayName",params,undefined,false); 
			copyArg(msg,"metricType",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.createCustomMetric(params,cb);
		}

		
		service.CreateDimension=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"type",params,undefined,false); 
			copyArg(n,"stringValues",params,undefined,true); 
			copyArg(n,"clientRequestToken",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"type",params,undefined,false); 
			copyArg(msg,"stringValues",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.createDimension(params,cb);
		}

		
		service.CreateDomainConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainConfigurationName",params,undefined,false); 
			
			copyArg(msg,"domainConfigurationName",params,undefined,false); 
			copyArg(msg,"domainName",params,undefined,false); 
			copyArg(msg,"serverCertificateArns",params,undefined,false); 
			copyArg(msg,"validationCertificateArn",params,undefined,false); 
			copyArg(msg,"authorizerConfig",params,undefined,true); 
			copyArg(msg,"serviceType",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createDomainConfiguration(params,cb);
		}

		
		service.CreateDynamicThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingGroupName",params,undefined,false); 
			copyArg(n,"queryString",params,undefined,false); 
			
			copyArg(msg,"thingGroupName",params,undefined,false); 
			copyArg(msg,"thingGroupProperties",params,undefined,true); 
			copyArg(msg,"indexName",params,undefined,false); 
			copyArg(msg,"queryString",params,undefined,false); 
			copyArg(msg,"queryVersion",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createDynamicThingGroup(params,cb);
		}

		
		service.CreateJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"targets",params,undefined,true); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"targets",params,undefined,true); 
			copyArg(msg,"documentSource",params,undefined,false); 
			copyArg(msg,"document",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"presignedUrlConfig",params,undefined,true); 
			copyArg(msg,"targetSelection",params,undefined,false); 
			copyArg(msg,"jobExecutionsRolloutConfig",params,undefined,true); 
			copyArg(msg,"abortConfig",params,undefined,true); 
			copyArg(msg,"timeoutConfig",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			copyArg(msg,"namespaceId",params,undefined,false); 
			

			svc.createJob(params,cb);
		}

		
		service.CreateKeysAndCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"setAsActive",params,undefined,false); 
			

			svc.createKeysAndCertificate(params,cb);
		}

		
		service.CreateMitigationAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"actionName",params,undefined,false); 
			copyArg(n,"roleArn",params,undefined,false); 
			copyArg(n,"actionParams",params,undefined,true); 
			
			copyArg(msg,"actionName",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"actionParams",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createMitigationAction(params,cb);
		}

		
		service.CreateOTAUpdate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"otaUpdateId",params,undefined,false); 
			copyArg(n,"targets",params,undefined,true); 
			copyArg(n,"files",params,undefined,true); 
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"otaUpdateId",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"targets",params,undefined,true); 
			copyArg(msg,"protocols",params,undefined,true); 
			copyArg(msg,"targetSelection",params,undefined,false); 
			copyArg(msg,"awsJobExecutionsRolloutConfig",params,undefined,true); 
			copyArg(msg,"awsJobPresignedUrlConfig",params,undefined,true); 
			copyArg(msg,"awsJobAbortConfig",params,undefined,false); 
			copyArg(msg,"awsJobTimeoutConfig",params,undefined,false); 
			copyArg(msg,"files",params,undefined,true); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"additionalParameters",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createOTAUpdate(params,cb);
		}

		
		service.CreatePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			copyArg(n,"policyDocument",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			copyArg(msg,"policyDocument",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createPolicy(params,cb);
		}

		
		service.CreatePolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			copyArg(n,"policyDocument",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			copyArg(msg,"policyDocument",params,undefined,false); 
			copyArg(msg,"setAsDefault",params,undefined,false); 
			

			svc.createPolicyVersion(params,cb);
		}

		
		service.CreateProvisioningClaim=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.createProvisioningClaim(params,cb);
		}

		
		service.CreateProvisioningTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateName",params,undefined,false); 
			copyArg(n,"templateBody",params,undefined,false); 
			copyArg(n,"provisioningRoleArn",params,undefined,false); 
			
			copyArg(msg,"templateName",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"templateBody",params,undefined,false); 
			copyArg(msg,"enabled",params,undefined,false); 
			copyArg(msg,"provisioningRoleArn",params,undefined,false); 
			copyArg(msg,"preProvisioningHook",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createProvisioningTemplate(params,cb);
		}

		
		service.CreateProvisioningTemplateVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateName",params,undefined,false); 
			copyArg(n,"templateBody",params,undefined,false); 
			
			copyArg(msg,"templateName",params,undefined,false); 
			copyArg(msg,"templateBody",params,undefined,false); 
			copyArg(msg,"setAsDefault",params,undefined,false); 
			

			svc.createProvisioningTemplateVersion(params,cb);
		}

		
		service.CreateRoleAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"roleAlias",params,undefined,false); 
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"roleAlias",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"credentialDurationSeconds",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createRoleAlias(params,cb);
		}

		
		service.CreateScheduledAudit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"frequency",params,undefined,false); 
			copyArg(n,"targetCheckNames",params,undefined,true); 
			copyArg(n,"scheduledAuditName",params,undefined,false); 
			
			copyArg(msg,"frequency",params,undefined,false); 
			copyArg(msg,"dayOfMonth",params,undefined,false); 
			copyArg(msg,"dayOfWeek",params,undefined,false); 
			copyArg(msg,"targetCheckNames",params,undefined,true); 
			copyArg(msg,"scheduledAuditName",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createScheduledAudit(params,cb);
		}

		
		service.CreateSecurityProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"securityProfileName",params,undefined,false); 
			
			copyArg(msg,"securityProfileName",params,undefined,false); 
			copyArg(msg,"securityProfileDescription",params,undefined,false); 
			copyArg(msg,"behaviors",params,undefined,true); 
			copyArg(msg,"alertTargets",params,undefined,true); 
			copyArg(msg,"additionalMetricsToRetain",params,undefined,true); 
			copyArg(msg,"additionalMetricsToRetainV2",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createSecurityProfile(params,cb);
		}

		
		service.CreateStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"streamId",params,undefined,false); 
			copyArg(n,"files",params,undefined,true); 
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"streamId",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"files",params,undefined,true); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createStream(params,cb);
		}

		
		service.CreateThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params,undefined,false); 
			
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"thingTypeName",params,undefined,false); 
			copyArg(msg,"attributePayload",params,undefined,true); 
			copyArg(msg,"billingGroupName",params,undefined,false); 
			

			svc.createThing(params,cb);
		}

		
		service.CreateThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingGroupName",params,undefined,false); 
			
			copyArg(msg,"thingGroupName",params,undefined,false); 
			copyArg(msg,"parentGroupName",params,undefined,false); 
			copyArg(msg,"thingGroupProperties",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createThingGroup(params,cb);
		}

		
		service.CreateThingType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingTypeName",params,undefined,false); 
			
			copyArg(msg,"thingTypeName",params,undefined,false); 
			copyArg(msg,"thingTypeProperties",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.createThingType(params,cb);
		}

		
		service.CreateTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params,undefined,false); 
			copyArg(n,"topicRulePayload",params,undefined,true); 
			
			copyArg(msg,"ruleName",params,undefined,false); 
			copyArg(msg,"topicRulePayload",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,false); 
			

			svc.createTopicRule(params,cb);
		}

		
		service.CreateTopicRuleDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"destinationConfiguration",params,undefined,false); 
			
			copyArg(msg,"destinationConfiguration",params,undefined,false); 
			

			svc.createTopicRuleDestination(params,cb);
		}

		
		service.DeleteAccountAuditConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"deleteScheduledAudits",params,undefined,false); 
			

			svc.deleteAccountAuditConfiguration(params,cb);
		}

		
		service.DeleteAuditSuppression=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"checkName",params,undefined,false); 
			copyArg(n,"resourceIdentifier",params,undefined,true); 
			
			copyArg(msg,"checkName",params,undefined,false); 
			copyArg(msg,"resourceIdentifier",params,undefined,true); 
			

			svc.deleteAuditSuppression(params,cb);
		}

		
		service.DeleteAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authorizerName",params,undefined,false); 
			
			copyArg(msg,"authorizerName",params,undefined,false); 
			

			svc.deleteAuthorizer(params,cb);
		}

		
		service.DeleteBillingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"billingGroupName",params,undefined,false); 
			
			copyArg(msg,"billingGroupName",params,undefined,false); 
			copyArg(msg,"expectedVersion",params,undefined,false); 
			

			svc.deleteBillingGroup(params,cb);
		}

		
		service.DeleteCACertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params,undefined,false); 
			
			copyArg(msg,"certificateId",params,undefined,false); 
			

			svc.deleteCACertificate(params,cb);
		}

		
		service.DeleteCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params,undefined,false); 
			
			copyArg(msg,"certificateId",params,undefined,false); 
			copyArg(msg,"forceDelete",params,undefined,false); 
			

			svc.deleteCertificate(params,cb);
		}

		
		service.DeleteCustomMetric=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"metricName",params,undefined,false); 
			
			copyArg(msg,"metricName",params,undefined,false); 
			

			svc.deleteCustomMetric(params,cb);
		}

		
		service.DeleteDimension=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.deleteDimension(params,cb);
		}

		
		service.DeleteDomainConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainConfigurationName",params,undefined,false); 
			
			copyArg(msg,"domainConfigurationName",params,undefined,false); 
			

			svc.deleteDomainConfiguration(params,cb);
		}

		
		service.DeleteDynamicThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingGroupName",params,undefined,false); 
			
			copyArg(msg,"thingGroupName",params,undefined,false); 
			copyArg(msg,"expectedVersion",params,undefined,false); 
			

			svc.deleteDynamicThingGroup(params,cb);
		}

		
		service.DeleteJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"force",params,undefined,false); 
			copyArg(msg,"namespaceId",params,undefined,false); 
			

			svc.deleteJob(params,cb);
		}

		
		service.DeleteJobExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"thingName",params,undefined,false); 
			copyArg(n,"executionNumber",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"executionNumber",params,undefined,false); 
			copyArg(msg,"force",params,undefined,false); 
			copyArg(msg,"namespaceId",params,undefined,false); 
			

			svc.deleteJobExecution(params,cb);
		}

		
		service.DeleteMitigationAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"actionName",params,undefined,false); 
			
			copyArg(msg,"actionName",params,undefined,false); 
			

			svc.deleteMitigationAction(params,cb);
		}

		
		service.DeleteOTAUpdate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"otaUpdateId",params,undefined,false); 
			
			copyArg(msg,"otaUpdateId",params,undefined,false); 
			copyArg(msg,"deleteStream",params,undefined,false); 
			copyArg(msg,"forceDeleteAWSJob",params,undefined,false); 
			

			svc.deleteOTAUpdate(params,cb);
		}

		
		service.DeletePolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			

			svc.deletePolicy(params,cb);
		}

		
		service.DeletePolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			copyArg(n,"policyVersionId",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			copyArg(msg,"policyVersionId",params,undefined,false); 
			

			svc.deletePolicyVersion(params,cb);
		}

		
		service.DeleteProvisioningTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.deleteProvisioningTemplate(params,cb);
		}

		
		service.DeleteProvisioningTemplateVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateName",params,undefined,false); 
			copyArg(n,"versionId",params,undefined,false); 
			
			copyArg(msg,"templateName",params,undefined,false); 
			copyArg(msg,"versionId",params,undefined,false); 
			

			svc.deleteProvisioningTemplateVersion(params,cb);
		}

		
		service.DeleteRegistrationCode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.deleteRegistrationCode(params,cb);
		}

		
		service.DeleteRoleAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"roleAlias",params,undefined,false); 
			
			copyArg(msg,"roleAlias",params,undefined,false); 
			

			svc.deleteRoleAlias(params,cb);
		}

		
		service.DeleteScheduledAudit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"scheduledAuditName",params,undefined,false); 
			
			copyArg(msg,"scheduledAuditName",params,undefined,false); 
			

			svc.deleteScheduledAudit(params,cb);
		}

		
		service.DeleteSecurityProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"securityProfileName",params,undefined,false); 
			
			copyArg(msg,"securityProfileName",params,undefined,false); 
			copyArg(msg,"expectedVersion",params,undefined,false); 
			

			svc.deleteSecurityProfile(params,cb);
		}

		
		service.DeleteStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"streamId",params,undefined,false); 
			
			copyArg(msg,"streamId",params,undefined,false); 
			

			svc.deleteStream(params,cb);
		}

		
		service.DeleteThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params,undefined,false); 
			
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"expectedVersion",params,undefined,false); 
			

			svc.deleteThing(params,cb);
		}

		
		service.DeleteThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingGroupName",params,undefined,false); 
			
			copyArg(msg,"thingGroupName",params,undefined,false); 
			copyArg(msg,"expectedVersion",params,undefined,false); 
			

			svc.deleteThingGroup(params,cb);
		}

		
		service.DeleteThingType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingTypeName",params,undefined,false); 
			
			copyArg(msg,"thingTypeName",params,undefined,false); 
			

			svc.deleteThingType(params,cb);
		}

		
		service.DeleteTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params,undefined,false); 
			
			copyArg(msg,"ruleName",params,undefined,false); 
			

			svc.deleteTopicRule(params,cb);
		}

		
		service.DeleteTopicRuleDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.deleteTopicRuleDestination(params,cb);
		}

		
		service.DeleteV2LoggingLevel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"targetType",params,undefined,false); 
			copyArg(n,"targetName",params,undefined,false); 
			
			copyArg(msg,"targetType",params,undefined,false); 
			copyArg(msg,"targetName",params,undefined,false); 
			

			svc.deleteV2LoggingLevel(params,cb);
		}

		
		service.DeprecateThingType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingTypeName",params,undefined,false); 
			
			copyArg(msg,"thingTypeName",params,undefined,false); 
			copyArg(msg,"undoDeprecate",params,undefined,false); 
			

			svc.deprecateThingType(params,cb);
		}

		
		service.DescribeAccountAuditConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeAccountAuditConfiguration(params,cb);
		}

		
		service.DescribeAuditFinding=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"findingId",params,undefined,false); 
			
			copyArg(msg,"findingId",params,undefined,false); 
			

			svc.describeAuditFinding(params,cb);
		}

		
		service.DescribeAuditMitigationActionsTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params,undefined,false); 
			
			copyArg(msg,"taskId",params,undefined,false); 
			

			svc.describeAuditMitigationActionsTask(params,cb);
		}

		
		service.DescribeAuditSuppression=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"checkName",params,undefined,false); 
			copyArg(n,"resourceIdentifier",params,undefined,true); 
			
			copyArg(msg,"checkName",params,undefined,false); 
			copyArg(msg,"resourceIdentifier",params,undefined,true); 
			

			svc.describeAuditSuppression(params,cb);
		}

		
		service.DescribeAuditTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params,undefined,false); 
			
			copyArg(msg,"taskId",params,undefined,false); 
			

			svc.describeAuditTask(params,cb);
		}

		
		service.DescribeAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authorizerName",params,undefined,false); 
			
			copyArg(msg,"authorizerName",params,undefined,false); 
			

			svc.describeAuthorizer(params,cb);
		}

		
		service.DescribeBillingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"billingGroupName",params,undefined,false); 
			
			copyArg(msg,"billingGroupName",params,undefined,false); 
			

			svc.describeBillingGroup(params,cb);
		}

		
		service.DescribeCACertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params,undefined,false); 
			
			copyArg(msg,"certificateId",params,undefined,false); 
			

			svc.describeCACertificate(params,cb);
		}

		
		service.DescribeCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params,undefined,false); 
			
			copyArg(msg,"certificateId",params,undefined,false); 
			

			svc.describeCertificate(params,cb);
		}

		
		service.DescribeCustomMetric=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"metricName",params,undefined,false); 
			
			copyArg(msg,"metricName",params,undefined,false); 
			

			svc.describeCustomMetric(params,cb);
		}

		
		service.DescribeDefaultAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeDefaultAuthorizer(params,cb);
		}

		
		service.DescribeDetectMitigationActionsTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params,undefined,false); 
			
			copyArg(msg,"taskId",params,undefined,false); 
			

			svc.describeDetectMitigationActionsTask(params,cb);
		}

		
		service.DescribeDimension=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			
			copyArg(msg,"name",params,undefined,false); 
			

			svc.describeDimension(params,cb);
		}

		
		service.DescribeDomainConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainConfigurationName",params,undefined,false); 
			
			copyArg(msg,"domainConfigurationName",params,undefined,false); 
			

			svc.describeDomainConfiguration(params,cb);
		}

		
		service.DescribeEndpoint=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"endpointType",params,undefined,false); 
			

			svc.describeEndpoint(params,cb);
		}

		
		service.DescribeEventConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.describeEventConfigurations(params,cb);
		}

		
		service.DescribeIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"indexName",params,undefined,false); 
			
			copyArg(msg,"indexName",params,undefined,false); 
			

			svc.describeIndex(params,cb);
		}

		
		service.DescribeJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			

			svc.describeJob(params,cb);
		}

		
		service.DescribeJobExecution=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			copyArg(n,"thingName",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"executionNumber",params,undefined,false); 
			

			svc.describeJobExecution(params,cb);
		}

		
		service.DescribeMitigationAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"actionName",params,undefined,false); 
			
			copyArg(msg,"actionName",params,undefined,false); 
			

			svc.describeMitigationAction(params,cb);
		}

		
		service.DescribeProvisioningTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"templateName",params,undefined,false); 
			

			svc.describeProvisioningTemplate(params,cb);
		}

		
		service.DescribeProvisioningTemplateVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateName",params,undefined,false); 
			copyArg(n,"versionId",params,undefined,false); 
			
			copyArg(msg,"templateName",params,undefined,false); 
			copyArg(msg,"versionId",params,undefined,false); 
			

			svc.describeProvisioningTemplateVersion(params,cb);
		}

		
		service.DescribeRoleAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"roleAlias",params,undefined,false); 
			
			copyArg(msg,"roleAlias",params,undefined,false); 
			

			svc.describeRoleAlias(params,cb);
		}

		
		service.DescribeScheduledAudit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"scheduledAuditName",params,undefined,false); 
			
			copyArg(msg,"scheduledAuditName",params,undefined,false); 
			

			svc.describeScheduledAudit(params,cb);
		}

		
		service.DescribeSecurityProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"securityProfileName",params,undefined,false); 
			
			copyArg(msg,"securityProfileName",params,undefined,false); 
			

			svc.describeSecurityProfile(params,cb);
		}

		
		service.DescribeStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"streamId",params,undefined,false); 
			
			copyArg(msg,"streamId",params,undefined,false); 
			

			svc.describeStream(params,cb);
		}

		
		service.DescribeThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params,undefined,false); 
			
			copyArg(msg,"thingName",params,undefined,false); 
			

			svc.describeThing(params,cb);
		}

		
		service.DescribeThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingGroupName",params,undefined,false); 
			
			copyArg(msg,"thingGroupName",params,undefined,false); 
			

			svc.describeThingGroup(params,cb);
		}

		
		service.DescribeThingRegistrationTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params,undefined,false); 
			
			copyArg(msg,"taskId",params,undefined,false); 
			

			svc.describeThingRegistrationTask(params,cb);
		}

		
		service.DescribeThingType=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingTypeName",params,undefined,false); 
			
			copyArg(msg,"thingTypeName",params,undefined,false); 
			

			svc.describeThingType(params,cb);
		}

		
		service.DetachPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			copyArg(n,"target",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			copyArg(msg,"target",params,undefined,false); 
			

			svc.detachPolicy(params,cb);
		}

		
		service.DetachPrincipalPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			copyArg(n,"principal",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			copyArg(msg,"principal",params,undefined,false); 
			

			svc.detachPrincipalPolicy(params,cb);
		}

		
		service.DetachSecurityProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"securityProfileName",params,undefined,false); 
			copyArg(n,"securityProfileTargetArn",params,undefined,false); 
			
			copyArg(msg,"securityProfileName",params,undefined,false); 
			copyArg(msg,"securityProfileTargetArn",params,undefined,false); 
			

			svc.detachSecurityProfile(params,cb);
		}

		
		service.DetachThingPrincipal=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params,undefined,false); 
			copyArg(n,"principal",params,undefined,false); 
			
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"principal",params,undefined,false); 
			

			svc.detachThingPrincipal(params,cb);
		}

		
		service.DisableTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params,undefined,false); 
			
			copyArg(msg,"ruleName",params,undefined,false); 
			

			svc.disableTopicRule(params,cb);
		}

		
		service.EnableTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params,undefined,false); 
			
			copyArg(msg,"ruleName",params,undefined,false); 
			

			svc.enableTopicRule(params,cb);
		}

		
		service.GetBehaviorModelTrainingSummaries=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"securityProfileName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.getBehaviorModelTrainingSummaries(params,cb);
		}

		
		service.GetCardinality=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"queryString",params,undefined,false); 
			
			copyArg(msg,"indexName",params,undefined,false); 
			copyArg(msg,"queryString",params,undefined,false); 
			copyArg(msg,"aggregationField",params,undefined,false); 
			copyArg(msg,"queryVersion",params,undefined,false); 
			

			svc.getCardinality(params,cb);
		}

		
		service.GetEffectivePolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"principal",params,undefined,false); 
			copyArg(msg,"cognitoIdentityPoolId",params,undefined,false); 
			copyArg(msg,"thingName",params,undefined,false); 
			

			svc.getEffectivePolicies(params,cb);
		}

		
		service.GetIndexingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getIndexingConfiguration(params,cb);
		}

		
		service.GetJobDocument=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			

			svc.getJobDocument(params,cb);
		}

		
		service.GetLoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getLoggingOptions(params,cb);
		}

		
		service.GetOTAUpdate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"otaUpdateId",params,undefined,false); 
			
			copyArg(msg,"otaUpdateId",params,undefined,false); 
			

			svc.getOTAUpdate(params,cb);
		}

		
		service.GetPercentiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"queryString",params,undefined,false); 
			
			copyArg(msg,"indexName",params,undefined,false); 
			copyArg(msg,"queryString",params,undefined,false); 
			copyArg(msg,"aggregationField",params,undefined,false); 
			copyArg(msg,"queryVersion",params,undefined,false); 
			copyArg(msg,"percents",params,undefined,false); 
			

			svc.getPercentiles(params,cb);
		}

		
		service.GetPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			

			svc.getPolicy(params,cb);
		}

		
		service.GetPolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			copyArg(n,"policyVersionId",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			copyArg(msg,"policyVersionId",params,undefined,false); 
			

			svc.getPolicyVersion(params,cb);
		}

		
		service.GetRegistrationCode=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getRegistrationCode(params,cb);
		}

		
		service.GetStatistics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"queryString",params,undefined,false); 
			
			copyArg(msg,"indexName",params,undefined,false); 
			copyArg(msg,"queryString",params,undefined,false); 
			copyArg(msg,"aggregationField",params,undefined,false); 
			copyArg(msg,"queryVersion",params,undefined,false); 
			

			svc.getStatistics(params,cb);
		}

		
		service.GetTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params,undefined,false); 
			
			copyArg(msg,"ruleName",params,undefined,false); 
			

			svc.getTopicRule(params,cb);
		}

		
		service.GetTopicRuleDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			

			svc.getTopicRuleDestination(params,cb);
		}

		
		service.GetV2LoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			

			svc.getV2LoggingOptions(params,cb);
		}

		
		service.ListActiveViolations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"securityProfileName",params,undefined,false); 
			copyArg(msg,"behaviorCriteriaType",params,undefined,false); 
			copyArg(msg,"listSuppressedAlerts",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listActiveViolations(params,cb);
		}

		
		service.ListAttachedPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"target",params,undefined,false); 
			
			copyArg(msg,"target",params,undefined,false); 
			copyArg(msg,"recursive",params,undefined,false); 
			copyArg(msg,"marker",params,undefined,false); 
			copyArg(msg,"pageSize",params,undefined,false); 
			

			svc.listAttachedPolicies(params,cb);
		}

		
		service.ListAuditFindings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"taskId",params,undefined,false); 
			copyArg(msg,"checkName",params,undefined,false); 
			copyArg(msg,"resourceIdentifier",params,undefined,true); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"listSuppressedFindings",params,undefined,false); 
			

			svc.listAuditFindings(params,cb);
		}

		
		service.ListAuditMitigationActionsExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params,undefined,false); 
			copyArg(n,"findingId",params,undefined,false); 
			
			copyArg(msg,"taskId",params,undefined,false); 
			copyArg(msg,"actionStatus",params,undefined,false); 
			copyArg(msg,"findingId",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listAuditMitigationActionsExecutions(params,cb);
		}

		
		service.ListAuditMitigationActionsTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"startTime",params,undefined,false); 
			copyArg(n,"endTime",params,undefined,false); 
			
			copyArg(msg,"auditTaskId",params,undefined,false); 
			copyArg(msg,"findingId",params,undefined,false); 
			copyArg(msg,"taskStatus",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			

			svc.listAuditMitigationActionsTasks(params,cb);
		}

		
		service.ListAuditSuppressions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"checkName",params,undefined,false); 
			copyArg(msg,"resourceIdentifier",params,undefined,true); 
			copyArg(msg,"ascendingOrder",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAuditSuppressions(params,cb);
		}

		
		service.ListAuditTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"startTime",params,undefined,false); 
			copyArg(n,"endTime",params,undefined,false); 
			
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"taskType",params,undefined,false); 
			copyArg(msg,"taskStatus",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listAuditTasks(params,cb);
		}

		
		service.ListAuthorizers=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageSize",params,undefined,false); 
			copyArg(msg,"marker",params,undefined,false); 
			copyArg(msg,"ascendingOrder",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.listAuthorizers(params,cb);
		}

		
		service.ListBillingGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"namePrefixFilter",params,undefined,false); 
			

			svc.listBillingGroups(params,cb);
		}

		
		service.ListCACertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageSize",params,undefined,false); 
			copyArg(msg,"marker",params,undefined,false); 
			copyArg(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listCACertificates(params,cb);
		}

		
		service.ListCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageSize",params,undefined,false); 
			copyArg(msg,"marker",params,undefined,false); 
			copyArg(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listCertificates(params,cb);
		}

		
		service.ListCertificatesByCA=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"caCertificateId",params,undefined,false); 
			
			copyArg(msg,"caCertificateId",params,undefined,false); 
			copyArg(msg,"pageSize",params,undefined,false); 
			copyArg(msg,"marker",params,undefined,false); 
			copyArg(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listCertificatesByCA(params,cb);
		}

		
		service.ListCustomMetrics=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listCustomMetrics(params,cb);
		}

		
		service.ListDetectMitigationActionsExecutions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"taskId",params,undefined,false); 
			copyArg(msg,"violationId",params,undefined,false); 
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listDetectMitigationActionsExecutions(params,cb);
		}

		
		service.ListDetectMitigationActionsTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"startTime",params,undefined,false); 
			copyArg(n,"endTime",params,undefined,false); 
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			

			svc.listDetectMitigationActionsTasks(params,cb);
		}

		
		service.ListDimensions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listDimensions(params,cb);
		}

		
		service.ListDomainConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"marker",params,undefined,false); 
			copyArg(msg,"pageSize",params,undefined,false); 
			copyArg(msg,"serviceType",params,undefined,false); 
			

			svc.listDomainConfigurations(params,cb);
		}

		
		service.ListIndices=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listIndices(params,cb);
		}

		
		service.ListJobExecutionsForJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listJobExecutionsForJob(params,cb);
		}

		
		service.ListJobExecutionsForThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params,undefined,false); 
			
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"namespaceId",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listJobExecutionsForThing(params,cb);
		}

		
		service.ListJobs=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"status",params,undefined,false); 
			copyArg(msg,"targetSelection",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"thingGroupName",params,undefined,false); 
			copyArg(msg,"thingGroupId",params,undefined,false); 
			copyArg(msg,"namespaceId",params,undefined,false); 
			

			svc.listJobs(params,cb);
		}

		
		service.ListMitigationActions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"actionType",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listMitigationActions(params,cb);
		}

		
		service.ListOTAUpdates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"otaUpdateStatus",params,undefined,false); 
			

			svc.listOTAUpdates(params,cb);
		}

		
		service.ListOutgoingCertificates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageSize",params,undefined,false); 
			copyArg(msg,"marker",params,undefined,false); 
			copyArg(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listOutgoingCertificates(params,cb);
		}

		
		service.ListPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"marker",params,undefined,false); 
			copyArg(msg,"pageSize",params,undefined,false); 
			copyArg(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listPolicies(params,cb);
		}

		
		service.ListPolicyPrincipals=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			copyArg(msg,"marker",params,undefined,false); 
			copyArg(msg,"pageSize",params,undefined,false); 
			copyArg(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listPolicyPrincipals(params,cb);
		}

		
		service.ListPolicyVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			

			svc.listPolicyVersions(params,cb);
		}

		
		service.ListPrincipalPolicies=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"principal",params,undefined,false); 
			
			copyArg(msg,"principal",params,undefined,false); 
			copyArg(msg,"marker",params,undefined,false); 
			copyArg(msg,"pageSize",params,undefined,false); 
			copyArg(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listPrincipalPolicies(params,cb);
		}

		
		service.ListPrincipalThings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"principal",params,undefined,false); 
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"principal",params,undefined,false); 
			

			svc.listPrincipalThings(params,cb);
		}

		
		service.ListProvisioningTemplateVersions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"templateName",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listProvisioningTemplateVersions(params,cb);
		}

		
		service.ListProvisioningTemplates=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listProvisioningTemplates(params,cb);
		}

		
		service.ListRoleAliases=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"pageSize",params,undefined,false); 
			copyArg(msg,"marker",params,undefined,false); 
			copyArg(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listRoleAliases(params,cb);
		}

		
		service.ListScheduledAudits=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listScheduledAudits(params,cb);
		}

		
		service.ListSecurityProfiles=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"dimensionName",params,undefined,false); 
			copyArg(msg,"metricName",params,undefined,false); 
			

			svc.listSecurityProfiles(params,cb);
		}

		
		service.ListSecurityProfilesForTarget=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"securityProfileTargetArn",params,undefined,false); 
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"recursive",params,undefined,false); 
			copyArg(msg,"securityProfileTargetArn",params,undefined,false); 
			

			svc.listSecurityProfilesForTarget(params,cb);
		}

		
		service.ListStreams=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"ascendingOrder",params,undefined,false); 
			

			svc.listStreams(params,cb);
		}

		
		service.ListTagsForResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listTagsForResource(params,cb);
		}

		
		service.ListTargetsForPolicy=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			copyArg(msg,"marker",params,undefined,false); 
			copyArg(msg,"pageSize",params,undefined,false); 
			

			svc.listTargetsForPolicy(params,cb);
		}

		
		service.ListTargetsForSecurityProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"securityProfileName",params,undefined,false); 
			
			copyArg(msg,"securityProfileName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listTargetsForSecurityProfile(params,cb);
		}

		
		service.ListThingGroups=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"parentGroup",params,undefined,false); 
			copyArg(msg,"namePrefixFilter",params,undefined,false); 
			copyArg(msg,"recursive",params,undefined,false); 
			

			svc.listThingGroups(params,cb);
		}

		
		service.ListThingGroupsForThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params,undefined,false); 
			
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listThingGroupsForThing(params,cb);
		}

		
		service.ListThingPrincipals=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params,undefined,false); 
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"thingName",params,undefined,false); 
			

			svc.listThingPrincipals(params,cb);
		}

		
		service.ListThingRegistrationTaskReports=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params,undefined,false); 
			copyArg(n,"reportType",params,undefined,false); 
			
			copyArg(msg,"taskId",params,undefined,false); 
			copyArg(msg,"reportType",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listThingRegistrationTaskReports(params,cb);
		}

		
		service.ListThingRegistrationTasks=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.listThingRegistrationTasks(params,cb);
		}

		
		service.ListThingTypes=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"thingTypeName",params,undefined,false); 
			

			svc.listThingTypes(params,cb);
		}

		
		service.ListThings=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"attributeName",params,undefined,false); 
			copyArg(msg,"attributeValue",params,undefined,false); 
			copyArg(msg,"thingTypeName",params,undefined,false); 
			

			svc.listThings(params,cb);
		}

		
		service.ListThingsInBillingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"billingGroupName",params,undefined,false); 
			
			copyArg(msg,"billingGroupName",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listThingsInBillingGroup(params,cb);
		}

		
		service.ListThingsInThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingGroupName",params,undefined,false); 
			
			copyArg(msg,"thingGroupName",params,undefined,false); 
			copyArg(msg,"recursive",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listThingsInThingGroup(params,cb);
		}

		
		service.ListTopicRuleDestinations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			

			svc.listTopicRuleDestinations(params,cb);
		}

		
		service.ListTopicRules=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"topic",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"ruleDisabled",params,undefined,false); 
			

			svc.listTopicRules(params,cb);
		}

		
		service.ListV2LoggingLevels=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"targetType",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listV2LoggingLevels(params,cb);
		}

		
		service.ListViolationEvents=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"startTime",params,undefined,false); 
			copyArg(n,"endTime",params,undefined,false); 
			
			copyArg(msg,"startTime",params,undefined,false); 
			copyArg(msg,"endTime",params,undefined,false); 
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"securityProfileName",params,undefined,false); 
			copyArg(msg,"behaviorCriteriaType",params,undefined,false); 
			copyArg(msg,"listSuppressedAlerts",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			

			svc.listViolationEvents(params,cb);
		}

		
		service.RegisterCACertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"caCertificate",params,undefined,false); 
			copyArg(n,"verificationCertificate",params,undefined,false); 
			
			copyArg(msg,"caCertificate",params,undefined,false); 
			copyArg(msg,"verificationCertificate",params,undefined,false); 
			copyArg(msg,"setAsActive",params,undefined,false); 
			copyArg(msg,"allowAutoRegistration",params,undefined,false); 
			copyArg(msg,"registrationConfig",params,undefined,true); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.registerCACertificate(params,cb);
		}

		
		service.RegisterCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificatePem",params,undefined,false); 
			
			copyArg(msg,"certificatePem",params,undefined,false); 
			copyArg(msg,"caCertificatePem",params,undefined,false); 
			copyArg(msg,"setAsActive",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.registerCertificate(params,cb);
		}

		
		service.RegisterCertificateWithoutCA=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificatePem",params,undefined,false); 
			
			copyArg(msg,"certificatePem",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.registerCertificateWithoutCA(params,cb);
		}

		
		service.RegisterThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateBody",params,undefined,false); 
			
			copyArg(msg,"templateBody",params,undefined,false); 
			copyArg(msg,"parameters",params,undefined,false); 
			

			svc.registerThing(params,cb);
		}

		
		service.RejectCertificateTransfer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params,undefined,false); 
			
			copyArg(msg,"certificateId",params,undefined,false); 
			copyArg(msg,"rejectReason",params,undefined,false); 
			

			svc.rejectCertificateTransfer(params,cb);
		}

		
		service.RemoveThingFromBillingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"billingGroupName",params,undefined,false); 
			copyArg(msg,"billingGroupArn",params,undefined,false); 
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"thingArn",params,undefined,false); 
			

			svc.removeThingFromBillingGroup(params,cb);
		}

		
		service.RemoveThingFromThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"thingGroupName",params,undefined,false); 
			copyArg(msg,"thingGroupArn",params,undefined,false); 
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"thingArn",params,undefined,false); 
			

			svc.removeThingFromThingGroup(params,cb);
		}

		
		service.ReplaceTopicRule=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"ruleName",params,undefined,false); 
			copyArg(n,"topicRulePayload",params,undefined,true); 
			
			copyArg(msg,"ruleName",params,undefined,false); 
			copyArg(msg,"topicRulePayload",params,undefined,true); 
			

			svc.replaceTopicRule(params,cb);
		}

		
		service.SearchIndex=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"queryString",params,undefined,false); 
			
			copyArg(msg,"indexName",params,undefined,false); 
			copyArg(msg,"queryString",params,undefined,false); 
			copyArg(msg,"nextToken",params,undefined,false); 
			copyArg(msg,"maxResults",params,undefined,false); 
			copyArg(msg,"queryVersion",params,undefined,false); 
			

			svc.searchIndex(params,cb);
		}

		
		service.SetDefaultAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authorizerName",params,undefined,false); 
			
			copyArg(msg,"authorizerName",params,undefined,false); 
			

			svc.setDefaultAuthorizer(params,cb);
		}

		
		service.SetDefaultPolicyVersion=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"policyName",params,undefined,false); 
			copyArg(n,"policyVersionId",params,undefined,false); 
			
			copyArg(msg,"policyName",params,undefined,false); 
			copyArg(msg,"policyVersionId",params,undefined,false); 
			

			svc.setDefaultPolicyVersion(params,cb);
		}

		
		service.SetLoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"loggingOptionsPayload",params,undefined,false); 
			
			copyArg(msg,"loggingOptionsPayload",params,undefined,false); 
			

			svc.setLoggingOptions(params,cb);
		}

		
		service.SetV2LoggingLevel=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"logTarget",params,undefined,true); 
			copyArg(n,"logLevel",params,undefined,false); 
			
			copyArg(msg,"logTarget",params,undefined,true); 
			copyArg(msg,"logLevel",params,undefined,false); 
			

			svc.setV2LoggingLevel(params,cb);
		}

		
		service.SetV2LoggingOptions=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"defaultLogLevel",params,undefined,false); 
			copyArg(msg,"disableAllLogs",params,undefined,false); 
			

			svc.setV2LoggingOptions(params,cb);
		}

		
		service.StartAuditMitigationActionsTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params,undefined,false); 
			copyArg(n,"target",params,undefined,true); 
			copyArg(n,"auditCheckToActionsMapping",params,undefined,true); 
			copyArg(n,"clientRequestToken",params,undefined,false); 
			
			copyArg(msg,"taskId",params,undefined,false); 
			copyArg(msg,"target",params,undefined,true); 
			copyArg(msg,"auditCheckToActionsMapping",params,undefined,true); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.startAuditMitigationActionsTask(params,cb);
		}

		
		service.StartDetectMitigationActionsTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params,undefined,false); 
			copyArg(n,"target",params,undefined,true); 
			copyArg(n,"actions",params,undefined,false); 
			copyArg(n,"clientRequestToken",params,undefined,false); 
			
			copyArg(msg,"taskId",params,undefined,false); 
			copyArg(msg,"target",params,undefined,true); 
			copyArg(msg,"actions",params,undefined,false); 
			copyArg(msg,"violationEventOccurrenceRange",params,undefined,true); 
			copyArg(msg,"includeOnlyActiveViolations",params,undefined,false); 
			copyArg(msg,"includeSuppressedAlerts",params,undefined,false); 
			copyArg(msg,"clientRequestToken",params,undefined,false); 
			

			svc.startDetectMitigationActionsTask(params,cb);
		}

		
		service.StartOnDemandAuditTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"targetCheckNames",params,undefined,true); 
			
			copyArg(msg,"targetCheckNames",params,undefined,true); 
			

			svc.startOnDemandAuditTask(params,cb);
		}

		
		service.StartThingRegistrationTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateBody",params,undefined,false); 
			copyArg(n,"inputFileBucket",params,undefined,false); 
			copyArg(n,"inputFileKey",params,undefined,false); 
			copyArg(n,"roleArn",params,undefined,false); 
			
			copyArg(msg,"templateBody",params,undefined,false); 
			copyArg(msg,"inputFileBucket",params,undefined,false); 
			copyArg(msg,"inputFileKey",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			

			svc.startThingRegistrationTask(params,cb);
		}

		
		service.StopThingRegistrationTask=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"taskId",params,undefined,false); 
			
			copyArg(msg,"taskId",params,undefined,false); 
			

			svc.stopThingRegistrationTask(params,cb);
		}

		
		service.TagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tags",params,undefined,true); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tags",params,undefined,true); 
			

			svc.tagResource(params,cb);
		}

		
		service.TestAuthorization=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authInfos",params,undefined,false); 
			
			copyArg(msg,"principal",params,undefined,false); 
			copyArg(msg,"cognitoIdentityPoolId",params,undefined,false); 
			copyArg(msg,"authInfos",params,undefined,false); 
			copyArg(msg,"clientId",params,undefined,false); 
			copyArg(msg,"policyNamesToAdd",params,undefined,true); 
			copyArg(msg,"policyNamesToSkip",params,undefined,true); 
			

			svc.testAuthorization(params,cb);
		}

		
		service.TestInvokeAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authorizerName",params,undefined,false); 
			
			copyArg(msg,"authorizerName",params,undefined,false); 
			copyArg(msg,"token",params,undefined,false); 
			copyArg(msg,"tokenSignature",params,undefined,false); 
			copyArg(msg,"httpContext",params,undefined,false); 
			copyArg(msg,"mqttContext",params,undefined,false); 
			copyArg(msg,"tlsContext",params,undefined,false); 
			

			svc.testInvokeAuthorizer(params,cb);
		}

		
		service.TransferCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params,undefined,false); 
			copyArg(n,"targetAwsAccount",params,undefined,false); 
			
			copyArg(msg,"certificateId",params,undefined,false); 
			copyArg(msg,"targetAwsAccount",params,undefined,false); 
			copyArg(msg,"transferMessage",params,undefined,false); 
			

			svc.transferCertificate(params,cb);
		}

		
		service.UntagResource=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"resourceArn",params,undefined,false); 
			copyArg(n,"tagKeys",params,undefined,false); 
			
			copyArg(msg,"resourceArn",params,undefined,false); 
			copyArg(msg,"tagKeys",params,undefined,false); 
			

			svc.untagResource(params,cb);
		}

		
		service.UpdateAccountAuditConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"auditNotificationTargetConfigurations",params,undefined,true); 
			copyArg(msg,"auditCheckConfigurations",params,undefined,true); 
			

			svc.updateAccountAuditConfiguration(params,cb);
		}

		
		service.UpdateAuditSuppression=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"checkName",params,undefined,false); 
			copyArg(n,"resourceIdentifier",params,undefined,true); 
			
			copyArg(msg,"checkName",params,undefined,false); 
			copyArg(msg,"resourceIdentifier",params,undefined,true); 
			copyArg(msg,"expirationDate",params,undefined,false); 
			copyArg(msg,"suppressIndefinitely",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			

			svc.updateAuditSuppression(params,cb);
		}

		
		service.UpdateAuthorizer=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"authorizerName",params,undefined,false); 
			
			copyArg(msg,"authorizerName",params,undefined,false); 
			copyArg(msg,"authorizerFunctionArn",params,undefined,false); 
			copyArg(msg,"tokenKeyName",params,undefined,false); 
			copyArg(msg,"tokenSigningPublicKeys",params,undefined,true); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.updateAuthorizer(params,cb);
		}

		
		service.UpdateBillingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"billingGroupName",params,undefined,false); 
			copyArg(n,"billingGroupProperties",params,undefined,true); 
			
			copyArg(msg,"billingGroupName",params,undefined,false); 
			copyArg(msg,"billingGroupProperties",params,undefined,true); 
			copyArg(msg,"expectedVersion",params,undefined,false); 
			

			svc.updateBillingGroup(params,cb);
		}

		
		service.UpdateCACertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params,undefined,false); 
			
			copyArg(msg,"certificateId",params,undefined,false); 
			copyArg(msg,"newStatus",params,undefined,false); 
			copyArg(msg,"newAutoRegistrationStatus",params,undefined,false); 
			copyArg(msg,"registrationConfig",params,undefined,true); 
			copyArg(msg,"removeAutoRegistration",params,undefined,false); 
			

			svc.updateCACertificate(params,cb);
		}

		
		service.UpdateCertificate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"certificateId",params,undefined,false); 
			copyArg(n,"newStatus",params,undefined,false); 
			
			copyArg(msg,"certificateId",params,undefined,false); 
			copyArg(msg,"newStatus",params,undefined,false); 
			

			svc.updateCertificate(params,cb);
		}

		
		service.UpdateCustomMetric=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"metricName",params,undefined,false); 
			copyArg(n,"displayName",params,undefined,false); 
			
			copyArg(msg,"metricName",params,undefined,false); 
			copyArg(msg,"displayName",params,undefined,false); 
			

			svc.updateCustomMetric(params,cb);
		}

		
		service.UpdateDimension=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"name",params,undefined,false); 
			copyArg(n,"stringValues",params,undefined,true); 
			
			copyArg(msg,"name",params,undefined,false); 
			copyArg(msg,"stringValues",params,undefined,true); 
			

			svc.updateDimension(params,cb);
		}

		
		service.UpdateDomainConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"domainConfigurationName",params,undefined,false); 
			
			copyArg(msg,"domainConfigurationName",params,undefined,false); 
			copyArg(msg,"authorizerConfig",params,undefined,true); 
			copyArg(msg,"domainConfigurationStatus",params,undefined,false); 
			copyArg(msg,"removeAuthorizerConfig",params,undefined,false); 
			

			svc.updateDomainConfiguration(params,cb);
		}

		
		service.UpdateDynamicThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingGroupName",params,undefined,false); 
			copyArg(n,"thingGroupProperties",params,undefined,true); 
			
			copyArg(msg,"thingGroupName",params,undefined,false); 
			copyArg(msg,"thingGroupProperties",params,undefined,true); 
			copyArg(msg,"expectedVersion",params,undefined,false); 
			copyArg(msg,"indexName",params,undefined,false); 
			copyArg(msg,"queryString",params,undefined,false); 
			copyArg(msg,"queryVersion",params,undefined,false); 
			

			svc.updateDynamicThingGroup(params,cb);
		}

		
		service.UpdateEventConfigurations=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"eventConfigurations",params,undefined,true); 
			

			svc.updateEventConfigurations(params,cb);
		}

		
		service.UpdateIndexingConfiguration=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"thingIndexingConfiguration",params,undefined,true); 
			copyArg(msg,"thingGroupIndexingConfiguration",params,undefined,true); 
			

			svc.updateIndexingConfiguration(params,cb);
		}

		
		service.UpdateJob=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"jobId",params,undefined,false); 
			
			copyArg(msg,"jobId",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"presignedUrlConfig",params,undefined,true); 
			copyArg(msg,"jobExecutionsRolloutConfig",params,undefined,true); 
			copyArg(msg,"abortConfig",params,undefined,true); 
			copyArg(msg,"timeoutConfig",params,undefined,true); 
			copyArg(msg,"namespaceId",params,undefined,false); 
			

			svc.updateJob(params,cb);
		}

		
		service.UpdateMitigationAction=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"actionName",params,undefined,false); 
			
			copyArg(msg,"actionName",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"actionParams",params,undefined,true); 
			

			svc.updateMitigationAction(params,cb);
		}

		
		service.UpdateProvisioningTemplate=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"templateName",params,undefined,false); 
			
			copyArg(msg,"templateName",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"enabled",params,undefined,false); 
			copyArg(msg,"defaultVersionId",params,undefined,false); 
			copyArg(msg,"provisioningRoleArn",params,undefined,false); 
			copyArg(msg,"preProvisioningHook",params,undefined,true); 
			copyArg(msg,"removePreProvisioningHook",params,undefined,false); 
			

			svc.updateProvisioningTemplate(params,cb);
		}

		
		service.UpdateRoleAlias=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"roleAlias",params,undefined,false); 
			
			copyArg(msg,"roleAlias",params,undefined,false); 
			copyArg(msg,"roleArn",params,undefined,false); 
			copyArg(msg,"credentialDurationSeconds",params,undefined,false); 
			

			svc.updateRoleAlias(params,cb);
		}

		
		service.UpdateScheduledAudit=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"scheduledAuditName",params,undefined,false); 
			
			copyArg(msg,"frequency",params,undefined,false); 
			copyArg(msg,"dayOfMonth",params,undefined,false); 
			copyArg(msg,"dayOfWeek",params,undefined,false); 
			copyArg(msg,"targetCheckNames",params,undefined,true); 
			copyArg(msg,"scheduledAuditName",params,undefined,false); 
			

			svc.updateScheduledAudit(params,cb);
		}

		
		service.UpdateSecurityProfile=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"securityProfileName",params,undefined,false); 
			
			copyArg(msg,"securityProfileName",params,undefined,false); 
			copyArg(msg,"securityProfileDescription",params,undefined,false); 
			copyArg(msg,"behaviors",params,undefined,true); 
			copyArg(msg,"alertTargets",params,undefined,true); 
			copyArg(msg,"additionalMetricsToRetain",params,undefined,true); 
			copyArg(msg,"additionalMetricsToRetainV2",params,undefined,true); 
			copyArg(msg,"deleteBehaviors",params,undefined,false); 
			copyArg(msg,"deleteAlertTargets",params,undefined,false); 
			copyArg(msg,"deleteAdditionalMetricsToRetain",params,undefined,false); 
			copyArg(msg,"expectedVersion",params,undefined,false); 
			

			svc.updateSecurityProfile(params,cb);
		}

		
		service.UpdateStream=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"streamId",params,undefined,false); 
			
			copyArg(msg,"streamId",params,undefined,false); 
			copyArg(msg,"description",params,undefined,false); 
			copyArg(msg,"files",params,undefined,true); 
			copyArg(msg,"roleArn",params,undefined,false); 
			

			svc.updateStream(params,cb);
		}

		
		service.UpdateThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingName",params,undefined,false); 
			
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"thingTypeName",params,undefined,false); 
			copyArg(msg,"attributePayload",params,undefined,true); 
			copyArg(msg,"expectedVersion",params,undefined,false); 
			copyArg(msg,"removeThingType",params,undefined,false); 
			

			svc.updateThing(params,cb);
		}

		
		service.UpdateThingGroup=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"thingGroupName",params,undefined,false); 
			copyArg(n,"thingGroupProperties",params,undefined,true); 
			
			copyArg(msg,"thingGroupName",params,undefined,false); 
			copyArg(msg,"thingGroupProperties",params,undefined,true); 
			copyArg(msg,"expectedVersion",params,undefined,false); 
			

			svc.updateThingGroup(params,cb);
		}

		
		service.UpdateThingGroupsForThing=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			
			copyArg(msg,"thingName",params,undefined,false); 
			copyArg(msg,"thingGroupsToAdd",params,undefined,true); 
			copyArg(msg,"thingGroupsToRemove",params,undefined,true); 
			copyArg(msg,"overrideDynamicGroups",params,undefined,false); 
			

			svc.updateThingGroupsForThing(params,cb);
		}

		
		service.UpdateTopicRuleDestination=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"arn",params,undefined,false); 
			copyArg(n,"status",params,undefined,false); 
			
			copyArg(msg,"arn",params,undefined,false); 
			copyArg(msg,"status",params,undefined,false); 
			

			svc.updateTopicRuleDestination(params,cb);
		}

		
		service.ValidateSecurityProfileBehaviors=function(svc,msg,cb){
			var params={};
			//copyArgs
			
			copyArg(n,"behaviors",params,undefined,true); 
			
			copyArg(msg,"behaviors",params,undefined,true); 
			

			svc.validateSecurityProfileBehaviors(params,cb);
		}

			

	}
	RED.nodes.registerType("AWS Iot", AmazonAPINode);

};
