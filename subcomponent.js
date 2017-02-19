var loaderUtils = require( 'loader-utils' );
var path = require( 'path' );
module.exports = function( content ) {
	var query = loaderUtils.parseQuery( this.query );
	var name  = query.name;
	var src  = new Buffer(content, 'utf8').toString('hex');
	var file = path.join( this.resourcePath, query.name+'.vue' );
	return `
var c = require("virtual-file-loader?src=${src}&file=${file}!");
module.exports = function(subcomponents) {
subcomponents[${JSON.stringify(name)}] = c;
}`;
};
