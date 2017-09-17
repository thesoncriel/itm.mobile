requirejs.config({
	baseUrl: "js/lib",
	paths: {
		"jquery": "http://code.jquery.com/jquery-2.1.4.min",
		"sidy": "sidy"
	},
	shim: {
		"sidy": {deps: ["jquery"], exports: "sidy"}
	}
});

requirejs.onError = function(err){
	console.log(err);
};

console.log("dddd");
