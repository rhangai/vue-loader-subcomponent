module.exports = function( content ) {
	const lines = content.split("\n").map((line) => {
		if ( line.indexOf("vue-loader-subcomponent/subcomponent") >= 0 ) {
			line = `${line}(_vueSubcomponents)`;
		}
		return line;
	});
	return `var _vueSubcomponents = {};
${lines.join("\n")}
;(function() {
var components = Component.exports.components = Component.exports.components || {};
for ( var name in _vueSubcomponents ) {
    var c = _vueSubcomponents[ name ];
    var camelName = name.charAt(0).toUpperCase()+name.substr(1).replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    components[ camelName ] = c;
    if ( typeof(exports) !== 'undefined' && exports.__esModule )
        exports[ camelName ] = c;
    else
        module.exports[ camelName ] = c;
}
}());
`;
};
