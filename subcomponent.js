(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueLoaderSubcomponent = factory());
}(this, (function () { 'use strict';

var loaderUtils = require('loader-utils');
var path = require('path');

function subcomponent(content) {
	var query = loaderUtils.parseQuery(this.query);
	var src = new Buffer(content, 'utf8').toString('hex');
	var file = path.join(this.resourcePath, query.name + '.vue');

	var name = capitalize(query.name);
	return '\nvar c = require("virtual-file-loader?src=' + src + '&file=' + file + '!");\nmodule.exports = function(subcomponents) {\nsubcomponents[' + JSON.stringify(name) + '] = c;\n}';
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.substr(1).replace(/-([a-z])/g, function (g) {
		return g[1].toUpperCase();
	});
}

return subcomponent;

})));
