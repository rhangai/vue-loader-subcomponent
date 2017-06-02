export default function VueLoaderSubcomponent( content ) {
	let haveSubcomponents = false;
	const lines = content.split("\n").map((line) => {
		if ( line.indexOf("vue-loader-subcomponent/subcomponent") >= 0 ) {
			line = `${line}(_vueSubcomponents)`;
			haveSubcomponents = true;
		}
		return line;
	});
	if ( !haveSubcomponents )
		return content;
	
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
var oldCreate = Component.exports.beforeCreate;
Component.exports.beforeCreate = function() {
    this.$subcomponents = _vueSubcomponents;
    if ( oldCreate ) {
        if ( typeof oldCreate === 'function' )
            oldCreate.apply( this );
        else if ( oldCreate.length ) {
            for ( var i = 0, len = oldCreate.length; i<len; ++i )
                oldCreate[i].apply( this );
        } else {
            throw new Error( "Invalid beforeCreate function on component" );
        }
    }
};  
}());
`;
};
