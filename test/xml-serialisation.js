var chai = require("chai"),
		_ = require("underscore");

var should = chai.should();;

describe("xml serialisation", function(){

	it("test request directly @now2", function(done) {

		var request = require("../lib/request/request");

		//Need to setup an example request, using a real WSDL, even though the request isn't intended to match it!
		//Used an example from https://doc.s3.amazonaws.com/2006-03-01/AmazonS3.wsdl
		
		var methodParams = {
	    "request": {
	        "name": "PutObjectRequest",
	        "namespace": "tns",
	        "params": [
	            {
	                "mandatory": false,
	                "name": "parameters",
	                "namespace": "tns",
	                "type": "PutObject"
	            }
	        ]
	    },
	    "response": {
	        "name": "PutObjectResponse",
	        "namespace": "tns",
	        "params": [
	            {
	                "mandatory": false,
	                "name": "parameters",
	                "namespace": "tns",
	                "type": "PutObjectResponse"
	            }
	        ]
	    }
		};

		//An example request. Previously this was being serialised as
		//<ns1:field1>value1</ns1:field1><ns1:field2>[object Object]</ns1:field2><ns1:field2>[object Object]</ns1:field2>

		var callParams = {
	    //set soap connection data (mandatory values)
	    host    : "doc.s3.amazonaws.com",
	    path    : "/dir/soap",
	    wsdl    : "/2006-03-01/AmazonS3.wsdl",
	    params 	: {
				"ns1:field1" : "value1",
				"ns1:field2" : [{ "ns2:subField1" : "subfieldValue1" }, { "ns2:subField1" : "subfieldValue2" }]
			}
		};

		request._getTemplateParams(callParams, methodParams, {})
			.then(function(data) {

				console.log("callback data[2]",  data[2]);
				data[2].should.equal("<ns1:field1>value1</ns1:field1><ns1:field2><ns2:subField1>subfieldValue1</ns2:subField1></ns1:field2><ns1:field2><ns2:subField1>subfieldValue2</ns2:subField1></ns1:field2>")

				done();
			})

	});

});