module.exports={
buildService: function(filename){
var fs= require('fs');
var serviceDef=JSON.parse(fs.readFileSync(filename,'utf8'));
console.log(serviceDef.metadata);

/*
Object.keys(serviceDef.operations).forEach(function(key){
	console.log(key);
	console.log(serviceDef.operations[key]);
});
*/

function serviceNameMapper(name){
	name=firstLetterUppercase(name);
	var map={
		Sts:'STS',
		Sns:'SNS',
		Sqs:'SQS',
		Rds:'RDS',
		Kms:'KMS',
		Es:'ES',
		DynamoDB:'DynamoDB',
		Ec2:'EC2',
		Rekognition:'Rekognition'
	};
	//really special cases
	map['Data.iot']='IotData';

	return map[name] || name;
		
};

function firstLetterUppercase(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function firstLetterLowercase(string) {
	return string.charAt(0).toLowerCase() + string.slice(1);
}

function mapKeys(obj,fn,sep){
	if (typeof sep == 'undefined') sep= '';
	if (typeof obj == 'undefined') {
		return '';
	} else {
		return Object.keys(obj).map(fn).join(sep);
	}
}

function getReqs(serviceDef){
	reqs={};
	Object.keys(serviceDef.operations).map(op=>
		{ if (serviceDef.operations[op].input && serviceDef.operations[op].input.required){
			return (serviceDef.operations[op].input.required)
		 } else {
			return [];
		 }
		}).forEach(reqA=>{reqA.forEach(req=>{reqs[req]=1})});
	console.log(JSON.stringify(reqs));
	return (Object.keys(reqs)); 
	} 


serviceDef.metadata.serviceName=serviceNameMapper(serviceDef.metadata.endpointPrefix);
var htmlFile=`
<!--
  Copyright 2017 Daniel Thomas.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->

<script type="text/x-red" data-template-name="AWS ${serviceDef.metadata.serviceName}">
		<style scoped>
				.hiddenAttrs {display:none;}
				.visibleAttrs {display:block;}
		</style>
	<div class="form-row">
		<label for="node-input-aws"><i class="fa fa-user"></i> AWS</label>
		<input type="text" id="node-input-aws">
	</div>
	<div class="form-row">
		<label for="node-input-operation"><i class="fa fa-wrench"></i> Operation</label>
		<select type="text" id="node-input-operation">
		${Object.keys(serviceDef.operations).map(key => 	`
			<option value="${key}">${key}</option>
		`).join('')};
		</select>
	</div>
	<div class="form-row">
		<label for="node-input-name"><i class="fa fa-tag"></i>Name</label>
		<input type="text" id="node-input-name" placeholder="Name"></input>
	</div>
	<hr/>	
	<div id="AttrHolder">
	      ${getReqs(serviceDef).map(r=>`
	<div class="form-row" id='${r}Attr' class='hiddenAttrs'>
		<label for="node-input-${r}"><i class="fa fa-tag"></i>${r}</label>
		<input type="text" id="node-input-${r}" placeholder="${r}"></input>
	</div> `
	).join('')}
	</div>

 <script>
	  var nodeOps={
			${mapKeys(serviceDef.operations,op=>`
				${op}:[
					${(serviceDef.operations[op].input)?mapKeys(serviceDef.operations[op].input.required,reqIdx=>`'#${serviceDef.operations[op].input.required[reqIdx]}Attr'`,','):''}
					]`,',')}
		};
		$('#node-input-operation').on('change',function(){
			$('#AttrHolder').children().addClass('hiddenAttrs').removeClass('visibleAttrs');
				if (nodeOps[this.value])
					$(nodeOps[this.value].join()).addClass('visibleAttrs').removeClass('hiddenAttrs');
		 });
 </script>

</script>

<script type="text/x-red" data-help-name="amazon ${serviceDef.metadata.serviceName}">
<p>
AWS ${serviceDef.metadata.serviceFullName}
</p>
<p>
<b>Descriptions to be added</b<
</p>
<p>
NOTE: Parameters must be specified in the message, using the case specified in the AWS API documentation (normally UpperCaseLeading)..
</p>

</script>

<script type="text/javascript">
	RED.nodes.registerType('AWS ${serviceDef.metadata.serviceName}',{
		category: 'AWS',
		color:"#C0DEED",
		defaults: {
			aws: {type:"amazon config",required:true},
			operation: { value: '${Object.keys(serviceDef.operations)[0]}' },
			${getReqs(serviceDef).map(req=>`
				${req}: { value: ""} ,`).join('')}
			name: { value: "" }
		},
		inputs:1,
		outputs:1,
		icon: "aws.png",
		align: "right",
		label: function() {
			return this.name || "${serviceDef.metadata.serviceName} " + this.operation;
		},
		oneditprepare: function () {

		}
	});
</script>

`;


var jsFile=`
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

		var awsService = new AWS.${serviceDef.metadata.serviceName}( { 'region': node.region } );

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

		${mapKeys(serviceDef.operations,op => `
		service.${op}=function(svc,msg,cb){
			var params={};
			//copyArgs
			${(serviceDef.operations[op].input && serviceDef.operations[op].input.required)? mapKeys(serviceDef.operations[op].input.required, input => `
			copyArg(n,"${serviceDef.operations[op].input.required[input]}",params); `): ''}
			${(serviceDef.operations[op].input && serviceDef.operations[op].input.members)? mapKeys(serviceDef.operations[op].input.members, input => `
			copyArg(msg,"${input}",params); `): ''}
			${(serviceDef.operations[op].input && serviceDef.operations[op].input.shape)? mapKeys(serviceDef.shapes[serviceDef.operations[op].input.shape].members, input => `
			copyArg(msg,"${input}",params); `): ''}

			svc.${firstLetterLowercase(op)}(params,cb);
		}

		`)}	

	}
	RED.nodes.registerType("AWS ${serviceDef.metadata.serviceName}", AmazonAPINode);

};
`;

fs.writeFileSync(`build/${serviceDef.metadata.serviceName}.html`,htmlFile);
fs.writeFileSync(`build/${serviceDef.metadata.serviceName}.js`,jsFile);

console.log(`${serviceDef.metadata.serviceName} written to build dir`);
}
};
