var loaderUtils = require( 'loader-utils' );
var path = require( 'path' );
module.exports = function( content ) {
	var query = loaderUtils.parseQuery( this.query );
	var src  = new Buffer(content, 'utf8').toString('hex');
	var file = path.join( this.resourcePath, query.name+'.vue' );
	
	var name  = query.name;
	name = name.charAt(0).toUpperCase()+name.substr(1).replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
	return `
var c = require("virtual-file-loader?src=${src}&file=${file}!");
module.exports = function(subcomponents) {
subcomponents[${JSON.stringify(name)}] = c;
}`;
};
