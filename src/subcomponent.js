const loaderUtils = require( 'loader-utils' );
const path        = require( 'path' );

export default function subcomponent( content ) {
	const query = loaderUtils.parseQuery( this.query );
	const src  = new Buffer(content, 'utf8').toString('hex');
	const file = path.join( this.resourcePath, query.name+'.vue' );
	
	const name = capitalize( query.name );
	return `
var c = require("virtual-file-loader?src=${src}&file=${file}!");
module.exports = function(subcomponents) {
subcomponents[${JSON.stringify(name)}] = c;
}`;
};

function capitalize( str ) {
	return str.charAt(0).toUpperCase() + str.substr(1).replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
};
