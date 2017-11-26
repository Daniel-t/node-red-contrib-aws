tools=require('./gen.js');
var files=[ '../node_modules/aws-sdk/apis/lambda-2015-03-31.min.json' ];

files.map(tools.buildService);
