'use strict';

app
	.filter('splitText', function($filter) {
		return function(input, delimiter, index) {
		  if (input == null) {
		    return "";
		  }
		  var input = input.split(delimiter)[index];
		  return input;
		};
	})

	.filter('inactiveListLocalFiscal', function() {
		return function(collection) {
		  	var output = [];
		  	if(collection!=undefined){
			  	angular.forEach(collection, function(item) {
			      	if(parseInt(item.associados)!= 1){
			        	output.push(item);
			      	}
			  	});
			}
		  	return output;
		};
	})

	.filter('inactiveListLocalFiscalEdit', function() {
		return function(collection, local) {
		  	var output = [];
		  	if(collection!=undefined){
			  	angular.forEach(collection, function(item) {
			      	if(parseInt(item.associados)!=1 || item.local == local){
			        	output.push(item);
			      	}
			  	});
			}
		  	return output;
		};
	})
