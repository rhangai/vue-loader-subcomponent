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

    // Recurse subcomponents
    c.components = c.components || {};
    for ( var subcomp in _vueSubcomponents )
        c.components[ subcomp ] = _vueSubcomponents[ subcomp ];

    components[ name ] = c;
    if ( typeof(exports) !== 'undefined' && exports.__esModule )
        exports[ name ] = c;
    else
        module.exports[ name ] = c;
}
}());
`;
};
